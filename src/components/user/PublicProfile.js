import { Avatar, IconButton, CircularProgress, Typography} from '@material-ui/core'
import { } from '@material-ui/icons'
import React, { Component } from 'react'
import MyPlantOffer from './MyPlantOffer'
import axios from 'axios'
import { API_URL } from '../../config'
import { Link } from 'react-router-dom'


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
    
    render() {
        if (this.state.fetchingUser) {
            return <CircularProgress/>
          }
        return (
            <>
            <div style={{margin: '10px', display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
            <Avatar alt='username' src='profileImageUrl' />
            <h1>{this.state.them.username}</h1>
            <Typography variant="subtitle2" color="textSecondary">{this.state.them.about}</Typography>
            </div>
            
             </>
        )
    }
}
