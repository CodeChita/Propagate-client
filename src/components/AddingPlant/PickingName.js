import React from 'react'

export default function PickingName(props) {
    const { plantInfo, onAddingPlant } = props
    return (
        <div>
            <h1>{plantInfo.plant.species.scientificNameWithoutAuthor}</h1>
            <img src={plantInfo.picture} alt='plant' width='100px' />
            <form onSubmit={onAddingPlant} >
            <label for="name">Pick a name</label>
            <select name='plantName'>
                    {plantInfo.plant.species.commonNames.map((plantName, i) => {
                        return <option key={i} value={plantName}>{plantName}</option>
                    })}
                </select> <br/>
                <label for="city">city</label>
                <input type="text" id="city" name="city" /> <br/>
                <button type='submit'>Submit</button>
            </form>

        </div>
    )
}

// <FormLabel component="legend">Name the plant</FormLabel>
//                 <RadioGroup aria-label="name" name="plantName" value={value} onChange={handleChange}>
//                     {plantInfo.plant.species.commonNames.map((plantName, i) => {
//                         return <FormControlLabel key={i} value={plantName} control={<Radio />} label={plantName} />
//                     })}
//                 </RadioGroup>