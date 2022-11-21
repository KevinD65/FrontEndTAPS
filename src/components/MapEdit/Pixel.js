import React from "react";
import { useState, useEffect } from "react";
import "./mapEdit.css"
import Grass from "../../static/grass.jpeg"
import Grid from '@mui/material/Unstable_Grid2'; // Grid version 2
import { Box } from "@mui/system";



const Pixel = ({ key, currentTile,tileHeight, tileWidth, selectedTile, layerOrder, transactionStack, editDataMap}) => {
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
    if(selectedTile.gid != -1){
        editLayer(old_array => {
            old_array[last_layer] = selectedTile;
            return old_array;
        });
        doDrawing();
        //console.log("HOW MANY TIMES IS THIS EXECUTING?");

        //handlePixelEdit(updatedPixelState, previousPixelState, drawOnCanvas/*,erase from canvas */);
    }
   }

   /**
    * This function creates a MapPixel Edit Transaction which invokes the drawOnCanvas() function
    */
   const handlePixelEdit = async() => {  
    let previousPixelState = {
        rowCol: key,
        layers: layers
    }

    drawOnCanvas();

    let updatedPixelState = {
        rowCol: key,
        layers: layers
    }

    console.log(key);

    editDataMap(previousPixelState, updatedPixelState);
   }

   const doDrawing = () => {
    let ctx = canvas.current.getContext("2d"); 
    for(let i = 0; i < layerOrder.length; i++){
        if(layers[layerOrder[i]]){
            let img = new Image;
            img.src = layers[layerOrder[i]].data;
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
        <Box  className="pixel"  sx={{ border: 1}} onClick={handlePixelEdit/*drawOnCanvas*/} backgroundColor={pixelColor} height={tileHeight} width={tileWidth}>
            <canvas ref={canvas} height={tileHeight} width={tileWidth} ></canvas>
        </Box>
    )
}

export default Pixel