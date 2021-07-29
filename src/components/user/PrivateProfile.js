import { Avatar, IconButton, CircularProgress, Typography } from '@material-ui/core'
import { Delete, ExitToApp } from '@material-ui/icons'
import React, { Component } from 'react'
import MyPlantOffer from './MyPlantOffer'
import axios from 'axios'
import { API_URL } from '../../config'
import { Link } from 'react-router-dom'


export default class PrivateProfile extends Component {

    componentDidMount = async () => {
        let response = await axios.get(`${API_URL}/whoami`, {withCredentials: true})
        console.log('PrivateProfile User data:', response.data)
        await this.setState({
            user: response.data,
            fetchingUser: false
        })
    }

    state = {
        user: null,
        fetchingUser: true
    }
    render() {
        if (this.state.fetchingUser) {
            return <CircularProgress />
        }
        const { profileImageUrl, plantsOffered, username, } = this.state.user
        return (
            <>
                <div style={{ margin: '10px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <IconButton onClick={this.props.onLogOut} label="Logout" style={{ alignSelf: 'flex-end' }}><ExitToApp fontSize="large" /></IconButton>

                    <Avatar alt={username} src={profileImageUrl} />
                    <Link to="/user/edit-profile">edit profile</Link>
                </div>
                <div>
                    {
                        !this.state.user ?
                            'You have no plants offered. Add some now!' :
                            plantsOffered.map((plant, index) => {
                                return <MyPlantOffer key={index} plant={plant} />
                            })}
                    <div style={{ color: "red", display: 'flex', justifyContent: 'center' }}>
                        <Delete /><Typography color="danger" variant="h6">Delete Account</Typography>
                    </div>
                </div>
            </>
        )
    }
}
