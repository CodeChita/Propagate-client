import { IconButton, Typography } from '@material-ui/core'
import { Edit, ToggleOn } from '@material-ui/icons'
import React from 'react'

function MyPlantOffer() {
    
    return (
        <div>
            <img src={plant.plantImageUrl} alt={plant.displayName} />
            <Typography variant="h3">{plant.displayName}</Typography>
            <IconButton><Edit/></IconButton>
            <ToggleOn trueorfalse />
        </div>
    )
}

export default MyPlantOffer
