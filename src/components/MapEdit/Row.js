


import React from "react";
import Pixel from "./Pixel";


import Grid from '@mui/material/Unstable_Grid2'; // Grid version 2



const Row = ({ rowData, mapWidth, row, key, currentTile,tileHeight, tileWidth, selectedTile, layerOrder}) => {
   
   let pixels=[]
    for (let i=0; i<mapWidth; i++){
        pixels.push(<Pixel key={i}  currentTile={currentTile} tileHeight={tileHeight} tileWidth={tileWidth}></Pixel>)
    }

    return(
        <div className="row">{
            rowData.map((tile, index) =>{
                //console.log("id", key, index);
                return <Pixel key={key + ' ' + index}  tileData = {tile} currentTile={currentTile} row={row} column={index} 
                tileHeight={tileHeight} tileWidth={tileWidth} selectedTile={selectedTile}
                layerOrder={layerOrder}></Pixel>
            })
        }</div>
    )
}

export default Row


