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
            
                    <MyPlantOffer onAvailable={this.handleAvailability} plant={{_id: 69, displayName: 'dave', available: true, scientificName: 'David L. Smith', commonName: ['dave', 'davidus', 'daveyBoi'], location: 'Oregon', plantImageUrl: '/images/temporary/ficus.png'}}/>
                    <MyPlantOffer onAvailable={this.handleAvailability} plant={{_id: 70, displayName: 'danny', available: false, scientificName: 'Daniel P. Jones', commonName: ['dan', 'danny', 'danno'], location: 'Ohio', plantImageUrl: '/images/temporary/hibiscus.png'}}/>
                    <MyPlantOffer onAvailable={this.handleAvailability} plant={{_id: 71, displayName: 'ben', available: true, scientificName: 'Benjamin T. Button', commonName: ['ben', 'benny', 'bibi'], location: 'Arizona', plantImageUrl: '/images/temporary/monstera.png'}}/>
            </div>
        )
    }
}
