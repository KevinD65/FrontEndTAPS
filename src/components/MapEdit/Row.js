


import React from "react";
import Pixel from "./Pixel";


import Grid from '@mui/material/Unstable_Grid2'; // Grid version 2
import { Box } from "@mui/material";



const Row = ({ rowData, mapWidth, row, key, currentTile,tileHeight, tileWidth, selectedTile, layerOrder, updateDataMap}) => {
   
   let pixels=[]
    for (let i=0; i<mapWidth; i++){
        pixels.push(<Pixel key={i}  currentTile={currentTile} tileHeight={tileHeight} tileWidth={tileWidth}></Pixel>)
    }

    return(

        <div className="row">{
            rowData.map((tile, index) =>{
                //console.log("id", key, index);
                return <Pixel key={row + ' ' + index}  tileData = {tile} currentTile={currentTile} row={row} column={index} 
                tileHeight={tileHeight} tileWidth={tileWidth} selectedTile={selectedTile} updateDataMap={updateDataMap}
                layerOrder={layerOrder}></Pixel>
            })
            
        }
       
        </div>
    )
}

export default Row


