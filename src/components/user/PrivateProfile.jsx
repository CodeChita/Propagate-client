import { Avatar } from '@material-ui/core'
import React, { Component } from 'react'
import MyPlantOffer from './MyPlantOffer'

export default class PrivateProfile extends Component {

handleAvailable = (event) => {
    event.preventDefault()
 
}
    
    state = {
        user: null
    }
   
    render() {
        console.log(this.state)

        return (
            <div>
            <div style={{margin: '10px', display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
            <Avatar alt="GB" src="./broken.png" />
            <a href="#">edit profile</a>
            </div>
             </div>
        )
    }
}
