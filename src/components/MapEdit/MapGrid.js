import React from "react";
import Row from "./Row"

import Grid from '@mui/material/Unstable_Grid2'; // Grid version 2
import { tableRowClasses } from "@mui/material";



const MapGrid = ({mapWidth, mapHeight}) => {
    
    
    let rows=[]
    
    for (let i=0; i<mapHeight; i++){
        rows.push(<Row mapWidth={mapWidth} key={i} />)
    }

    return (
       <div id="map-grid">
        <div id="pixels" > {rows}</div>
       </div>
    )
}

export default MapGrid


