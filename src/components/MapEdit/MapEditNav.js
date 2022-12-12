import React, { useState } from "react";
import { Table,TableRow, TableBody, TableCell,TableContainer,TableHead, Checkbox, Typography, Divider,TextField} from "@mui/material";

import "./mapEdit.css"
function createData(number, item, qty, price) {
 return { number, item, qty, price };
}
  
export default function MapEditNav({mapWidth, mapHeight, setMapHeight,setMapWidth,tileHeight, tileWidth, setTileHeight, setTileWidth}) {
    const [changingWidth,setChangingWidth]= useState(false)
   
    const [changingHeight,setChangingHeight]= useState(false)

    const [changingTileWidth,setChangingTileWidth]= useState(false)
   
    const [changingTileHeight,setChangingTileHeight]= useState(false)
    
    // const [mapHeight,setMapHeight]= useState(32)


    const doneEditingTileValue=(e)=>{
        changingTileWidth?setTileWidth(e): setTileHeight(e)
        
        
        changingTileWidth? setChangingTileWidth(false): setChangingTileHeight(false)
    }


    const doneEditingValue=(e)=>{

        changingWidth?setMapWidth(e): setMapHeight(e)
        
        
        changingWidth? setChangingWidth(false): setChangingHeight(false)
    }

    const handleTileKeyDown = (e) => {
        if (e.key === 'Enter'){
         changingTileWidth?setTileWidth(e.target.value+"px"): setTileHeight(e.target.value+"px")
         console.log(e.target.value)
        }
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
        <tr >
        <td>Map Height</td>
        {changingHeight? <TextField sx={{fontSize:"1.3rem",mt:1,ml:1}} defaultValue={mapHeight} onBlur={(e) => doneEditingValue(e.target.value) } 
            onKeyDown={handleKeyDown} variant="standard" />:<td onDoubleClick={() => setChangingHeight(true)}>{mapHeight}</td>}
            
    
        </tr>
        <tr>
            <td>Tile Width</td>
            {changingTileWidth? <TextField sx={{fontSize:"1.3rem",mt:1,ml:1}} defaultValue={tileWidth} onBlur={(e) => doneEditingTileValue(e.target.value) } 
            onKeyDown={handleTileKeyDown} variant="standard" />:<td onDoubleClick={() => setChangingTileWidth(true)}>{tileWidth}</td>}
            
        </tr>
        <tr >
            
            <td>Tile Height</td>
            {changingTileHeight? <TextField sx={{fontSize:"1.3rem",mt:1,ml:1}} defaultValue={tileHeight} onBlur={(e) => doneEditingTileValue(e.target.value) } 
            onKeyDown={handleTileKeyDown} variant="standard" />:<td onDoubleClick={() => setChangingTileHeight(true)}>{tileHeight}</td>}
            
        </tr>

        <Divider/>
        
    </tbody>
</table>
    
    </>
    
 );
}