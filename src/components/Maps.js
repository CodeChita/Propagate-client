import React, {useEffect, useState} from  'react'
import {MapContainer, TileLayer, Marker, Popup} from  'react-leaflet'
import axios from 'axios'
import { API_URL } from "../config";
//Don't forget to import the css
import  'leaflet/dist/leaflet.css'


  
function MyMap() {
	const [allPlants, setPlants] = useState([])
    //Some random co-ordinate
	const position = [Number("52.39709954999999"), 4.648121325]

	// function check () {
	// 	// event.preventDefault()
	// 	console.log('check')
	// }

	//   useEffect (async () => {
	// 	let response = await axios.get(`${API_URL}/search`, {withCredentials: true})
	// 	await console.log(response)
	// 	setPlants(response.data)
	// }, [])
    //Do not forget to set a width and height style to your map. Else it won't show up
	return (
	<div>
		{/* <input type="search" id="myInput" onChange={check()}></input> */}
		<MapContainer  
			style={{width: '800px', height: '500px'}} 
			center={position}  zoom={13}  
			scrollWheelZoom={true}>
			<TileLayer
				attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
				url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
			/>
			{/* {
				allPlants.map((plant, i) =>{
					return (<>
					<Marker  key={i} position={plant.location}>
					<Popup>
						PLANT <br  /> Easily customizable.
					</Popup>
				</Marker>
				</>)
				})
			} */}
			<Marker  position={position}>
				<Popup>
					PLANT <br  /> Easily customizable.
				</Popup>
			</Marker>
		</MapContainer>
	</div>
	)
}

export  default MyMap