import React, { Component } from 'react'
import {BottomNavigation, BottomNavigationAction} from '@material-ui/core';
import {AccountCircleIcon, ForumIcon, MapIcon, SearchIcon} from '@material-ui/icons/';



export default class Navbar extends Component {
    render() {
        return (
            <div>
            <BottomNavigation value={value} onChange={handleChange} className={classes.root}>
                <BottomNavigationAction label="Profile" value="profile" icon={<AccountCircleIcon />} />
                <BottomNavigationAction label="Messages" value="messages" icon={<ForumIcon />} />
                <BottomNavigationAction label="Nearby" value="nearby" icon={<MapIcon />} />
                <BottomNavigationAction label="Search" value="search" icon={<SearchIcon />} />
            </BottomNavigation>
            </div>
        )
    }
}import  from '@material-ui/icons/AccountCircle';
