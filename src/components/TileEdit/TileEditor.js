import React from "react";

import Grid from '@mui/material/Unstable_Grid2'; // Grid version 2
import { Toolbar,Box } from "@mui/material";
import { useState } from 'react';
import ToolbarLeft from "./ToolBarLeft"
import ToolbarRight from "./ToolbarRight"
import CanvasDraw from "react-canvas-draw";


const TileEditor = () => {
    const [brushColor, changeColor] = useState('#932525');
    const updateBrushColor = (color) =>{
        changeColor(color.hex);
    }
    return (
        <>
        <Box sx={{ display: 'flex' }}>
            <Grid container 
            direction='row'
            >
                <Grid item  md={2}>
                <ToolbarLeft updateBrushColorCallback={updateBrushColor}/>
            </Grid>
            
            <Grid item  md={8}>
                
                <CanvasDraw canvasWidth={1000} canvasHeight={800} brushColor={brushColor}/>
                
            </Grid>
        <Grid item  md={2}>
            <ToolbarRight/>
        </Grid>
        </Grid>
        </Box>
        </>
    )
}

export default TileEditor



