import React from "react";

import Grid from '@mui/material/Unstable_Grid2'; // Grid version 2
import { Toolbar,Box } from "@mui/material";
import ToolbarLeft from "./ToolBarLeft"
import ToolbarRight from "./ToolbarRight"
import MapGrid from "./MapGrid";
import { useState } from "react";


const MapEditor = () => {
    const [mapWidth, setMapWidth]=useState(32)
    const [mapHeight, setMapHeight]=useState(32)
    return (
        <>
        
        <Box sx={{ display: 'flex' }}>
        <Grid container 
        direction='row'
        >
        <Grid item  md={2}>
        <ToolbarLeft  mapHeight={mapHeight} mapWidth={mapWidth} setMapHeight={setMapHeight} setMapWidth={setMapWidth} ></ToolbarLeft>
        </Grid>
        <Grid item  md={8} >
       <MapGrid mapHeight={mapHeight} mapWidth={mapWidth} setMapHeight={setMapHeight} setMapWidth={setMapWidth}    />
        </Grid>

        <Grid item  md={2}>
        <ToolbarRight></ToolbarRight>
        </Grid>
        </Grid>
        </Box>
        </>
    )
}

export default MapEditor


