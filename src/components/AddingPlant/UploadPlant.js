import React from 'react'
import CapturePicture from '../CapturePicture'
// import { API_URL } from "../config";

export default function ImageUpload(props) {
    const { onImageUpload } = props
    return (
        <div>
            <form onSubmit={onImageUpload} >
                <CapturePicture/>
                <input type="file" name="imageUrl" accept="image/png, image/jpg" />
                <select name='organ'>
                    <option value="leaf">Leaf</option>
                    <option value="flower">Flower</option>
                    <option value="fruit">Fruit</option>
                    <option value="bark">bark</option>
                </select>
                <button type="submit">Submit</button>
            </form>
        </div>
    )
}


