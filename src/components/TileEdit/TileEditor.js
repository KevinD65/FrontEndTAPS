import React from "react";

import Grid from '@mui/material/Unstable_Grid2'; // Grid version 2
import { Toolbar,Box } from "@mui/material";
import { useState } from 'react';
import ToolbarLeft from "./ToolBarLeft"
import ToolbarRight from "./ToolbarRight"
import CanvasDraw from "./index";
import { useRef } from "react";
import Canvas from "./Canvas";
import JSONSaveModal from "./JSONSaveModal";


const TileEditor = () => {
    const[tileList, setTileList]=useState([])
    const canvasRef = useRef(null);
    const[base64,setBase64]=useState("")
    const [drawing, setDrawing] = useState();
    const [brushColor, changeColor] = useState('#4E6C50');
    const [brushSize, changeBrushSize] = useState(5);
    const [erase, toggleErase] = useState(false);

    const[canvasWidth, setCanvasWidth]=useState(600)
    const[canvasHeight, setCanvasHeight]=useState(600)
    const [saveJSON, toggleJSON] =useState(false);


    const updateBrushColor = (color) =>{
        changeColor(color.hex);
    }

    const handleExport = () => {
        
        setDrawing(canvasRef.current.canvasContainer.childNodes[1].toDataURL())
     
        

      };
    return (
        <>
        <Box sx={{ display: 'flex' }}>
            <Grid container 
            direction='row'
            >
                <Grid item  md={2}>
                <ToolbarLeft updateBrushColorCallback={updateBrushColor} 
                eraseOnCallback={() => toggleErase(true)} 
                eraseOffCallback={() => toggleErase(false)}
                canvasWidth={canvasWidth} setCanvasWidth={setCanvasWidth} canvasHeight={canvasHeight} setCanvasHeight={setCanvasHeight}
                turnOnJSONMod={() => toggleJSON(true)}/>
            </Grid>
            
            <Grid item  md={8} sx={{p:10}} >
     
                
                <Canvas  
                brushColor={brushColor} tileList={tileList} setTileList={setTileList} canvasWidth={canvasWidth} setCanvasWidth={setCanvasWidth} canvasHeight={canvasHeight} setCanvasHeight={setCanvasHeight} 
                brushRadius={brushSize} erase={erase}/>
                
            </Grid>
        <Grid item  md={2}>
            <ToolbarRight changeBrushSizeCallback={(size) => changeBrushSize(size)} defaultBrush={brushSize}
            setErase={(arg) => {toggleErase(arg)}} erase={erase} tileList={tileList} setTileList={setTileList}/>
        </Grid>
        </Grid>
        </Box>
        <JSONSaveModal open={saveJSON} onClose={() => toggleJSON(false)} tileList={tileList} />
        </>
    )
}

export default TileEditor



