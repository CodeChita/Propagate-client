import React, { useState } from 'react'
import { API_URL } from "../config";
import UploadPlant from './AddingPlant/UploadPlant';
import PickingName from './AddingPlant/PickingName';
import axios from 'axios'
// import { ThemeConsumer } from 'styled-components';


function AddPlant(props) {
    const [plantName, setPlantName] = useState({})
    const [hide, setHide] = useState(true)
    async function handelImageUpload(event) {
        event.preventDefault();
        const file = event.target.imageUrl.files[0]
        const organ = event.target.organ.value
        let uploadForm = new FormData()
        uploadForm.append('imageUrl', file)
        uploadForm.append('organ', organ)
        let result = await axios({
            method: 'post',
            url: `${API_URL}/plant/upload`,
            data: uploadForm
        })
        setPlantName(result.data)
        setHide(false)
        console.log(result.data)


    }
    async function handelAddingPlant(event) {
        event.preventDefault()
        // let point = event.target.city.value
        // let location = await axios (`https://nominatim.openstreetmap.org/search.php?city=amsterdam&format=json&accept-language=en`)
        // console.log(location[0])

        const plantData = await {
            plantImageUrl: plantName.picture,
            displayName: event.target.plantName.value,
            scientificName: plantName.plant.species.scientificNameWithoutAuthor,
            commonName: plantName.plant.species.commonNames,
            location: event.target.city.value,
        }
        console.log(plantData.location)
        await axios({
            method: 'post',
            url: `${API_URL}/plant/add`,
            data: plantData,
            withCredentials: true
        })
        props.history.push('/user/profile')
    }

    return (
        <div>
            {hide && <UploadPlant onImageUpload={handelImageUpload} />}
            {!hide && <PickingName plantInfo={plantName} onAddingPlant={handelAddingPlant} />}
        </div>
    )
}

export default AddPlant