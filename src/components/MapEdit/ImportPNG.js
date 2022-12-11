import React from 'react';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import { Box, ToggleButtonGroup, TextField, Table,TableRow, TableBody, TableCell,TableContainer,TableHead,Checkbox, Typography, List, ListItem, ListItemText, ToggleButton} from "@mui/material";
import {uploadImageToCloudinaryAPIMethod} from "../../client"
import { loadTSMapEditor } from '../helpful_functions/helpful_function_ME';

export default function PNGModal(props) {
    const [name, changeName] = React.useState("New Tileset");
    const [tileWidth, changeWidth] = React.useState(50);
    const [tileHeight, changeHeight] = React.useState(50);
    const [tileCount, changeCount] = React.useState(3);
    const [filein, toggleInput] = React.useState(false);
    const imgRef = React.createRef();

    const handleKeyDown = (e, field) => {
        if (e.key === 'Enter'){
          if(field === "name"){
            changeName(e.target.value);
          }
          else if(field === 'width'){
            changeWidth(e.target.value)
          }
          else if(field === 'height'){
            changeHeight(e.target.value)
          }
          else if(field === 'count'){
            changeCount(e.target.value)
          }
        }
      }

      /**
   * Creates a file reader object so users can import local tileset files
   */
  const handleImportJSON=(event)=> {
    let reader = new FileReader();
    reader.onload = onReaderLoad;
    reader.readAsDataURL(event.target.files[0]);
    console.log("INSIDE HANDLEIMPORT");
  }

  function loadImage(url) {
    return new Promise((fulfill, reject) => {
      let imageObj = new Image();
      imageObj.onload = () => fulfill(imageObj);
      imageObj.setAttribute('crossOrigin', 'anonymous');
      imageObj.src = url;
    });
  }

  /**
   * If valid tileset file, loads the tileset into a GIDTable and then updates the tileList so that the tileset can be rendered on the right toolbar
   */
  async function onReaderLoad (event) {
    let img = await loadImage(event.target.result);
    
    let new_tiles = await loadTSMapEditor(img.naturalWidth, img.naturalHeight, tileWidth, tileHeight, img.src, name, 1, tileCount);
    console.log("PNGGGGGGGGGGGG TILES", new_tiles);
    let export_ts = {
      firstgid: -1,
      image: event.target.result,
      imageheight: img.naturalHeight,
      imagewidth: img.naturalWidth,
      margin: 0,
      name: name,
      spacing: 0,
      tilecount: tileCount,
      tileheight: tileHeight,
      tilewidth: tileWidth
    };
    props.importTileset({TSName: name, tiles: new_tiles, tileHeight: tileHeight, tileWidth: tileWidth, numTiles: tileCount, export_ts: export_ts}, null);
    toggleInput(false);
  }
    
  // {
  //   "firstgid":1,
  //   "image":"..\/tilesets\/ts_example.png",
  //   "imageheight":150,
  //   "imagewidth":300,
  //   "margin":0,
  //   "name":"test",
  //   "spacing":0,
  //   "tilecount":18,
  //   "tileheight":50,
  //   "tilewidth":50
  //  }
    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
      };
  return (
    <Modal
  open={props.open}
  onClose={props.onClose}
  aria-labelledby="modal-modal-title"
  aria-describedby="modal-modal-description"
>
  <Box sx={style}>
    <Typography sx={{background:"#4E6C50", pr:2, pl:2, pt:1 ,pb:1, borderRadius:0, color:"white",align:"center"}}>Import Tileset as PNG</Typography>
        <List>
            <ListItem>
                <TextField label="Name" variant="outlined" defaultValue={name} 
                onKeyDown={handleKeyDown("name")} onChange={e => changeName(e.target.value)}/>
            </ListItem>
            <ListItem>
            <TextField label="Tile Width" variant="outlined" defaultValue={tileWidth} 
                onKeyDown={handleKeyDown("width")} onChange={e => changeWidth(e.target.value)}/>
            </ListItem>
            <ListItem>
            <TextField label="Tile Height" variant="outlined" defaultValue={tileHeight} 
                onKeyDown={handleKeyDown("height")} onChange={e => changeHeight(e.target.value)}/>
            </ListItem>
            <ListItem>
            <TextField label="Tile Count" variant="outlined" defaultValue={tileCount} 
                onKeyDown={handleKeyDown("count")} onChange={e => changeCount(e.target.value)}/>
            </ListItem>
        </List>
        
        <label htmlFor="contained-button-file">
          {filein && <input onChange={handleImportJSON} style={{ display: "none" }} id="contained-button-file" type="file"/>}
          <Button variant="contained"  component="span"  sx={{marginTop:3, marginBottom:2, pr:4, pl:4, backgroundColor:"#4E6C50" }}  onClick={() => {toggleInput(true)}}>
          <Typography variant="h6" component="h2">Import</Typography>
          </Button>
        </label>
        <img ref={imgRef}></img>
  </Box>
</Modal>
  )
}
