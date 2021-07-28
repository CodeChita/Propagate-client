import React from 'react'
// import { API_URL } from "../config";
import UploadPlant from './AddingPlant/UploadPlant';
import axios from 'axios'


function AddPlant() {
  async function handelImageUpload (event) {
    event.preventDefault();
    const file = event.target.imageUrl
    await axios.post(`${API_URL}plant/upload`)

    }

    return (
        <div>
            <UploadPlant onImageUpload={handelImageUpload}/>
        </div>
    )
}

export default AddPlant

// function AddPlant(props) {


    
//     return (
//         <div>
//             <form method="POST" action={`${API_URL}/plant/upload`} encType="multipart/form-data">
//                 <input type="file" name="imageUrl" accept="image/png, image/jpg" />
//                 <select name='organ'>
//                     <option value="leaf">Leaf</option>
//                     <option value="flower">flower</option>
//                 </select>
//                 <button type="sub   mit">Submit</button>
//             </form>
//         </div>
//     )
// }
