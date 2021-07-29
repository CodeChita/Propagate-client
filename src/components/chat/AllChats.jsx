import React, { Component} from 'react'
import { Avatar, CircularProgress, Typography} from '@material-ui/core'
import { CHAT_URL } from '../../config'
import axios from 'axios'
import { Link } from 'react-router-dom'
    
    export default class AllChats extends Component {
    

        state = {
            me: this.props.me,
            allChats: [{them: "Dave", chat: 'Hi George! I\'m insterested in the Ficus you have available.'}, {them: "Bob", chat: 'heyyyy'}, {them: 'Guiiii', chat: 'oh hai'}]

        }

        componentDidMount = async () => {
            let userId = this.props.me._id
        try {
            let response = await axios.post(`${CHAT_URL}/messages`, {userId}, {withCredentials: true})
            console.log('All My Chats Chats CDM Response:', response.data)
            this.setState({ 
                allChats: response.data
            })
        }
            catch(err) {
                console.log('ALLCHAT CDM CATCH', err)
            }
        }

        render() {
            if (this.state.loading) {return <CircularProgress/>}

            return (
                <div style={{padding: '10px'}}>
                   
                <Typography variant="h4">Messages</Typography>
                <hr/> 
                    {this.state.allChats.map((convo, index) => {
                        return(
                            <Link to={`/chat/${convo.conversationId}`} key={index}>
                            <div  
                                 style={{   borderTop: 'grey solid 1px ',
                                            height: '75px', 
                                            display: 'flex', 
                                            flexDirection: 'row', 
                                            alignItems: 'center', 
                                            justifyContents: 'center'
                                 }}>
                                <div style={{margin: '10px'}}>
                                    <Avatar alt={convo.them[0].username} src={convo.them[0].profileImageUrl} />
                                </div> 
                                <div style={{overflow: "clip", padding: "5px", width: '100%'}}>
                                <div style={{   display: 'flex', 
                                                flexDirection: 'row', 
                                                alignItems: 'center', 
                                                justifyContent: 'space-between'
                                                }}>
                                    <Typography variant="h6">{convo.them[0].username}</Typography> 
                                </div>
                                <Typography variant="body2" noWrap display="block">{convo.them[0].about} </Typography>
                                </div>
                            </div>
                            </Link>
                        )
                    })}
                </div>
            )
        }
    }