import React, { Component } from 'react'
import { TextField, InputAdornment, CircularProgress} from '@material-ui/core'
import { SearchOutlined } from '@material-ui/icons'
import axios from 'axios'
import { API_URL } from '../../config'
import SingleSearchResult from './SingleSearchResult'

export default class Search extends Component {
    
    state = {
        allPlants: null,
        filteredPlants: null,
        loading: true

    }
    async componentDidMount() {
        let response = await axios.get(`${API_URL}/search`, {}, {withCredentials: true});
        console.log('ALL PLANTS', response.data)
        this.setState({
            allPlants: response.data,
            filteredPlants: response.data,
            loading: false
        })
    }
    
    handleSearch = (event) => {
        const {allPlants} = this.state
        let searchedPlant = event.target.value
        let  filteredPlants = allPlants.filter((plant) => {
            let concat = `${plant.scientificName} ${plant.displayName} ${plant.commonName[0]} ${plant.commonName[1]} ${plant.commonName[2]}`
            return concat.toLowerCase().includes(searchedPlant.toLowerCase())
        })
        this.setState({ filteredPlants: filteredPlants})
    
      }

    render() {
        if (this.state.loading) {
            return <CircularProgress/>
          }
        return (
            
            <div>
                <TextField  id="searchBar"
                            label="Search for plants..."
                            onChange={this.handleSearch}
                            variant="outlined" autoComplete="false" autoFocus fullWidth
                            InputProps={{startAdornment:  <InputAdornment position="start"> <SearchOutlined /> </InputAdornment>}}
                />
                { this.state.filteredPlants.map((plant, index) => {
                    return ( <SingleSearchResult key={index} plant={plant} />)
                })}
            </div>
        )
    }
}

