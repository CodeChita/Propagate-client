import React, { Component } from 'react'
import axios from 'axios'
import { API_URL } from '../../config'
import { Avatar, Button, CircularProgress, TextField } from '@material-ui/core'
import { Save } from '@material-ui/icons'

export default class EditProfile extends Component {

    state = {
        user: null,
        fetchingUser: true
    }

    componentDidMount = async() => {
        try{
       let response = await axios.get(`${API_URL}/user`, {withCredentials: true})
       console.log('Edit Profile CDM get user', response.data)
        this.setState({
             user: response.data,
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
    handleProfileEdit = async () => {
    }

    render() {
            if (this.state.fetchingUser) {
                return <CircularProgress/>
              }
            
            let {profileImageUrl, nickname, about, firstName, lastName, email} = this.state.user
            nickname = !nickname ?
                            firstName ? firstName : null :
                            nickname

        return (
            <>
            <h3> Edit Profile</h3>
            <p>{`${nickname}, ${about}, ${firstName}, ${lastName}, ${email}`}</p>
            <Avatar src={profileImageUrl} alt={nickname} style={{width: '30vw', height: '30vw', maxWidth: '150px'}} />
            <form noValidate autoComplete="off">
                <TextField id="nickname"  label="Nickname" defaultValue={nickname} margin="normal" variant="outlined" /><br/>
                <TextField id="about" label="About Me" multiline rows={4} margin="normal" variant="outlined" /> <br/>
                <TextField id="email" label="Email" defaultValue={email} margin="normal" variant="outlined" /> <br/>
                
                <Button variant="contained" color="secondary" size="large" startIcon={<Save />}>Save</Button>
            </form>
            </>
        )
    }
}
