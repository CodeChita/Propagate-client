import React from 'react'
import { Select, MenuItem, TextField, InputLabel, FormControl, Button } from '@material-ui/core';

export default function PickingName(props) {
    // const classes = useStyles();
    const [age, setAge] = React.useState('');

    const handleChange = (event) => {
        setAge(event.target.value);
    };
    const { plantInfo, onAddingPlant } = props
    return (
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', padding: '5px', margin: '5px' }}>
            <h1>{plantInfo.plant.species.scientificNameWithoutAuthor}</h1>
            <img src={plantInfo.picture} alt='plant' width='100px' />
            <form variant="filled" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', padding: '5px', margin: '5px' }} onSubmit={onAddingPlant} >
                <InputLabel id="demo-simple-select-label">Pick a name</InputLabel>
                <Select style={{margin: '5px'}}
                    name="plantName"
                    labelid="demo-simple-select-filled-label"
                    id="demo-simple-select-filled"
                    value={age}
                    onChange={handleChange}
                >
                    {plantInfo.plant.species.commonNames.map((plantName, i) => {
                        return <MenuItem key={i} value={plantName}>{plantName}</MenuItem>
                    })}
                </Select>
                <br />

                {/* <Select name='plantName'>
                    {plantInfo.plant.species.commonNames.map((plantName, i) => {
                        return <option key={i} value={plantName}>{plantName}</option>
                    })}
                </Select> <br/> */}

                <TextField style={{margin: '5px'}} id="zipCode" label="zipCode" name="zipCode" variant="outlined" />
                <TextField style={{margin: '5px'}} id="city" label="city" name="city" variant="outlined" />
                <br />
                <Button type='submit'>Submit</Button>
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