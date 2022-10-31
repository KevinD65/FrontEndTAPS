import React from "react";
import { useState } from "react";
import "./mapEdit.css"
import Grass from "../../static/grass.jpeg"

import Grid from '@mui/material/Unstable_Grid2'; // Grid version 2



const Pixel = () => {
   
   const [pixelColor, setPixelColor]= useState("Gray")
   let pixels=[]
   let changeColor=()=>{
    setPixelColor(
        `url(${Grass})`
    )
    console.log("entered")

   }
   

    return(
        <div className="pixel"  onClick={changeColor}  style={{backgroundColor:"#3248a8"  ,  backgroundImage:pixelColor}}></div>
    )
}

export default Pixel