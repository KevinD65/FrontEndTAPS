import React from "react";
import { useState } from "react";
import "./mapEdit.css"
import Grass from "../../static/grass.jpeg"

import Grid from '@mui/material/Unstable_Grid2'; // Grid version 2
import { Box } from "@mui/system";



const Pixel = ({ currentTile,tileHeight, tileWidth, selectedTile}) => {
   let a=10
   let b =10
   const [pixelColor, setPixelColor]= useState("Gray")
   let pixels=[]
   let changeColor=()=>{
    setPixelColor(
        `url(${currentTile})`
    )
    console.log("entered")

   }
   

    return(
        <Box  className="pixel"  sx={{ border: 1}} onClick={changeColor} height={tileHeight} width={tileWidth}>
            <canvas height={tileHeight} width={tileWidth} ></canvas>
        </Box>
    )
}

export default Pixel