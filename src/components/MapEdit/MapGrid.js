import React from "react";
import Row from "./Row"

import Grid from '@mui/material/Unstable_Grid2'; // Grid version 2
import { Box, tableRowClasses } from "@mui/material";



const MapGrid = ({dataMap, mapWidth, mapHeight,currentTile,tileHeight, tileWidth, selectedTile, layerOrder, updateDataMap}) => {
    
    
    let rows=[]
    
    for (let i=0; i<mapHeight; i++){
        rows.push(<Row mapWidth={mapWidth} key={i}  currentTile={currentTile} tileHeight={tileHeight} tileWidth={tileWidth} />)
    }

    return (
       <Box id="map-grid" sx={{ overflow: 'auto' }}>
        <div id="pixels" > {
            
            dataMap.map((row, index) => {
                return <Row rowData = {row} mapWidth={mapWidth} key={index} row={index}
                currentTile={currentTile} tileHeight={tileHeight} tileWidth={tileWidth} 
                selectedTile={selectedTile} layerOrder={layerOrder} updateDataMap={updateDataMap}/>
            })
        }</div>
       </Box>
    )
}

export default MapGrid


