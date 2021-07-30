import axios from 'axios'
import React, { Component } from 'react'
import { API_URL, CHAT_URL, BASE_URL } from '../../config';
import './ChatPage.css'
import io from "socket.io-client";
import { Redirect } from 'react-router-dom';

let socket = ''

export default class ChatPage extends Component {
    // adding a ref to the messages div
    messagesEnd = React.createRef()
    state = {
        loading: true, 
        messageList: [],
        currentMessage: '',
        me: this.props.me
    }

    scrollToBottom = () => {
        this.messagesEnd.scrollIntoView({ behavior: "smooth" });
    }

    componentDidMount(){
        //setup your socket connection with the server
        socket = io(`${BASE_URL}`);

        let conversationId = this.props.match.params.chatId
        axios.get(`${CHAT_URL}/messages/${conversationId}`)
            .then((response) => {
                console.log(response)
                this.setState({
                    loading: false, 
                    messageList: response.data
                }, () => {
                    this.scrollToBottom();
                })
            })
        // ensure you are connected to a specific chat via webSocket    
        socket.emit("join_chat", conversationId);

        //Handle incoming messages from webSocket
        socket.on("receive_message", (data) => {
            console.log('Got data', data)
            this.setState({
                messageList: [...this.state.messageList, data]
            }, () => {
                this.scrollToBottom();
            })
        });    
    }

    handleMessageInput = (e) => {
        this.setState({
            currentMessage: e.target.value
        })
    }

    sendMessage = async () => {
        // Create the object structure
        let messageContent = {
            chatId: this.props.match.params.chatId,
            content: {
              sender: this.props.me,
              message: this.state.currentMessage,
            },
          };
          
          // emit it so that everyone connected to the same chat receives the message
        await socket.emit("send_message", messageContent);
        this.setState({
            messageList: [...this.state.messageList, messageContent.content],
            currentMessage: ''
        }, () => {
            this.scrollToBottom();
        })
    }


    render() {
        const { loading , messageList} = this.state
        const { me } = this.props

        if (loading) {
            <p>Loading all messages . . .</p>
        }

        if(!me){
            return <Redirect to={'/signin'}  />
        }

        return (
            <div>
                <h3>You're in the Chat Page </h3>
                <div className="chatContainer">
                    <div className="messages">
                        {
                            messageList.map((val) => {
                                return (
                                    <div key={val._id} className="messageContainer" id={val.sender.username == this.state.me.username ? "You" : "Other"}>
                                        <div className="messageIndividual">
                                            {val.sender.name}: {val.message}
                                        </div>
                                    </div>
                                );
                            })
                        }
                        <div style={{ float:"left", clear: "both" }}
                            ref={(el) => { this.messagesEnd = el; }}>
                        </div>
                    </div>
                    <div className="messageInputs">
                        <input value={this.state.currentMessage} type="text" placeholder="Message..."
                            onChange={this.handleMessageInput}
                        />
                        <button onClick={this.sendMessage}>Send</button>
                    </div>
                </div>
            </div>
        )
    }
}