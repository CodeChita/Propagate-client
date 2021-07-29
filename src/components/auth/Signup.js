import React from 'react';
import { Button, TextField } from '@material-ui/core';

function SignUp(props) {

    const { onSignUp, errorMessage } = props

    return (
        <div>
            <form style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', padding: '5px', margin: '5px' }} onSubmit={onSignUp}>
                <div className="form-group">
                    {/* <input type="text" className="form-control" id="InputUsername" name="username" /> */}
                    <TextField style={{ margin: '5px' }} type="text" id="userName" label="Name" name="username" variant="outlined" />
                </div>
                <div className="form-group">
                    <TextField style={{ margin: '5px' }} type="email" id="email" label="E-mail" name="email" variant="outlined" />

                </div>
                <div className="form-group">
                    <TextField style={{ margin: '5px' }} type='password' id="password" label="Password" name="pasword" variant="outlined" />
                    {/* <label htmlFor="InputPassword">Password</label>
        //         <input name="password" type="password" className="form-control" id="InputPassword" /> */}
                </div>
                {/* <Button type="submit" style={{margin: '5px'}} color="primary" variant="contained" component="span" type="submit" className="btn btn-primary">Submit</Button> */}
                <Button type="submit" color="primary" variant="contained" className="btn btn-primary" style={{ margin: '5px' }}>Submit</Button>
            </form>
            {errorMessage ? <p>{errorMessage}</p> : null}
        </div>
    )
}

export default SignUp

{/* <div>
        <form style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', padding: '5px', margin: '5px'}} onSubmit={onSignUp}>
            <div className="form-group">
                {/* <input type="text" className="form-control" id="InputUsername" name="username" /> */}
        //         <TextField style={{margin: '5px'}} type="text" id="userName" label="Name" name="username" variant="outlined" />
        //     </div>
        //     <div className="form-group">
        //     <TextField style={{margin: '5px'}} type="email" id="email" label="E-mail" name="email" variant="outlined" />

        //     </div>
        //     <div className="form-group">
        //     <TextField style={{margin: '5px'}} type='password' id="password" label="Password" name="pasword" variant="outlined" />
        //         {/* <label htmlFor="InputPassword">Password</label>
        //         <input name="password" type="password" className="form-control" id="InputPassword" /> */}
        //     </div>
        //     <Button style={{margin: '5px'}} color="primary" variant="contained" component="span" type="submit" className="btn btn-primary">Submit</Button>
        // </form>
        // {errorMessage ? <p>{errorMessage}</p> : null}
        // </div>  */}