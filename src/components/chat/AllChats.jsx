import React, { Component} from 'react'
import { Avatar, Typography} from '@material-ui/core'
import { CHAT_URL } from '../../config'
import axios from 'axios'
import { Link } from 'react-router-dom'
    
    export default class AllChats extends Component {
        
        constructor(props) {
            super (props)
            this.state = {
                me: this.props.me,
                allChats: [{them: "Dave", chat: 'Hi George! I\'m insterested in the Ficus you have available.'}, {them: "Bob", chat: 'heyyyy'}, {them: 'Guiiii', chat: 'oh hai'}]

            }
        }
        state = {
            me: null,
        }

        // componentDidMount = async () => {
        //     //retrieve all chats user is party to.

        //     const myUserId = this.props.me._id
        //     let response = await axios.get(`${CHAT_URL}/user/chats`, {myUserId}, {withCredentials: true})
        //     console.log('All Chats CDM Response:', response)
        //     this.setState({ 
        //         allChats: response.data
        //     })
        // }

        render() {
            const {allChats} = this.state
            return (
                <div style={{padding: '10px'}}>
                   
                <Typography variant="h4">Messages</Typography>
                <hr/> 
                    {allChats.map((convo) => {
                        return(
                            <Link to={`/chat/${convo.them}`} key={`chat-${convo.them}`}>
                            <div  
                                 style={{   border: 'grey 1px solid', 
                                            height: '75px', 
                                            display: 'flex', 
                                            flexDirection: 'row', 
                                            alignItems: 'center', 
                                            justifyContents: 'center'
                                 }}>
                                <div style={{margin: '10px'}}>
                                    <Avatar alt={convo.them} src={convo.them} />
                                </div> 
                                <div style={{overflow: "clip", padding: "5px", width: '100%'}}>
                                <div style={{   display: 'flex', 
                                                flexDirection: 'row', 
                                                alignItems: 'center', 
                                                justifyContent: 'space-between'
                                                }}>
                                    <Typography variant="h6">{convo.them}</Typography> 
                                    <Typography variant="caption">Tuesday 4pm</Typography>
                                </div>
                                <Typography variant="body2" noWrap display="block">{convo.chat} </Typography>
                                </div>
                            </div>
                            </Link>
                        )
                    })}
                </div>
            )
        }
    }