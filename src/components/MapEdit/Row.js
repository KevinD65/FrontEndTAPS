


import React from "react";
import Pixel from "./Pixel";


import Grid from '@mui/material/Unstable_Grid2'; // Grid version 2



const Row = () => {
   const  width=42;
   
   const selectedColor= "#000000"
   let pixels=[]
    for (let i=0; i<width; i++){
        pixels.push(<Pixel key={i}></Pixel>)
    }

    return(
        <div className="row">{pixels}</div>
    )
}

export default Row


