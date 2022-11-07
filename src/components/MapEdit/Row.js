


import React from "react";
import Pixel from "./Pixel";


import Grid from '@mui/material/Unstable_Grid2'; // Grid version 2



const Row = ({ mapWidth}) => {
   
   
   
   let pixels=[]
    for (let i=0; i<mapWidth; i++){
        pixels.push(<Pixel key={i}></Pixel>)
    }

    return(
        <div className="row">{pixels}</div>
    )
}

export default Row


