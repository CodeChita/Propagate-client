import { Typography } from '@material-ui/core'
import React from 'react'
import LottieControl from './LottieControl'
import errorAnimation from './errorAnimation.json'

function NotFound() {
    return (
        <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', padding: '10px'}}>
            <Typography variant="h5">404: Not Found</Typography>
            <LottieControl width='50vw' height='50vw' animation={errorAnimation} />
       
        </div>
    )
}

export default NotFound
