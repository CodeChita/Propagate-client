import { IconButton, Typography } from '@material-ui/core'
import { Edit, ToggleOn } from '@material-ui/icons'
import React from 'react'

function MyPlantOffer(props) {

    const plantId
    
    return (
        <div>
            <img src={plant.plantImageUrl} alt={plant.displayName} />
            <Typography variant="h3">{plant.displayName}</Typography>
            <Link to={`/user/plant/${}/edit`}><IconButton><Edit/></IconButton></Link>
            
        </div>
    )
}

export default MyPlantOffer
