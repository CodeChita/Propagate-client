import { Avatar } from '@material-ui/core'
import { ExitToApp } from '@material-ui/icons'
import React, { Component } from 'react'
import MyPlantOffer from './MyPlantOffer'
import axios from 'axios'
import { API_URL } from '../../config'

export default class PrivateProfile extends Component {
    
    componentDidMount = async () => {
        let userData = await axios.get(`${API_URL}/user/profile`)
        console.log(userData)
        this.setState({user: userData})
    }

    state = {
        user: null
    }
    render() {

        return (
            <div>
            <ExitToApp fontSize="large" style={{position: 'relative', float: 'right'}}/>
            <div style={{margin: '10px', display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
            <Avatar alt="GB" src="./broken.png" />
            <a href="#">edit profile</a>
            </div>
            { 
                !this.state.user ? 
                'You have no plants offered. Add some now!' : 
                this.state.user.plantsOffered.map((plant) => {
                <MyPlantOffer plant={plant} />
            })}
             </div>
        )
    }
}
