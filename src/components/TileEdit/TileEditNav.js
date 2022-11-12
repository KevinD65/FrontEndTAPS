import React, { useState } from "react";
import { Table,TableRow, TableBody, TableCell,TableContainer,TableHead, Checkbox, Typography, Divider,TextField} from "@mui/material";

import "./tileEdit.css"
function createData(number, item, qty, price) {
 return { number, item, qty, price };
}
  
export default function TileEditNav({canvasWidth, setCanvasWidth, canvasHeight, setCanvasHeight}) {
    const [changingWidth,setChangingWidth]= useState(false)
   
    const [changingHeight,setChangingHeight]= useState(false)
    
    // const [mapHeight,setMapHeight]= useState(32)


    const doneEditingValue=(e)=>{
        changingWidth?setCanvasWidth(e): setCanvasHeight(e)
        
        
        changingWidth? setChangingWidth(false): setChangingHeight(false)
    }

    const handleKeyDown = (e) => {
        if (e.key === 'Enter'){
         changingWidth?setCanvasWidth(e.target.value): setCanvasHeight(e.target.value)
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
            
            <td>Tile Width</td> 
            {changingWidth? <TextField sx={{fontSize:"1.3rem",mt:1,ml:1}} defaultValue={canvasWidth} onBlur={(e) => doneEditingValue(e.target.value) } 
            onKeyDown={handleKeyDown} variant="standard" />:<td onDoubleClick={() => setChangingWidth(true)}>{canvasWidth}</td>}
        </tr>
        <tr class="active-row">
        <td>Tile Height</td>
        {changingHeight? <TextField sx={{fontSize:"1.3rem",mt:1,ml:1}} defaultValue={canvasHeight} onBlur={(e) => doneEditingValue(e.target.value) } 
            onKeyDown={handleKeyDown} variant="standard" />:<td onDoubleClick={() => setChangingHeight(true)}>{canvasHeight}</td>}
            
    
        </tr>
        

        <Divider/>

        
        
    </tbody>
</table>
    
    </>
    
 );
}