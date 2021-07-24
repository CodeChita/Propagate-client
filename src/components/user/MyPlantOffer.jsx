import { IconButton, Switch, Typography } from '@material-ui/core'
import { Edit } from '@material-ui/icons'
import React, { Component } from 'react'
import { Link } from 'react-router-dom'


export default class MyPlantOffer extends Component{
         
    constructor(props) {
        super(props);
        this.state = { 
            plant: this.props.plant,
            available: this.props.plant.available }
    }
   
    handleChange = (event) => {
        this.setState({available: event.target.checked})
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