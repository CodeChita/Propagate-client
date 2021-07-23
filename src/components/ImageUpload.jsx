import React from 'react'
import { API_URL } from "../config";

export default function ImageUpload() {
    return (
        <div>
         <form method="POST" action={`${API_URL}/api/profile/upload`} encType="multipart/form-data">
    <input type="file" name="imageUrl" accept="image/png, image/jpg" />
    <button type="submit">Submit</button> 
    </form>        
        </div>
    )
}
