import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet'
import L from 'leaflet';
import { Avatar, Button, CircularProgress, IconButton, TextField, Typography } from '@material-ui/core'
import axios from 'axios'
import { API_URL } from "../config";
//Don't forget to import the css
import 'leaflet/dist/leaflet.css'

import { createTheme } from '@material-ui/core/styles';


function MyMap() {
	const theme = createTheme({
		palette: {
		  primary: {
			light: '#757ce8',
			main: '#3f50b5',
			dark: '#002884',
			contrastText: '#fff',
		  },
		  secondary: {
			light: '#ff7961',
			main: '#f44336',
			dark: '#ba000d',
			contrastText: '#000',
		  },
		},
	  });
	  

	const ironhackLogo = new L.Icon({
		iconUrl: '../logo192.png',
		iconSize: [38, 35],
	});

	const [allPlants, setPlants] = useState([])
	//Some random co-ordinate
	const [position, setPosition] = useState([52.39709954999999, 4.648121325])


	// function check () {
	// 	// event.preventDefault()
	// 	console.log('check')
	// }

	useEffect(() => {
		async function getPlants() {
			let response = await axios.get(`${API_URL}/search`, { withCredentials: true })
			await console.log(response)
			setPlants(response.data)
			console.log('all plants', allPlants)
		}
		getPlants()
	}, [])



	async function handleSearch(event) {
		let location = event.target.city.value
		event.preventDefault()
		let cordinate = await axios(`https://nominatim.openstreetmap.org/search.php?city=${location}&format=json&accept-language=en`)

		let city = await cordinate.data[0]
		let geoLocation = [+city.lat, +city.lon]
		await setPosition(geoLocation)
		console.log(geoLocation)
	}

	function ChangeView({ center, zoom }) {
		const map = useMap();
		map.setView(center, zoom);
		return null;
	}

	//Do not forget to set a width and height style to your map. Else it won't show up

	return (
		<div>
			<form style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', padding: '5px', margin: '5px' }} onSubmit={handleSearch}>
				<TextField id="searchBar"
					label="Search for plants..."
					name='city' variant="outlined" autoComplete="false" autoFocus fullWidth
				/>
				<Button variant="contained" 
                            color="#1f998a" 
                            size="large" 
							type='submit'>Submit</Button>
			</form>
			<MapContainer
				style={{ width: '500px', height: '500px', display: 'flex',  justifyContent: 'center', alignItems: 'center', padding: '5px', margin: '5px' }}
				center={position} zoom={12}
				scrollWheelZoom={true}
			>

				<ChangeView center={position} zoom={12} />
				<TileLayer
					attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
					url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
				/>
				{
					allPlants.map((plant, i) => {
						return (
							<Marker position={plant.geoLocation} icon={ ironhackLogo }>
								<Popup>
								<Link to={{pathname: `/users/${plant.user._id}`, state:{plant: plant._id}}}>{plant.displayName}</Link> 
									<br /> 
									<img src={plant.plantImageUrl} alt='pic of plant' width='50px'/>.
								</Popup>
							</Marker>
						)
					})}
			</MapContainer>
		</div>
	)
}

export default MyMap