import React, { useState } from "react";
import { Box,List, Button, TextField, Table,TableRow, TableBody, TableCell,TableContainer,TableHead,Checkbox, Typography, ListItem, ToggleButton, ToggleButtonGroup} from "@mui/material";
import { v4 as uuidv4 } from 'uuid';
import "./mapEdit.css"
import LayerEntry from "./LayerEntry";


  
export default function LayersEdit(props) {
    const [erase, toggleErase] = useState(false);
    //const [layerOrder, editOrder] = useState([{id: uuidv4(), name: "Layer 1"}]);
    const layerOrder = props.layerOrder;
    //console.log("order", layerOrder);
    const addLayer = () => {
        let new_arr = [...layerOrder];
        new_arr.push({id: uuidv4(), name: "New Layer"})
        props.setOrderCallback(new_arr);
    }
    const deleteLayer = (layer_id) => {
        let old_arr = [...layerOrder];
        let new_arr = old_arr.filter(x => x.id != layer_id);
        props.setOrderCallback(new_arr);
    }
    const changeName = (index, new_name) => {
        let new_arr = [...layerOrder];
        new_arr[index].name = new_name;
        props.setOrderCallback(new_arr);
    }
    const setErase = (event, newState) => {
        toggleErase(newState);
        props.setErase(newState);
    }
    const swapUp = (index) => {
        if(index == 0){
            return;
        }
        let new_arr = [...layerOrder];
        let temp = new_arr[index];
        new_arr[index] = new_arr[index - 1];
        new_arr[index - 1] = temp;
        props.setOrderCallback(new_arr);
    }

    const swapDown = (index) => {
        if(index == (layerOrder.length - 1)){
            return;
        }
        let new_arr = [...layerOrder];
        let temp = new_arr[index];
        new_arr[index] = new_arr[index + 1];
        new_arr[index + 1] = temp;
        props.setOrderCallback(new_arr);
    }
 return (
    <>

<table class="layers-table">
    <thead>
        <tr>
            <th>Layers</th>
            <th></th>
        </tr>
    </thead>
    <Box sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
        <List>
            {layerOrder.map((layer, index) => {
                return <LayerEntry key={layer.id} id={layer.id} name={layer.name} index={index} 
                changeNameCallback={changeName} deleteLayer={deleteLayer} swapUp={swapUp}
                swapDown={swapDown}/>
            })}
        </List>
        
    </Box>
    </table>
    
    <Button onClick={addLayer} aria-label ="import-button"variant='contained' sx={{marginTop:3, marginBottom:2, pr:4, pl:4, backgroundColor:"#4E6C50" }}>
        <Typography variant="h6" component="h2">Add Layer</Typography>
    </Button>
    
    <table class="layers-table">
    <thead>
        <tr>
            <th>Tools</th>
            <th></th>
        </tr>
    </thead>
    <Box sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
        <List>
            <ListItem>
            <ToggleButtonGroup
                value={erase}
                exclusive
                onChange={setErase}
                color="success"
            >
                <ToggleButton value={false}>Draw</ToggleButton>
                <ToggleButton value={true}>Erase</ToggleButton>
                
            </ToggleButtonGroup>
            </ListItem>
        </List>
        
    </Box>
    </table>

    </>
    
 );
}