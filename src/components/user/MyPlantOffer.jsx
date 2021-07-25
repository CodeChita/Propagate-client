import { IconButton, Switch, Typography } from '@material-ui/core'
import { Edit } from '@material-ui/icons'
import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { API_URL } from '../../config'
import axios from 'axios'


export default class MyPlantOffer extends Component{
         
    constructor(props) {
        super(props);
        this.state = { 
            plant: this.props.plant,
            available: this.props.plant.available }
    }
   
    handleChange = async (event) =>  {
        
        await this.setState({available: event.target.checked})
        const newPlant = await this.state.plant
        delete newPlant._id
        newPlant.available = this.state.available
        let response = await axios.patch(`${API_URL}/user/plant/${this.state.plant._id}`, newPlant)
        console.log(response)
    }
    
    
    render() {
        const { _id, displayName, scientificName, plantImageUrl } = this.state.plant      

        return (
        <div style={{border: '#BBB 1px solid', marginBottom : '10px'}}>
            <div style={{    
                    display : 'flex', 
                    flexDirection : 'row', 
                    alignContent: 'center', 
                    justifyContent : 'space-between'
                    }}>

            <img src={plantImageUrl} alt={scientificName}
                 style={{height: '100px', width : '100px' }} />
            <Typography variant="h4">{displayName}</Typography>

            <div style={{height : 'auto', display : 'flex', flexDirection : 'column', justifyContent : 'space-between'}}>
            <Link to={`/user/plant/${_id}/edit`}><IconButton><Edit/></IconButton></Link>
            <Switch checked={this.state.available} color="secondary" onChange={this.handleChange} name={scientificName} />
            </div>
            </div>
        </div>
        )
    }
}