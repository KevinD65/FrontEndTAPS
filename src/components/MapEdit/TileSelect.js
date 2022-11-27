import { Box, Grid } from '@mui/material';
import React from 'react'
import ts from './samplets.png'

export default function TileSelect(props) {
    /*
    const sx = props.tileprop.sx;
    const sy = props.tileprop.sy;
    const swidth = props.tileprop.swidth;
    const sheight = props.tileprop.sheight;
    const x = props.tileprop.x;
    const y = props.tileprop.y;
    const tile_width = props.tileprop.width;
    const tile_height = props.tileprop.height;
    //console.log(sx, sy, swidth, sheight, x, y, tile_width, tile_height);
    */
    const tallGrid = {
      width: '100%'
    }
    const canvas = React.createRef();

    const setTile = async () => {
        console.log("SELECT TILE: ", props.tile);
        props.select(props.tile);
    }

    React.useEffect(() => {
        //let c = document.createElement('canvas');
        //let c = React.findDOMNode(`canvas ${sx} ${sy}`);
        let ctx = canvas.current.getContext("2d");
        let img = new Image; 
        //img.setAttribute('crossOrigin', 'anonymous');
        img.src = props.tile.data;
        //img.src = '/sampletspub.png'
        //console.log("data", props.tile.data);
        ctx.drawImage(img, 0, 0);
        
    
        
      });

  return (
    
    <Grid item md={3}>
   <canvas ref={canvas}  height={40} onClick={setTile}    sx={{...tallGrid}}/> 
   </Grid>
  )
}