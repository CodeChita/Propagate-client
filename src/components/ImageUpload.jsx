import React from 'react'
import { API_URL } from "../config";

export default function ImageUpload() {
    return (
        <div>
         <form method="POST" action={`${API_URL}/plant/create`} encType="multipart/form-data">
    <input type="text" name="plantImageUrl" accept="image/png, image/jpg" />
    <input type="text" name="scientificName" placeholder="science" />
    <input type="text" name="common1" placeholder="c1" />
    <input type="text" name="common2" placeholder="c2" />
    <input type="text" name="common3" placeholder="c3" />
    <input type="text" name="location" placeholder="location" />
    <button type="submit">Submit</button> 
    </form>        
        </div>
    )
}
