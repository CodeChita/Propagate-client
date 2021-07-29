import { Typography } from '@material-ui/core'
import React from 'react'

function NotFound() {
    return (
        <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', padding: '10px'}}>
            
            <Typography variant="h5">404: Not Found</Typography>
        </div>
    )
}

export default NotFound
