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
        await this.setState( prevState => ({

            plant: {
                ...prevState.plant,
                available: event.target.checked
            },
            available: event.target.checked

        }))
        console.log('state log before axios', this.state.plant)
        let response = await axios.patch(`${API_URL}/user/plant/${this.state.plant._id}`, {plant: this.state.plant}, {withCredentials: true})
        console.log('response', response.data)
        await this.setState({plant: response.data})   
        console.log('state after update from response', this.state.plant) 
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

            <div style={{height : 'auto', display : 'flex', flexDirection : 'column', justifyContent : 'center'}}>
            <Typography variant="h4">{displayName}</Typography>
            <Typography variant="subtitle1">{scientificName}</Typography>
            </div>
            <div style={{height : 'auto', display : 'flex', flexDirection : 'column', justifyContent : 'space-between'}}>
            <Link to={`/user/plant/${_id}/edit`}><IconButton><Edit/></IconButton></Link>
            <Switch checked={this.state.available} color="secondary" onChange={this.handleChange} name={scientificName} />
            </div>
            </div>
        </div>
        )
    }
}