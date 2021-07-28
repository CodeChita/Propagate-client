import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {AppBar, Avatar, Button, Dialog, IconButton, Input, Slide, Toolbar, Typography} from '@material-ui/core';

import CloseIcon from '@material-ui/icons/Close';

import AvatarEditor from 'react-avatar-editor'

const useStyles = makeStyles((theme) => ({
  appBar: {
    position: 'relative',
  },
  title: {
    marginLeft: theme.spacing(2),
    flex: 1,
  },
}));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function MyAvatarEditor(props) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleUpload = (event) => {

  }

  return (
    <div>
      <IconButton onClick={handleClickOpen}>
       <Avatar src={props.user.profileImageUrl} alt={props.user.username} style={{width: '30vw', height: '30vw', maxWidth: '150px', maxHeight: '150px'}} />
      </IconButton>
      
      <Dialog fullScreen open={open} onClose={handleClose} TransitionComponent={Transition}>
        <AppBar className={classes.appBar}>
          <Toolbar>
            <IconButton edge="start" color="inherit" onClick={handleClose} aria-label="close">
              <CloseIcon />
            </IconButton>
            <Typography variant="h6" className={classes.title}>
              Edit Avatar / Upload new Profile Picture
            </Typography>
            <Button autoFocus color="inherit" onClick={handleClose}>
              save
            </Button>
          </Toolbar>
        </AppBar>
        <div style={{padding: '20px', display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
        <Typography variant="h6" paragraph>Current Avatar:</Typography>
        <Avatar src={props.user.profileImageUrl} alt={props.user.username} style={{width: '30vw', height: '30vw', maxWidth: '150px', maxHeight: '150px'}} />
        <div>
          <label htmlFor="upload-photo">
          <input
            style={{ display: 'none', margin: '20px'}}
            id="upload-photo"
            name="upload-photo"
            type="file"
            onChange={handleUpload}
          />
          <Button color="secondary" variant="contained" component="span">
            Upload button
          </Button>
</label>
        </div>
         </div>
      </Dialog>
    </div>
  );
}


      
