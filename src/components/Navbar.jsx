import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import { Forum, Add, Map, Search } from '@material-ui/icons';
import { IconButton, Toolbar, AppBar, Fab, Avatar} from '@material-ui/core';
import { Link } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
    text: {
      padding: theme.spacing(2, 2, 0),
    },
    paper: {
      paddingBottom: 50,
    },
    list: {
      marginBottom: theme.spacing(2),
    },
    subheader: {
      backgroundColor: theme.palette.background.paper,
    },
    appBar: {
      top: 'auto',
      bottom: 0
    },
    grow: {
      flexGrow: 1,
    },
    fabButton: {
      position: 'absolute',
      zIndex: 1,
      top: -30,
      left: 0,
      right: 0,
      margin: '0 auto',
    },
  }));

export default function Navbar(props) {
    
          const classes= useStyles()
          console.log('Navbar props:' , props)
          const {user} = props
          return (
            
            <React.Fragment>
            <AppBar position="fixed" color="primary" className={classes.appBar}>
        <Toolbar>
          <IconButton edge="start" color="inherit">
            <Link underline="none"  to={'/user/profile'}><Avatar alt={user.username} src={user.profileImageUrl}></Avatar></Link>
          </IconButton>
          <IconButton color="inherit">
            <Link underline="none"  to={'/chats'}> <Forum fontSize="large" /> </Link>
          </IconButton>
          <Fab color="secondary" aria-label="add" className={classes.fabButton}>
          <Link underline="none"  to={'/addplant'}> <Add /> </Link>
          </Fab>
          <div className={classes.grow} />
          <IconButton color="inherit">
          <Link underline="none" color="white" to={'/map'} > <Map fontSize="large" /> </Link>
          </IconButton>
          <IconButton edge="end" >
           <Link underline="none" to={'/search'}>  <Search fontSize="large" /> </Link>
          </IconButton>
        </Toolbar>
      </AppBar>
    </React.Fragment>
        )
    }
