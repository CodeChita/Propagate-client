import {Switch, Route, withRouter} from "react-router-dom";
import React, {Component} from 'react'
import axios from 'axios'
import {API_URL} from './config'
import SignUp from "./components/Signup";
import GoogleButton from "./components/GoogleButton";
import Navbar from "./components/Navbar";

class App extends Component {
  state = {
    user: null,
    errorMessage: null
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
      let response = await axios.post(`${API_URL}/signup`, newUser)
      console.log(response)
      if (response.data.errorMessage) {
        this.setState({errorMessage: response.data.errorMessage})
      }
    }
    catch (err) {
      console.log('Signup failed', err)
    }

  }

  handleGoogleSuccess= (data) => {
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
          <Route path={"/signup"} render={(routeProps) =>{
            return <div>
              <SignUp errorMessage={this.state.errorMessage} onSignUp={this.handleSignUp} {...routeProps}/>
              <GoogleButton onSuccess={this.handleGoogleSuccess} onFailure={this.handleGoogleFailure}/>
            </div>
          }}
          />
          </Switch>
          <Navbar />
      </div>
    )
  }

}

export default withRouter(App);
