import {Switch, Route, withRouter, Link} from "react-router-dom";
import React, {Component} from 'react'
import axios from 'axios'
import {API_URL} from './config'
import SignUp from "./components/Signup";
import GoogleButton from "./components/GoogleButton";
import Navbar from "./components/Navbar";
import PrivateProfile from "./components/user/PrivateProfile";
import ImageUpload from "./components/ImageUpload";
import SignIn from "./components/SignIn";
import EditProfile from "./components/user/EditProfile";
import { CircularProgress } from "@material-ui/core";

class App extends Component {
  
  /////////////// STATE /////////////
  state = {
    user: null,
    errorMessage: null,
    fetchingUser: true
  }

  /////// LIFECYCLE METHODS //////////

   componentDidMount = async() => {
     try{
    let userResponse = await axios.get(`${API_URL}/user`, {withCredentials: true})
    console.log('App.js CDM get user', userResponse)
     this.setState({
          user: userResponse.data,
          fetchingUser: false,
        })
      }
      catch(err) {
        console.log('User fetch failed', err)
        this.setState({
          fetchingUser: false,
        })
      }  
    }
  

  

  /////// SIGN UP, GOOGLE LOGIN, SIGN-IN, LOG OUT  ///////
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
      console.log('Appjs Signup failed', err)
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
        this.props.history.push('/user/edit-profile')
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

  handleSignIn = async (event) => {
    event.preventDefault()
    console.log('Sign in works!!!! Yippeeee')
     const { email, password} = event.target

     let myUser = {
       email: email.value,
       password: password.value
     }
 
     // make a POST signin request to the server
     try {
       let response = await axios.post(`${API_URL}/signin`, myUser, {withCredentials: true})
       this.setState({
         user: response.data
       }, () => {
         console.log(this.state.user)
          this.props.history.push('/')
       })
       
     }
     catch(err) {
       console.log('Signup failed', err.response.data)
       // axios vides us the server response in `response.data`
       // we put `.error` because our server gives us an object with an `error` key  
       this.setState({
          myError:  err.response.data.error
       })
     }
  }
  handleLogOut = async () => {
    try {

      await axios.post(`${API_URL}/logout`, {}, {withCredentials: true})
      // clearing the user once they logout
      this.setState({
        user: null
      } , () => {
        this.props.history.push('/')
      })

    }
    catch(err) {
      console.log('Logout failed', err)
    }
  }

  /////////////////// RENDER ///////////////////
  render(){
    if (this.state.fetchingUser) {
      return <CircularProgress/>
    }

    return(
      <div>
      <div style={{border: '1px solid pink'}}>{this.state.user ? `Logged in User: ${this.state.user.email}` : 'no user logged in'}</div>
        <Switch>
          <Route exact path={'/'} render={(routeProps) =>{
          return <div>
          <SignIn onSignIn={this.handleSignIn}{...routeProps}/>
          <GoogleButton onSuccess={this.handleGoogleSuccess} onFailure={this.handleGoogleFailure}/>
          <Link to={`/signup`}>sign up?</Link>
          </div>
          }}
          />
          <Route path={"/signup"} render={(routeProps) =>{
            return <div>
              <SignUp errorMessage={this.state.errorMessage} onSignUp={this.handleSignUp} {...routeProps}/>
              <GoogleButton onSuccess={this.handleGoogleSuccess} onFailure={this.handleGoogleFailure}/>
            </div>
          }} />
          <Route exact path={"/signin"} render={(routeProps) => {
                return  <SignIn  error={this.state.myError} onSignIn={this.handleSignIn} {...routeProps}  />
              }}/>
          <Route path={'/user/profile'} render={(routeProps) => {
                return <PrivateProfile user={this.state.user} onLogOut={this.handleLogOut} {...routeProps} />
          }} />
          <Route path={'/user/edit-profile'} render={(routeProps) => {
                return <EditProfile {...routeProps} />
          }} />
          <Route path={'/image-upload'} render={(routeProps) => {
                return <ImageUpload {...routeProps} />
          }} />
          </Switch>
          {
            this.state.user ? 
            <Navbar user={this.state.user} /> :
            null
          }
      </div>
    )
  }

}

export default withRouter(App);
