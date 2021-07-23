import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import { AccountCircle, Forum, Add, Map, Search, EventBusyOutlined } from '@material-ui/icons';
import { IconButton, Toolbar, AppBar, Fab} from '@material-ui/core';

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

export default function Navbar() {
    
          const classes= useStyles()
          return (
           
            <React.Fragment>
            <AppBar position="fixed" color="primary" className={classes.appBar}>
        <Toolbar>
          <IconButton edge="start" color="inherit">
            <AccountCircle />
          </IconButton>
          <IconButton color="inherit">
            <Forum />
          </IconButton>
          <Fab color="secondary" aria-label="add" className={classes.fabButton}>
            <Add />
          </Fab>
          <div className={classes.grow} />
          <IconButton color="inherit">
            <Map />
          </IconButton>
          <IconButton edge="end" color="inherit">
            <Search/>
          </IconButton>
        </Toolbar>
      </AppBar>
    </React.Fragment>
        )
    }
