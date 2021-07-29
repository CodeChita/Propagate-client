import React from 'react';
import { Link } from 'react-router-dom';
import { TextField, Button } from '@material-ui/core';

function SignIn(props) {
    return (
        <div >
        <form style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', padding: '5px', margin: '5px'}} onSubmit={props.onSignIn}>
            <div style={{margin: '5px'}} className="form-group">
                <TextField id="email" label="E-mail" name="email" variant="outlined" />

            </div>
            <div style={{margin: '5px'}} className="form-group">
                <TextField type='password' id="password" label="Password" name="pasword" variant="outlined" />
            </div>
            <Button type="submit" color="primary" variant="contained" className="btn btn-primary" style={{ margin: '5px' }}>Submit</Button>
            {props.errorMessage ? <p>{props.errorMessage}</p> : null}

        </form>
        <Link style={{display: 'flex', justifyContent: 'center'}} to={`/signup`}>sign up?</Link>
        </div>
    )
}

export default SignIn