import { Switch, Route, withRouter} from "react-router-dom";
import React, { Component } from 'react'
import axios from 'axios'
import { API_URL } from './config'
import { CircularProgress } from "@material-ui/core";

import SignUp from "./components/auth/Signup";
import SignIn from "./components/auth/SignIn";


import PrivateProfile from "./components/user/PrivateProfile";
import EditProfile from "./components/user/EditProfile";
import AllChats from "./components/chat/AllChats";
import Search from "./components/Search/Search";

import Navbar from "./components/Navbar";
import ImageUpload from "./components/ImageUpload";
import AddPlant from "./components/AddPlant";
import CapturePicture from "./components/CapturePicture";

import Maps from "./components/Maps";
import PublicProfile from "./components/user/PublicProfile";
import ChatPage from "./components/chat/ChatPage";
import NotFound from "./utils/NotFound";

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

  componentDidMount = async () => {
    try {
      let userResponse = await axios.get(`${API_URL}/whoami`, { withCredentials: true })
      console.log('App.js CDM whoami user', userResponse.data)
      await this.setState({
        user: userResponse.data,
        fetchingUser: false,
      })
    }
    catch (err) {
      await this.setState({
        fetchingUser: false,
      })
    }
  }

  /////// SIGN UP, SIGN-IN, GOOGLE LOGIN, LOG OUT  ///////
  handleSignUp = async (event) => {
    console.log('CHECKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKK')
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
        this.setState({ errorMessage: response.data.errorMessage })
      }
      this.props.history.push('/')
    }
    catch (err) {
      console.log('Appjs Signup failed', err)
    }
  }

  handleSignIn = async (event) => {
    event.preventDefault()
    const { email, password } = event.target

    let myUser = {
      email: email.value,
      password: password.value
    }
    try {
      let response = await axios.post(`${API_URL}/signin`, myUser, { withCredentials: true })
      this.setState({
        user: response.data
      }, () => {
        this.props.history.push('/user/profile')
      })

    }
    catch (err) {
      console.log('Signin failed', err.response.data)
      this.setState({
        errorMessage: err.response.data.error
      })
    }
  }

  handleLogOut = async() => {
  await axios.post(`${API_URL}/logout`, {}, {withCredentials: true})
        this.setState({ user: null } , () => {this.props.history.push('/')})
  }

  /////////////////// RENDER ///////////////////
  render() {
    if (this.state.fetchingUser) {
      return <CircularProgress />
    }

    return (
      <>
        <img src="/images/propagate-med.svg" alt="propagate app" />
        <Switch>
          <Route exact path={'/'} render={(routeProps) => {
            return (
              <SignIn errorMessage={this.state.errorMessage} onSignIn={this.handleSignIn}{...routeProps} />
            )
          }} />
          <Route path={"/signup"} render={(routeProps) => {
            return (
              <SignUp errorMessage={this.state.errorMessage} onSignUp={this.handleSignUp} {...routeProps} />
            )
          }} />
          <Route exact path={"/signin"} render={(routeProps) => {
            return <SignIn errorMessage={this.state.errorMessage} onSignIn={this.handleSignIn} {...routeProps} />
          }} />
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
          <Route path="/chat/:chatId" render={(routeProps) => {
            return <ChatPage me={this.state.user} {...routeProps} />
          }} />
          <Route exact path={'/search'} render={(routeProps) => {
            return <Search {...routeProps} />
          }} />

          <Route path={'/image-upload'} render={(routeProps) => {
            return <ImageUpload {...routeProps} />
          }} />
          <Route path={"/addplant"} render={(routeProps) => {
            return <AddPlant {...routeProps} />
          }} />
          <Route path={"/map"} render={(routeProps) => {
            return <Maps {...routeProps} />
          }} />
          <Route path={'/capture'} render={(routerProps) => {
            return <CapturePicture />
          }} />
          <Route component={NotFound} />
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
