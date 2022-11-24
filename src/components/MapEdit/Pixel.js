import React from "react";
import { useState, useEffect } from "react";
import "./mapEdit.css"
import Grass from "../../static/grass.jpeg"

import Grid from '@mui/material/Unstable_Grid2'; // Grid version 2
import { Box } from "@mui/system";



const Pixel = ({tileData, currentTile,tileHeight, tileWidth, selectedTile, layerOrder, row, column, updateDataMap}) => {
    //console.log("ii", row, column)
   let a=10
   let b =10
   const [pixelColor, setPixelColor]= useState("Gray");
   //const [layers, editLayer] = useState(tileData.layers);
   const layers = tileData.layers;
   if(row == 0 && column == 0){
    console.log("00", layers);
   }
   
   const canvas = React.createRef();

   let pixels=[]
   let changeColor=()=>{
    setPixelColor(
        `url(${currentTile})`
    )

   }
   const drawOnCanvas = () => {
    console.log("At draw on canvas");
    let last_layer = layerOrder[layerOrder.length - 1];
    console.log("last layer", last_layer);
    if(selectedTile.gid != -1){
        let new_arr =  JSON.parse(JSON.stringify(layers))
        console.log("before", new_arr);
        let {gid, data} = selectedTile;
        let index = new_arr.findIndex(x => x.layer_id === last_layer.id);
        if(index == -1){
            new_arr.push({layer_id: last_layer.id, gid: gid, data: data});
        }
        else{
           new_arr[index].gid = gid;
           new_arr[index].data = data;
        }
        console.log("after", new_arr);
        updateDataMap(row, column, new_arr);
        //editLayer(new_arr);
        //doDrawing();
    }
   }

   const doDrawing = () => {
    if(!layers){
        return;
    }
    let ctx = canvas.current.getContext("2d"); 
    ctx.clearRect(0, 0, canvas.current.width, canvas.current.height);
    let count = 0;
    if(row == 0, column == 0){
        //console.log("Layer", layers);
        //console.log("Order", layerOrder);
    }
    
    for(let i = 0; i < layerOrder.length; i++){
        let image_data = layers.find(x => x.layer_id === layerOrder[i].id);
        if(image_data){
            console.log("there is data");
            count = count + 1;
            let img = new Image;
            img.src = image_data.data;
            ctx.drawImage(img, 0, 0);
        }
        else{
        }
        
    }
   }
   useEffect(() => {
        console.log("Use effect going");
      doDrawing();
   });


    return(
        <Box  className="pixel"  sx={{ border: 1}} onClick={drawOnCanvas} backgroundColor={pixelColor} height={tileHeight} width={tileWidth}>
            <canvas ref={canvas} height={tileHeight} width={tileWidth} ></canvas>
        </Box>
    )
}

export default Pixel