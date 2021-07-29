import {Switch, Route, withRouter, Link} from "react-router-dom";
import React, {Component} from 'react'
import axios from 'axios'
import { API_URL } from './config'
import { CircularProgress } from "@material-ui/core";

import SignUp from "./components/auth/Signup";
import SignIn from "./components/auth/SignIn";
import GoogleButton from "./components/auth/GoogleButton";

import PrivateProfile from "./components/user/PrivateProfile";
import EditProfile from "./components/user/EditProfile";
import AllChats from "./components/chat/AllChats";
import Search from "./components/Search/Search";

import Navbar from "./components/Navbar";
import ImageUpload from "./components/ImageUpload";
import AddPlant from "./components/AddPlant";
import PublicProfile from "./components/user/PublicProfile";
import ChatPage from "./components/chat/ChatPage";

// import CapturePicture from "./components/CapturePicture";

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
    let userResponse = await axios.get(`${API_URL}/whoami`, {withCredentials: true})
    console.log('App.js CDM whoami user', userResponse.data)
     await this.setState({
          user: userResponse.data,
          fetchingUser: false,
        })
      }
       catch(err) {
        await this.setState({
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
      <>
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
              <SignUp errorMessage={this.state.errorMessage} onSignUp={this.handleSignUp} {...routeProps} />
              <GoogleButton onSuccess={this.handleGoogleSuccess} onFailure={this.handleGoogleFailure} />
            </>
          )}} />
          <Route exact path={"/signin"} render={(routeProps) => {
                return  <SignIn  errorMessage={this.state.errorMessage} onSignIn={this.handleSignIn} {...routeProps}  />
          }}/>
          <Route exact path={'/user/profile'} render={(routeProps) => {
                return <PrivateProfile user={this.state.user} onLogOut={this.handleLogOut} {...routeProps} />
          }} />
          <Route exact path={'/user/edit-profile'} render={(routeProps) => {
                return <EditProfile {...routeProps} />
          }} />
           <Route exact path={'/users/:userId'} render={(routeProps) => {
                return <PublicProfile me={this.state.user} {...routeProps} />
          }} />
          <Route exact path={'/chats'} render={(routeProps) => {
                return <AllChats me={this.state.user} {...routeProps} />
          }} />
           <Route path="/chat/:chatId"  render={(routeProps) => {
              return  <ChatPage me={this.state.user} {...routeProps}  />
            }}/>
          <Route exact path={'/search'} render={(routeProps) => {
                return <Search {...routeProps} />
          }} />
         
          <Route path={'/image-upload'} render={(routeProps) => {
                return <ImageUpload {...routeProps} />
          }} />
          <Route path={"/addplant"} render={(routeProps) => {
            return <AddPlant {...routeProps}/>
          }} />
        </Switch>
        {
          this.state.user ? 
          <Navbar user={this.state.user} /> : null
        }
      </>
    )
  }

}

export default withRouter(App);
