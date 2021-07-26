import React from 'react'
import { API_URL } from "../config";

function AddPlant(props) {
    return (
        <div>
            <form method="POST" action={`${API_URL}/plant/upload`} encType="multipart/form-data">
                <input type="file" name="imageUrl" accept="image/png, image/jpg" />
                <select name='organ'>
                    <option value="leaf">Leaf</option>
                    <option value="flower">flower</option>
                </select>
                <button type="submit">Submit</button>
            </form>
        </div>
    )
}

export default AddPlant