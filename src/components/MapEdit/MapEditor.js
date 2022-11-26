import React from "react";

import Grid from '@mui/material/Unstable_Grid2'; // Grid version 2
import { Toolbar,Box, Button } from "@mui/material";
import ToolbarLeft from "./ToolBarLeft"
import ToolbarRight from "./ToolbarRight"
import MapGrid from "./MapGrid";
import MapCanvas from "./MapCanvas";
import { useState, useRef, useEffect } from "react";
import { v4 as uuidv4 } from 'uuid';
//import TS from "/sampletspub.png"


const MapEditor = () => {
    const [mapWidth, setMapWidth]=useState(5)
    const [mapHeight, setMapHeight]=useState(5)
    const[currentTile,setCurrentTile]=useState("")
    const [tileWidth, setTileWidth]=useState(40)
    const [tileHeight, setTileHeight]=useState(40)
    const [GIDTable, setTable] = useState([]);
    const canvasRef=useRef(null);
    const contextRef=useRef(null);
    const [isDrawing, setIsDrawing]= useState(false);
  const [clearCanvas, setClearCanvas]=useState(false);

    const createDataMap = () => {
        let datamap = [];
        for(let i = 0; i < mapHeight; i++){
            let row = []
            for(let j = 0; j < mapWidth; j++){
                let grid_obj = {layers: []};
                row.push(grid_obj);
            }
            datamap.push(row);
        }
        return datamap;
    }

    const [dataMap, editMap] = useState(() => createDataMap());
    const [selectedTile, changeSelect] = useState({gid: -1, dataURL: ""});
    const [layerOrder, editOrder] = useState([{id: uuidv4(), name: "Layer 1"}]);

    const setOrder = (new_arr) => {
        editOrder(new_arr);
    }

    const updateDataMap = (row, col, data) => {
        let new_arr = [...dataMap];
        //console.log("new_ arr", new_arr, layers);
        //let layers = new_arr[row][col].layers;
        //console.log("after", new_arr);
        editMap(new_arr);
    }
    
    const setErase = (newState) => {
        if(newState){
            console.log("Changing to empty");
            changeSelect({gid: 0, dataURL: ""});
        }
        else{
            changeSelect({gid: -1, dataURL: ""});
        }
    } 

    const grid_generator = (width, height, tile_width, tile_height) => {
        let rows = [];
        for(let i = 0; i + tile_height < height; i = i + tile_height){
          let new_row = [];
          for(let j = 0; j + tile_width < width; j = j + tile_width){
            let canvas_prop = {sx: j, sy: i, swidth: tile_width, sheight: tile_height, x: 0, y: 0, width: tile_width, height: tile_height};
            new_row.push(canvas_prop); 
          }
          rows.push(new_row);
        }
        return rows;
      }

    const createGIDTableElement = (grid_prop, img) => {
        let c = document.createElement('canvas');
        let ctx = c.getContext("2d");
        ctx.drawImage(img, grid_prop.sx, grid_prop.sy, 
            grid_prop.swidth, grid_prop.sheight, grid_prop.x, grid_prop.y, grid_prop.width, grid_prop.height);
        let dataURL =  c.toDataURL();
        return dataURL;
    }

    const loadTS = (start, img) => {
        let grid_props = grid_generator(550, 200, 40, 40); //todo: hardcoded, make dynamic
        let GIDTable = [];
        let gid = start;
        for(let grid_row = 0; grid_row < grid_props.length; grid_row = grid_row + 1){
            for(let grid_col = 0; grid_col < grid_props[grid_row].length; grid_col = grid_col + 1){
                GIDTable.push(
                    {gid: gid, data: createGIDTableElement(grid_props[grid_row][grid_col], img)}
                );
                gid = gid + 1;
            }
        }
        console.log("table", GIDTable);
        return GIDTable;
    }

    //let GIDTable = loadTS(1);

    React.useEffect(() => {
        function loadImage(url) {
            return new Promise((fulfill, reject) => {
              let imageObj = new Image();
              imageObj.onload = () => fulfill(imageObj);
              imageObj.setAttribute('crossOrigin', 'anonymous');
              imageObj.src = url;
            });
          }

        async function getTable() {
            let table = await 
            loadImage('https://res.cloudinary.com/dle4whfjo/image/upload/v1668890339/VIP_SBU_MAPS_Tileset_2_zuvpi1.png')
                .then((image) => loadTS(1, image));
            setTable((oldarray => [... table]));
        }
        //console.log("before");
        getTable();
        

    }, [GIDTable.length == 0])

    React.useEffect(() => {
        console.log("DataMap", dataMap)
    })

    const drawBoxes = () => {
        for(let i = tileWidth; i < (mapWidth * tileWidth); i += tileWidth){
            contextRef.current.moveTo(i, 0);
            contextRef.current.lineTo(i, (mapHeight * tileHeight))
        }

        for(let i = tileHeight; i < (mapHeight * tileHeight); i += tileHeight){
            contextRef.current.moveTo(0, i);
            contextRef.current.lineTo((mapWidth * tileWidth), i)
        }

        contextRef.current.strokeStyle = "black";
        contextRef.current.stroke();
    }

    useEffect(()=>{
         const canvas=canvasRef.current;
         canvas.width= mapWidth * tileWidth;
         canvas.height= mapHeight * tileHeight;
         const context= canvas.getContext("2d")
         context.lineCap="round"
         context.strokeStyle="Red"
         context.lineWidth=2;
         contextRef.current=context;
         canvasRef.current=canvas;
         contextRef.current.fillStyle = "white";
         contextRef.current.fillRect(0, 0, canvas.width, canvas.height)
         drawBoxes();

         },[mapWidth, mapHeight,clearCanvas]);

    const drawBox = (layers, x, y) => {
        contextRef.current.clearRect(x * tileWidth,  y * tileHeight, tileWidth, tileHeight);
        for(let i = 0; i < layerOrder.length; i++){
            let image_data = layers.find(x => x.layer_id === layerOrder[i].id);
            if(image_data){
                let img = new Image;
                img.src = image_data.data;
                contextRef.current.drawImage(img, x * tileWidth, y * tileHeight);
            }
            else{
            }
            
        }
    }

    const placeTile =({nativeEvent}) => {
        const{offsetX, offsetY}=nativeEvent;
        console.log("Clicked", offsetX, offsetY);
        let x =  Math.floor(offsetX / tileWidth);
        let y = Math.floor(offsetY / tileHeight);

        let new_arr = [...dataMap];
        let layers = new_arr[x][y].layers;
        let last_layer = layerOrder[layerOrder.length - 1];
        let new_layers =  JSON.parse(JSON.stringify(layers));
        console.log("Before", layers)
        if(selectedTile.gid > 0){
            let {gid, data} = selectedTile;
            let index = new_layers.findIndex(x => x.layer_id === last_layer.id);
            if(index == -1){
                new_layers.push({layer_id: last_layer.id, gid: gid, data: data});
            }
            else{
               new_layers[index].gid = gid;
               new_layers[index].data = data;
            }
        }
        else if(selectedTile.gid === 0){
            let index = new_layers.findIndex(x => x.layer_id === last_layer.id);
            if(index != -1){
               new_layers.splice(index, 1);
            }
        }
        new_arr[x][y].layers = new_layers;
        drawBox(new_layers, x, y);
        
    }
    
    return (
        <>
        <Box sx={{ display: 'flex' }}>
        <Grid container 
        direction='row'
        >
        <Grid item  md={2}>
        <ToolbarLeft  mapHeight={mapHeight} mapWidth={mapWidth} setMapHeight={setMapHeight} setMapWidth={setMapWidth} tileHeight={tileHeight} tileWidth={tileWidth} setTileHeight={setTileHeight} setTileWidth={setTileWidth}  ></ToolbarLeft>
        </Grid>
        <Grid item  md={8} sx={{pt:4, pl:15}}>
            <Box>
            <Button variant="contained" sx={{marginRight:3, marginBottom:2, pr:4, pl:4, backgroundColor:"#4E6C50" }} onClick={()=>{setClearCanvas(!clearCanvas)}}>Clear Canvas</Button>
            </Box>
            <Box>
                <canvas className='canvas-main'
                ref={canvasRef}
                onMouseDown={placeTile}
                ></canvas>
            </Box>
        </Grid>
        <Grid item  md={2}>

        <ToolbarRight tiles = {GIDTable} select ={(tile) => {
            changeSelect(prev => (tile));
        }} setErase={setErase} layerOrder={layerOrder} setOrderCallback={setOrder}></ToolbarRight>

        </Grid>
        </Grid>
        </Box>
        </>
    )
}

export default MapEditor


