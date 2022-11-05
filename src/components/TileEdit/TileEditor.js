import React from "react";

import Grid from '@mui/material/Unstable_Grid2'; // Grid version 2
import { Toolbar,Box } from "@mui/material";
import { useState } from 'react';
import ToolbarLeft from "./ToolBarLeft"
import ToolbarRight from "./ToolbarRight"
import CanvasDraw from "./index";


const TileEditor = () => {
    const [brushColor, changeColor] = useState('#932525');
    const [brushSize, changeBrushSize] = useState(12);
    const [erase, toggleErase] = useState(false);
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
                <ToolbarLeft updateBrushColorCallback={updateBrushColor} 
                eraseOnCallback={() => toggleErase(true)} 
                eraseOffCallback={() => toggleErase(false)}/>
            </Grid>
            
            <Grid item  md={8}>
                
                <CanvasDraw canvasWidth={1000} canvasHeight={800} brushRadius={brushSize} 
                brushColor={brushColor} erase={erase}/>
                
            </Grid>
        <Grid item  md={2}>
            <ToolbarRight changeBrushSizeCallback={(size) => changeBrushSize(size)} defaultBrush={brushSize}
            setErase={(arg) => {toggleErase(arg)}} erase={erase}/>
        </Grid>
        </Grid>
        </Box>
        </>
    )
}

export default TileEditor



