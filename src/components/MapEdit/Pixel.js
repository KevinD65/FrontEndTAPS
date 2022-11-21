import React from "react";
import { useState, useEffect } from "react";
import "./mapEdit.css"
import Grass from "../../static/grass.jpeg"
import Grid from '@mui/material/Unstable_Grid2'; // Grid version 2
import { Box } from "@mui/system";

const Pixel = ({tile, currentTile,tileHeight, tileWidth, selectedTile, layerOrder, row, column, transactionStack, editDataMap}) => {
    //console.log("ii", row, column)
    //console.log("PIXEL TD: ", tile);
   let a=10
   let b =10
   const [pixelColor, setPixelColor]= useState("Gray");
   const [layers, editLayer] = useState(tile.layers);
   const canvas = React.createRef();

   let pixels=[]
   let changeColor=()=>{
    setPixelColor(
        `url(${currentTile})`
    )

   }
   const drawOnCanvas = () => {
    let last_layer = layerOrder[layerOrder.length - 1];
    let new_arr = [... layers];
    let previousPixelState = {
        row: row,
        col: column,
        layers: new_arr
    }
    
    if(selectedTile.gid > 0){
        new_arr[last_layer] = selectedTile;
        //doDrawing();
    }
    else if(selectedTile.gid == 0){
        delete new_arr[last_layer];
    }
    else{
        return;
    }
    let updatedPixelState = {
        row: row,
        col: column,
        layers: new_arr
    }
    editDataMap(previousPixelState, updatedPixelState);
    editLayer(new_arr);
    }

    const handlePixelEdit = async() => {

        //save previous map state
        let previousPixelState = {
            row: row,
            col: column,
            layers: layers
        }

        //render the updated pixel state
        //drawOnCanvas();

        //save the updated map state
        let updatedPixelState = {
            row: row,
            col: column,
            layers: layers
        }

        //create map edit transaction
        editDataMap(previousPixelState, updatedPixelState);
    }

   const doDrawing = async() => {
    let ctx = canvas.current.getContext("2d"); 
    ctx.clearRect(0, 0, canvas.current.width, canvas.current.height);
    for(let i = 0; i < layerOrder.length; i++){
        if(layers[layerOrder[i]]){
            console.log("DRAWING: ", row, column, layers[layerOrder[i]]);
            //console.log("FROM DODRAWING: ", tile); //why is tile empty
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
   }, [layers]);


    return(
        <Box  className="pixel"  sx={{ border: 1}} onClick={drawOnCanvas} backgroundColor={pixelColor} height={tileHeight} width={tileWidth}>
            <canvas ref={canvas} height={tileHeight} width={tileWidth} ></canvas>
        </Box>
    )
}

export default Pixel