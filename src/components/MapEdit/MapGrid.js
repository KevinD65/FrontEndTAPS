import React from "react";
import Row from "./Row"

import Grid from '@mui/material/Unstable_Grid2'; // Grid version 2
import { Box, tableRowClasses } from "@mui/material";



const MapGrid = ({mapWidth, mapHeight,currentTile,tileHeight, tileWidth,}) => {
    
    
    let rows=[]
    
    for (let i=0; i<mapHeight; i++){
        rows.push(<Row mapWidth={mapWidth} key={i}  currentTile={currentTile} tileHeight={tileHeight} tileWidth={tileWidth} />)
    }

    return (
       <Box id="map-grid" sx={{ overflow: 'auto' }}>
        <div id="pixels" > {rows}</div>
       </Box>
    )
}

export default MapGrid


