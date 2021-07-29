import { Avatar, IconButton, Typography } from '@material-ui/core'
import { Forum, ForumOutlined } from '@material-ui/icons'
import React from 'react'
import { Link } from 'react-router-dom'


export default function SinglePlantCard(props) {

    const { _id: plantId, 
            displayName, 
            location: city, 
            scientificName, 
            plantImageUrl, 
            user: {username, _id: userId, profileImageUrl }
        } = props.plant
    
    return (
        <div style={{ border: '#BBB 1px solid', margin: '2px', marginBottom: '10px' }}>
            <div style={{
                display: 'flex',
                flexDirection: 'row',
                alignContent: 'center',
                justifyContent: 'space-between',
                padding: 'none'
                }}>

                <img src={plantImageUrl} alt={scientificName}
                    style={{ height: '25vw', width: '25vw', maxHeight: '100px', maxWidth: '100px' }} />

                    <div style={{ paddingLeft: '5px', width: '50vw', height: 'auto', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                        <Typography variant="h5">{displayName}</Typography>
                        <Typography variant="subtitle1">{scientificName}</Typography>
                        <Typography variant="subtitle2">{city}</Typography>
                    </div>
                    <div style={{ height: 'auto', width: '25vw', maxWidth: '100px', display: 'flex', flexDirection: 'column',  alignItems: 'center', justifyContent: 'center' }}>
                        <IconButton><ForumOutlined /> </IconButton>
                        
                        <Link/>
                        <Typography varient="caption" align="center" >{username}</Typography>
                    </div>
            </div> 
        </div>
        )
}