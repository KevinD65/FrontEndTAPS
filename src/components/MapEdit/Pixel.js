import React from "react";
import { useState, useEffect } from "react";
import "./mapEdit.css"
import Grass from "../../static/grass.jpeg"

import Grid from '@mui/material/Unstable_Grid2'; // Grid version 2
import { Box } from "@mui/system";



const Pixel = ({tileData, currentTile,tileHeight, tileWidth, selectedTile, layerOrder, row, column}) => {
    console.log("ii", row, column)
   let a=10
   let b =10
   const [pixelColor, setPixelColor]= useState("Gray");
   const [layers, editLayer] = useState([]);
   const canvas = React.createRef();

   let pixels=[]
   let changeColor=()=>{
    setPixelColor(
        `url(${currentTile})`
    )

   }
   const drawOnCanvas = () => {
    let last_layer = layerOrder[layerOrder.length - 1];
    console.log("last layer", last_layer);
    if(selectedTile.gid != -1){
        const new_arr = [... layers];
        new_arr[last_layer.id] = selectedTile;
        editLayer(new_arr);
        //doDrawing();
    }
   }

   const doDrawing = () => {
    let ctx = canvas.current.getContext("2d"); 
    ctx.clearRect(0, 0, canvas.current.width, canvas.current.height);
    let count = 0;
    if(row == 0, column == 0){
        console.log("Layer", layers);
        console.log("Order", layerOrder);
    }
    
    for(let i = 0; i < layerOrder.length; i++){
        if(layers[layerOrder[i].id]){
            count = count + 1;
            let img = new Image;
            img.src = layers[layerOrder[i].id].data;
            ctx.drawImage(img, 0, 0);
        }
        else{
        }
        
    }
   }
   useEffect(() => {
    doDrawing();
   });


    return(
        <Box  className="pixel"  sx={{ border: 1}} onClick={drawOnCanvas} backgroundColor={pixelColor} height={tileHeight} width={tileWidth}>
            <canvas ref={canvas} height={tileHeight} width={tileWidth} ></canvas>
        </Box>
    )
}

export default Pixel