import React from 'react'
import CapturePicture from '../CapturePicture'
import { Select, MenuItem, Button } from '@material-ui/core';
// import { API_URL } from "../config";

export default function ImageUpload(props) {
    const { onImageUpload } = props
    return (
        <div>
            <form onSubmit={onImageUpload} style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', padding: '5px', margin: '5px'}}>
                {/* <CapturePicture/> */}
                {/* <input type="file" name="imageUrl" accept="image/png, image/jpg" /> */}
                <label htmlFor="imageUrl">
                    <input
                        accept="image/png, image/jpg"
                        style={{ display: 'none', margin: '20px' }}
                        id="imageUrl"
                        name="imageUrl"
                        type="file"
                    />
                    <Button color="secondary" variant="contained" component="span">
                        Choose Image
                    </Button>
                </label>

                <Select name='organ' style={{margin: '20px'}}>
                    <MenuItem value="leaf">Leaf</MenuItem>
                    <MenuItem value="flower">Flower</MenuItem>
                    <MenuItem value="fruit">Fruit</MenuItem>
                    <MenuItem value="bark">bark</MenuItem>
                </Select>
                 <Button type="submit" color="primary" variant="contained" className="btn btn-primary" style={{ margin: '20px' }}>Submit</Button>
            </form>
        </div>
    )
}


