import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';

import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import { Button,} from '@mui/material';
import MapOutlinedIcon from '@mui/icons-material/MapOutlined';
import GridViewOutlinedIcon from '@mui/icons-material/GridViewOutlined';
import FolderSharedOutlinedIcon from '@mui/icons-material/FolderSharedOutlined';
import Map from "../User/Map"
import Tileset from "../User/Tileset"
import { useState, useEffect } from 'react';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import LayersEdit  from "./LayersEdit"
import TilesetMap from "./TilesetMap";
import Avatar from './Collaborators';
import {Grid} from '@mui/material';

import { loadTSMapEditor } from '../helpful_functions/helpful_function_ME';

const drawerWidth = 240;
const Sidemenu = (props) => {
  const [anchor,setAnchor]=useState(null)
  const openPopover=(e)=>{
    setAnchor(e.currentTarget)
  }
  const [currentTilesets, editCurrentTilesets] = useState([]);

  /**
   * Creates a file reader object so users can import local tileset files
   */
  const handleImportJSON=(event)=> {
    let reader = new FileReader();
    reader.onload = onReaderLoad;
    reader.readAsText(event.target.files[0]);
    console.log("INSIDE HANDLEIMPORT");
  }

  /**
   * If valid tileset file, loads the tileset into a GIDTable and then updates the tileList so that the tileset can be rendered on the right toolbar
   */
  async function onReaderLoad (event) {
    console.log("INSIDE OF onReaderLoad() ToolbarRight.js");
    let obj = JSON.parse(event.target.result);
    let new_tiles = await loadTSMapEditor(obj.imagewidth, obj.imageheight, obj.tilewidth, obj.tileheight, obj.image, obj.name);
    console.log("NEWWWWWWWWWW TILES", new_tiles);
    props.importTileset({TSName: obj.name, tiles: new_tiles, tileHeight: obj.tileheight, tileWidth: obj.tilewidth, numTiles: obj.tilecount}, null);
  }

    return (
  <Drawer


  PaperProps={{
    sx: {
      backgroundColor: "#F8EDE3"
    }
  }}
    anchor={'right'}
    variant="permanent"
    sx={{
      width: drawerWidth,
      flexShrink: 0,
      [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box' },
    }}
      >
        
    <Toolbar />
    <Box sx={{ overflow: 'auto' }}>
      <List>
          <Box textAlign='center'>
            
              <Avatar currentUser={props.currentUser} addCollaborator={props.addCollaborator} map={props.map} collaborators={props.collaborators}/>
    </Box>
    
         {/* List of sidebar components */}
         <LayersEdit setErase={props.setErase} layerOrder={props.layerOrder} setOrderCallback={props.setOrderCallback}/>
        <Divider />
        <Box sx={{display:"flex", justifyContent:"space-between" ,color:"white" ,backgroundColor:"#4E6C50"}}>
        <Typography sx={{color:"white" ,backgroundColor:"#4E6C50" ,fontWeight:700, pl:2 ,pt:1,pb:1}}>Tilesets
        
        
        </Typography>
        <label htmlFor="contained-button-file" sx={{color:"white" ,backgroundColor:"#4E6C50"}}>
          <Button  component="span"  onClick={() => {props.togglePNG(true)}}  >
          <Typography variant="h6" component="h2" sx={{color:"white"}}>+</Typography>
          </Button>
        </label>
        </Box>
        <Grid  container 
            direction='row'
            sx={{ border: 1 }}
            >
          
        {/* <input onChange={handleImportJSON} style={{ display: "none" }} id="contained-button-file" type="file"/> */}
        {/* <label htmlFor="contained-button-file">
          <Button variant="contained"  component="span"  sx={{marginTop:3, marginBottom:2, pr:4, pl:4, backgroundColor:"#4E6C50" }}  onClick={() => {props.togglePNG(true)}}>
          <Typography variant="h6" component="h2">Import</Typography>
          </Button>
        </label> */}
        <TilesetMap changeSelect = {props.changeSelect} tiles={props.tiles} importedTileList = {props.importedTileList}/>
        </Grid>
    </List>
    
    
    
  </Box>
      </Drawer>
            
            
            
        
    )
}

export default Sidemenu


