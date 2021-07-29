import React, { Component } from 'react'
import axios from 'axios'
import { API_URL } from '../../config'
import { Avatar, Button, CircularProgress, IconButton, TextField } from '@material-ui/core'
import { ArrowBackIos, Save } from '@material-ui/icons'
import { Link } from 'react-router-dom'

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
    
    handleUsernameChange = (event) => {
        let newName = event.target.value
        this.setState({
            user: {...this.state.user, username: newName }
        })
    }
    handleAboutChange = (event) => {
        let newAbout = event.target.value
        this.setState({
            user: {...this.state.user, about: newAbout }
        })
    }
    handleEmailChange = (event) => {
      let newEmail = event.target.value
      this.setState({
          user: {...this.state.user, email: newEmail }
      })
    }
    handleUpdateProfile = async () => {

      console.log('state log before axios', this.state.user)
      let response = await axios.patch(`${API_URL}/user/profile`, {user: this.state.user}, {withCredentials: true})
      console.log('patch User response', response.data)
      await this.setState({user: response.data})   
      console.log('state after update from response', this.state.user) 
      this.props.history.goBack()
    }

    render() {
            if (this.state.fetchingUser) {
                return (
                  <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                    <CircularProgress/>
                  </div>
                )}
            
            let {profileImageUrl, username, about, firstName, lastName, email} = this.state.user
            username = !username ?
                            firstName ? firstName : null :
                            username;
          
                            
            console.log(this.state.user)
        return (
            <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', padding: '5px'}}>
            <IconButton onClick={this.props.history.goBack} style={{alignSelf: 'start'}}><ArrowBackIos/></IconButton> 
            <h3> Edit Profile</h3>
            <Avatar src={profileImageUrl} alt={username} style={{width: '30vw', height: '30vw', maxWidth: '150px', maxHeight: '150px'}} />
            <form noValidate autoComplete="off">
                <TextField  onChange={this.handleUsernameChange} 
                            id="username"  
                            label="Username" 
                            defaultValue={username} 
                            margin="normal" 
                            variant="outlined" 
                />
                <br/>
                <TextField  onChange={this.handleAboutChange} 
                            id="about" 
                            label="About Me" 
                            defaultValue={about} 
                            multiline rows={4} 
                            margin="normal" 
                            variant="outlined" 
                /> 
                <br/>
                <TextField  onChange={this.handleEmailChange} 
                            id="email" 
                            label="Email" 
                            defaultValue={email} 
                            margin="normal" 
                            variant="outlined" 
                /> 
                <br/>
                </form>
                <Button     onClick={this.handleUpdateProfile}
                            variant="contained" 
                            color="primary" 
                            size="large" 
                            style={{marginBottom: '100px'}} 
                            startIcon={<Save />}> Save </Button>
                
  
            </div>
        )
    }
}
