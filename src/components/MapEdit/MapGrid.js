import React from "react";
import Row from "./Row"

import Grid from '@mui/material/Unstable_Grid2'; // Grid version 2
import { tableRowClasses } from "@mui/material";



const MapGrid = () => {
    const height=30;
    
    let rows=[]
    
    for (let i=0; i<height; i++){
        rows.push(<Row key={i} />)
    }

    return (
       <div id="map-grid">
        <div id="pixels" > {rows}</div>
       </div>
    )
}

export default MapGrid


