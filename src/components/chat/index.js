import axios from 'axios'
import React, { Component } from 'react'
import './ChatPage.css'
import io from "socket.io-client";
import {CHAT_URL, API_URL} from '../../config'


let socket = ''

class ChatPage extends Component {
    // Adding a ref to the messages div
    messagesEnd = React.createRef()
    state = {
        loading: true, 
        messageList: [],
        currentMessage: '',
    }

    scrollToBottom = () => {
        this.messagesEnd.scrollIntoView({ behavior: "smooth" });
    }

    async componentDidMount(){
        //setup your socket connection with the server
        socket = io(`${CHAT_URL}`);

        let conversationId = this.props.match.params.chatId
        let response = await axios.get(`${CHAT_URL}/chatmessages/${conversationId}`)
        await this.setState({
                    loading: false, 
                    messageList: response.data
                }, () => {
                    this.scrollToBottom();
                })
                
        // ensure that the user is connected to a specific chat via webSocket    
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
              sender: this.props.user,
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
        const { user } = this.props

        if (loading) {
            <p>Loading all messages . . .</p>
        }

        return (
            <div>
                <h3>You're in the Chat Page </h3>
                <div className="chatContainer">
                    <div className="messages">
                        {
                            messageList.map((val) => {
                                return (
                                    <div key={val._id} className="messageContainer" id={val.sender.name == user.name ? "You" : "Other"}>
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

export default ChatPage