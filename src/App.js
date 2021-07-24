import {Switch, Route, withRouter} from "react-router-dom";
import React, {Component} from 'react'
import axios from 'axios'
import {API_URL} from './config'
import SignUp from "./components/Signup";
import GoogleButton from "./components/GoogleButton";
import SignIn from "./components/SignIn"

class App extends Component {
  state = {
    user: null
  }

  handleSignUp = async (event) => {
    console.log(event.target.username.value)
    event.preventDefault()
    const {username, email, password} = event.target

    let newUser = {
      username: username.value,
      email: email.value,
      password: password.value
    }
    
    try {
      await axios.post(`${API_URL}/signup`, newUser)
    }
    catch (err) {
      console.log('Signup failed', err)
    }

  }
  
  handleSignIn = async (event) =>{
    event.preventDefault()
    const {email, password} = event.target
    let log = {
      email: email.value, 
      password: password.value
    }
    try {
      let user = await axios.post(`${API_URL}/signin`, log)
      console.log(user)
      if (user) {
        //redirect to signin page 
        this.props.history.push('/edit-profile')
      }
    }
    catch (err) {
      console.log('Signup failed', err)
    }
  }

  handleGoogleSuccess = (data) => {
    this.setState({
      showLoading: true
    })
  
    const {givenName, familyName, email, imageUrl, googleId} = data.profileObj
    let newUser = {
      firstName: givenName,
      lastName: familyName,
      email,
      image: imageUrl,
      googleId
    }
  
    console.log(newUser)
    axios.post(`${API_URL}/google/info`, newUser , {withCredentials: true})
      .then((response) => {
        this.setState({
          loggedInUser: response.data.data,
          error: null,
          showLoading: false
        }, () => {
          // this.props.history.push('/profile')
        });
      })
  }
  handleGoogleFailure = () =>{
    console.log('failed google auth')
  }
  render(){
    return(
      <div>
        <Switch>
          <Route exact path={'/'} render={(routeProps) =>{
          return <SignIn onSignIn={this.handleSignIn}{...routeProps}/>
          }}
          />
          <Route path={"/signup"} render={(routeProps) =>{
            return <div>
              <SignUp onSignUp={this.handleSignUp} {...routeProps}/>
              <GoogleButton onSuccess={this.handleGoogleSuccess} onFailure={this.handleGoogleFailure}/>
            </div>
          }}
          />
          </Switch>
      </div>
    )
  }

}

export default withRouter(App);
