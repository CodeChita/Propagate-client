import React from 'react'
import GoogleLogin from 'react-google-login';

function GoogleButton(props) {
    const {onSuccess, onFailure} = props
   const ID = "603085994788-smdtl36j1veesrhj9r33vufoa6f5a4n0.apps.googleusercontent.com"
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