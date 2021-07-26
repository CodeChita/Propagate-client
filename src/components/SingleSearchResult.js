import { Avatar, IconButton, Switch, Typography } from '@material-ui/core'
import { Edit } from '@material-ui/icons'
import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { API_URL } from '../../config'
import axios from 'axios'

function SingleSearchResult(props) {

    const { displayName, scientificName, plantImageUrl } = this.props.plant

    return (
        <div style={{ border: '#BBB 1px solid', marginBottom: '10px' }}>
            <div style={{
                display: 'flex',
                flexDirection: 'row',
                alignContent: 'center',
                justifyContent: 'space-between',
                padding: '10px'
            }}>

                <img src={plantImageUrl} alt={scientificName}
                    style={{ height: '100px', width: '100px' }} />

                <div style={{ height: 'auto', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                    <Typography variant="h4">{displayName}</Typography>
                    <Typography variant="subtitle1">{scientificName}</Typography>
                    <Typography variant="subtitle2">{location}</Typography>
                </div>

                <Avatar alt={props.plant.user.username} src={props.plant.user.profileImageUrl} />
            </div>
        </div>
        )
}