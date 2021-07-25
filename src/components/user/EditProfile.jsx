import React, { Component } from 'react'
import axios from 'axios'
import { API_URL } from '../../config'
import { CircularProgress } from '@material-ui/core'

export default class EditProfile extends Component {

    state = {
        user: null,
        fetchingUser: true
    }
    
    componentDidMount = async() => {
        try{
       let userResponse = await axios.get(`${API_URL}/user`, {withCredentials: true})
       console.log('Edit Profile CDM get user', userResponse)
        this.setState({
             user: userResponse.data,
             fetchingUser: false,
           })
         }
         catch(err) {
           console.log('EDIT User fetch failed', err)
           this.setState({
             fetchingUser: false,
           })
         }  
       }
    
    render() {
            if (this.state.fetchingUser) {
                return <CircularProgress/>
              }
            
        return (
            <h3> Edit Profile</h3>
            
        )
    }
}
