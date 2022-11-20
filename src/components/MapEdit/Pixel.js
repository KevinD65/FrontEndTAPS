import React from "react";
import { useState } from "react";
import "./mapEdit.css"
import Grass from "../../static/grass.jpeg"

import Grid from '@mui/material/Unstable_Grid2'; // Grid version 2
import { Box } from "@mui/system";



const Pixel = ({ currentTile,tileHeight, tileWidth,}) => {
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
        <Box  className="pixel"  onClick={changeColor}  style={{backgroundColor:"#4E6C50"  ,  backgroundImage:pixelColor,}} height={tileHeight} width={tileWidth}></Box>
    )
}

export default Pixel