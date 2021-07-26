import {Switch, Route, withRouter, Link, Redirect} from "react-router-dom";
import React, {Component} from 'react'
import axios from 'axios'
import { API_URL } from './config'
import SignUp from "./components/Signup";
import GoogleButton from "./components/GoogleButton";
import Navbar from "./components/Navbar";
import PrivateProfile from "./components/user/PrivateProfile";
import ImageUpload from "./components/ImageUpload";
import SignIn from "./components/SignIn";
import EditProfile from "./components/user/EditProfile";
import { CircularProgress } from "@material-ui/core";
import AddPlant from "./components/AddPlant";
import ShowPlant from "./components/ShowPlant";
import CapturePicture from "./components/CapturePicture";

class App extends Component {
  
  /////////////// STATE /////////////
  state = {
    user: null,
    plantImage: null,
    errorMessage: null,
    fetchingUser: true,
    showLoading: null
  }

  /////// LIFECYCLE METHODS //////////

   componentDidMount = async() => {
     try{
    let userResponse = await axios.get(`${API_URL}/user`, {withCredentials: true})
    console.log('App.js CDM get user', userResponse.data)
     this.setState({
          user: userResponse.data,
          fetchingUser: false,
        })
      }
      catch(err) {
        this.setState({
          fetchingUser: false,
        })
      }  
    }
  
  /////// SIGN UP, SIGN-IN, GOOGLE LOGIN, LOG OUT  ///////
  handleSignUp = async (event) => {
    console.log(event.target.username.value)
    event.preventDefault()
    const { username, email, password } = event.target

    let newUser = {
      username: username.value,
      email: email.value,
      password: password.value
    }

    try {
      let response = await axios.post(`${API_URL}/signup`, newUser)
      if (response.data.errorMessage) {
        this.setState({errorMessage: response.data.errorMessage})
      }
    }
    catch (err) {
      console.log('Appjs Signup failed', err)
    }
  }
  handleSignIn = async (event) => {
    event.preventDefault()
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
          this.props.history.push('/user/profile')
       })
       
     }
     catch(err) {
       console.log('Signin failed', err.response.data)
          this.setState({
          errorMessage:  err.response.data.error
       })
     }
  }
  handleGoogleSuccess = (data) => {
    this.setState({
      showLoading: true
    })

    const { givenName, familyName, email, imageUrl, googleId } = data.profileObj
    let newUser = {
      firstName: givenName,
      lastName: familyName,
      username: `${givenName} ${familyName}`,
      email,
      profileImageUrl: imageUrl,
      googleId
    }

    console.log(newUser)
    axios.post(`${API_URL}/google/info`, newUser, { withCredentials: true })
      .then((response) => {
        console.log('GoogleSignUp:', response)
        this.setState({
          user: response.data.data,
          errorMessage: null,
          showLoading: false
        }, () => {
          this.props.history.push('/user/profile')
        });
      })
  }
  handleGoogleFailure = () => {
    console.log('failed google auth')
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
        <img src="/images/propagate-med.svg" alt="propagate app" />
        <Switch>
          <Route exact path={'/'} render={(routeProps) =>{
            return(
          <>
            <SignIn errorMessage={this.state.errorMessage} onSignIn={this.handleSignIn}{...routeProps}/>
            <GoogleButton onSuccess={this.handleGoogleSuccess} onFailure={this.handleGoogleFailure}/>
            <Link to={`/signup`}>sign up?</Link>
          </>
          )}} />
          <Route path={"/signup"} render={(routeProps) => {
            return (
            <>
              <SignUp onSignUp={this.handleSignUp} {...routeProps} />
              <GoogleButton onSuccess={this.handleGoogleSuccess} onFailure={this.handleGoogleFailure} />
            </>
          )}} />
          <Route exact path={"/signin"} render={(routeProps) => {
                return  <SignIn  errorMessage={this.state.errorMessage} onSignIn={this.handleSignIn} {...routeProps}  />
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
          <Route path={"/addplant"} render={(RouteProps) => {
            return <AddPlant/>
          }} />
        </Switch>
        {
          this.state.user ? 
          <Navbar user={this.state.user} /> : null
        }
      </div>
    )
  }

}

export default withRouter(App);
