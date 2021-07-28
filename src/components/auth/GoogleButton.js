import React from 'react'
import GoogleLogin from 'react-google-login';
import { GOOGLE_ID } from '../../config';

function GoogleButton(props) {
    const {onSuccess, onFailure} = props
   const ID = GOOGLE_ID
    return (
        <div>
            <GoogleLogin
                clientId= {`${ID}`}
                buttonText="Login"
                onSuccess={onSuccess}
                onFailure={onFailure}
                cookiePolicy={'single_host_origin'}
            />
        </div>
    )
}

export default GoogleButton