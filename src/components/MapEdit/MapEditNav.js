import React, { useState } from "react";
import { Table,TableRow, TableBody, TableCell,TableContainer,TableHead, Checkbox, Typography, Divider,TextField} from "@mui/material";

import "./mapEdit.css"
function createData(number, item, qty, price) {
 return { number, item, qty, price };
}
  
export default function MapEditNav({mapWidth, mapHeight, setMapHeight,setMapWidth}) {
    const [changingWidth,setChangingWidth]= useState(false)
   
    const [changingHeight,setChangingHeight]= useState(false)
    
    // const [mapHeight,setMapHeight]= useState(32)


    const doneEditingValue=(e)=>{
        changingWidth?setMapWidth(e): setMapHeight(e)
        
        
        changingWidth? setChangingWidth(false): setChangingHeight(false)
    }

    const handleKeyDown = (e) => {
        if (e.key === 'Enter'){
         changingWidth?setMapWidth(e.target.value): setMapHeight(e.target.value)
        }
      }
 return (
    <>
    <Typography sx={{textAlign:"center" ,fontWeight:900 ,}}>Properties</Typography>
    <table class="map-table">
    
    <thead>
        <tr>
            <th>Property</th>
            <th>Value</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            
            <td>Map Width</td> 
            {changingWidth? <TextField sx={{fontSize:"1.3rem",mt:1,ml:1}} defaultValue={mapWidth} onBlur={(e) => doneEditingValue(e.target.value) } 
            onKeyDown={handleKeyDown} variant="standard" />:<td onDoubleClick={() => setChangingWidth(true)}>{mapWidth}</td>}
        </tr>
        <tr class="active-row">
        <td>Map Height</td>
        {changingHeight? <TextField sx={{fontSize:"1.3rem",mt:1,ml:1}} defaultValue={mapHeight} onBlur={(e) => doneEditingValue(e.target.value) } 
            onKeyDown={handleKeyDown} variant="standard" />:<td onDoubleClick={() => setChangingHeight(true)}>{mapHeight}</td>}
            
    
        </tr>
        <tr>
            <td>Map Width</td>
            
            <td>16</td>
            
        </tr>
        <tr class="active-row">
            
            <td>Tile Height</td>
            <td>16</td>
        </tr>

        <Divider/>

        <tr class="active-row">
            
            <td>Colliadble</td>
            <td><Checkbox  defaultChecked /></td>
        </tr>
        
    </tbody>
</table>
    
    </>
    
 );
}