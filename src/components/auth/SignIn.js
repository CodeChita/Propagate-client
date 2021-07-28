import React from 'react';

function SignIn(props){
    return (
        <form onSubmit={props.onSignIn}>
            <div className="form-group">
                <label htmlFor="InputEmail">Email address</label>
                <input type="email" className="form-control" id="InputEmail" name="email" />
            </div>
            <div className="form-group">
                <label htmlFor="InputPassword">Password</label>
                <input name="password" type="password" className="form-control" id="InputPassword" />
            </div>
            <button type="submit" className="btn btn-primary">Submit</button>
            
            {props.errorMessage ? <p>{props.errorMessage}</p> : null}
        </form>
    )
}

export default SignIn