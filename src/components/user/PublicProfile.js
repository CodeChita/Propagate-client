import { Avatar, IconButton, CircularProgress, Typography} from '@material-ui/core'
import { } from '@material-ui/icons'
import React, { Component } from 'react'
import MyPlantOffer from './MyPlantOffer'
import axios from 'axios'
import { API_URL } from '../../config'
import { Link } from 'react-router-dom'


export default class PublicProfile extends Component {
    
    state = {
        thisuser: null,
        fetchingUser: true
    }

    componentDidMount = async () => {
        const thisUser = this.props.match.params.userId
        let response = await axios.get(`${API_URL}/users/${thisUser}`, {withCredentials: true})
        console.log('Public User data:', response.data)
        await this.setState({
            thisUser: response.data,
            fetchingUser: false
        })
    }
    
    render() {
        if (this.state.fetchingUser) {
            return <CircularProgress/>
          }
        return (
            <>
            <div style={{margin: '10px', display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
            <h1>{this.state.thisUser.username}</h1>
            <Avatar alt='username' src='profileImageUrl' />
            </div>
            <div>
           
             </div>
             </>
        )
    }
}
