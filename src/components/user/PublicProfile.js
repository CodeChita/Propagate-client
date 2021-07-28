import { Avatar, IconButton, CircularProgress, Typography} from '@material-ui/core'
import { } from '@material-ui/icons'
import React, { Component } from 'react'
import MyPlantOffer from './MyPlantOffer'
import axios from 'axios'
import { API_URL } from '../../config'
import { Link } from 'react-router-dom'


export default class PublicProfile extends Component {
    
    componentDidMount = async () => {
        const thisUser = this.props.match.params.userId
     
        let response = await axios.get(`${API_URL}/user/${thisUser}`, {withCredentials: true})
        // console.log('Public User data:', response.data)
        // await this.setState({
            // thisUser: response.data,
            // fetchingUser: false
        }
    

    state = {
        user: null,
        fetchingUser: true
    }
    render() {
        if (this.state.fetchingUser) {
            return <CircularProgress/>
          }
        return (
            <>
            <div style={{margin: '10px', display: 'flex', flexDirection: 'column', alignItems: 'center'}}>

            <Avatar alt='username' src='profileImageUrl' />
            <Link to="/user/edit-profile">edit profile</Link>
            </div>
            <div>
            {/* { 
                !this.state.user ? 
                'You have no plants offered. Add some now!' : 
                plantsOffered.map((plant, index) => {
                return <MyPlantOffer key={index} plant={plant} />
            })} */}
           
             </div>
             </>
        )
    }
}
