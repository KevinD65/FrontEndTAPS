import React from "react";

import Grid from '@mui/material/Unstable_Grid2'; // Grid version 2
import { Toolbar,Box } from "@mui/material";
import ToolbarLeft from "./ToolBarLeft"
import ToolbarRight from "./ToolbarRight"
import MapGrid from "./MapGrid";



const MapEditor = () => {
    return (
        <>
        
        <Box sx={{ display: 'flex' }}>
        <Grid container 
        direction='row'
        >
        <Grid item  md={2}>
        <ToolbarLeft ></ToolbarLeft>
        </Grid>
        <Grid item  md={8}>
       <MapGrid/>
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


