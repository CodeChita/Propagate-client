import { Avatar, CircularProgress, Typography} from '@material-ui/core'
import { Eco } from '@material-ui/icons'
import React, { Component } from 'react'
import axios from 'axios'
import { API_URL, CHAT_URL} from '../../config'
import SinglePlantCard from '../Search/SinglePlantCard'


export default class PublicProfile extends Component {
    
    state = {
        them: null,
        fetchingUser: true,
        me: null
    }

    componentDidMount = async () => {
        const thisUser = this.props.match.params.userId
        const me = this.props.me
        let response = await axios.get(`${API_URL}/users/${thisUser}`, {withCredentials: true})
        console.log('Public User data:', response.data)
        await this.setState({
            them: response.data,
            fetchingUser: false,
            me: me
        })
    }

    handleChatClick = async () => {
        console.log(this.state.me.username, this.state.them.username)

        if (!this.state.me) {
           this.props.history.push('/signin')
        }
        else {
            let data = {
                participants: [this.state.them._id, this.state.me._id]
            }
            let response = await axios.post(`${CHAT_URL}/conversation`, data, { withCredentials: true })
            this.props.history.push(`/chat/${response.data._id}`)
                }
            }

    render() {
        if (this.state.fetchingUser) {
            return <CircularProgress/>
          }
          const {them, me} = this.state
          const routeProps = this.props.routeProps
        return (
            
            <div style={{margin: '10px', display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                <Avatar alt={them.username} src={them.profileImageUrl} style={{height: '30vw', width: '30vw', maxHeight: '150px', maxWidth: '150px'}}/>
                <h1>{this.state.them.username}</h1>
                <Typography variant="subtitle2" color="textSecondary" gutterBottom>{this.state.them.about}</Typography>
                <div style={{margin: '10px'}}><Eco/></div>
                {them.plantsOffered.map((plant, index) => {
                    return ( <SinglePlantCard plant={plant} onChatClick={this.handleChatClick} key={index} {...routeProps}/> )
                })}
            </div>
        )
    }
}
