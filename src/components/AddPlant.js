import React from'react'

function AddPlant(props) {
    return (
        <form onSubmit={props.onAddPlant}>
        <input type="file"  accept="image/*" name="image" id="file" ></input>
        <button type="submit" className="btn btn-primary">Submit</button>
    </form>
    )
}

export default AddPlant