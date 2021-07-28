// import { TextField, Typography, InputAdornment, IconButton} from '@material-ui/core'
// import { SearchOutlined } from '@material-ui/icons'
// import axios from 'axios'
// import React, { useState, useEffect } from 'react'
// import { API_URL } from '../../config'

// function Search (props) {

//     useEffect( async () => {
//         let allPlants = await axios.get(`${API_URL}/user/search`, {}, {withCredentials: true})
//         console.log('ALL PLANTS', allPlants.length)
//     }, [])
//         const filteredPlants = JSON.parse(JSON.stringify(allPlants))   

           
//     const [allPlants, setAllPlants] = useState(allPlants)
//     const [fPlants, setfPlants] = useState(filteredPlants)

//     handleSearch = (event) => {
//         let searchedPlant = event.target.value
        
//         let concatPlants = allPlants.forEach((plant) => {
//             plant.concat = `${plant.scientificName} ${plant.displayName} ${plant.commonName[0]} ${plant.commonName[1]} ${plant.commonName[2]}`
//             console.log(plant.concat)
//         })
//         this.setState ( {filteredBooks: filteredBookList})
//       }

//     return (
//         <div>
//             <TextField  id="searchBar"
//                         label="Search for plants..."
//                         placeholder=''
//                         value={searchField}
//                         onChange={handleChange}
//                         variant="outlined" autoComplete="false" autoFocus fullWidth
//                         InputProps={{endAdornment: 
//                                     <InputAdornment position="end">
//                                     <IconButton color="primary" onClick={handleSearch}> 
//                                     <SearchOutlined /> 
//                                     </IconButton>
//                                     </InputAdornment>
//                                     }}
//             />
//             <Typography variant="subtitle2" color="textSecondary">{searchError ? searchError : null}</Typography>
//         </div>
//     )
// }
// export default Search
