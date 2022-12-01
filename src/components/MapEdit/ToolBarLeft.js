import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import MapOutlinedIcon from '@mui/icons-material/MapOutlined';
import { Undo, Redo } from '@mui/icons-material';
import { useState } from 'react';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MapEditNav from './MapEditNav';
import { Button } from '@mui/material';
import {Typography} from '@mui/material';

import { parseTilesets } from '../helpful_functions/helpful_function_MapImport';


const drawerWidth = 240;
const Sidemenu = ({turnOnJSONMod, mapHeight, mapWidth ,setMapHeight, setMapWidth, tileHeight, tileWidth, setTileHeight, setTileWidth, transactionStack }) => {
  const [anchor,setAnchor]=useState(null)
  const openPopover=(e)=>{
    setAnchor(e.currentTarget)
  }

  /**
   * Creates a file reader object so users can import local map files
   */
  const handleImportMap = (event)=> {
    let reader = new FileReader();
    reader.onload = onReaderLoadMap;
    reader.readAsText(event.target.files[0]);
  }

  /**
   * If valid map file, retrieves the map object data
   */
  async function onReaderLoadMap (event) {
    console.log("INSIDE OF onReaderLoad() ToolbarLeft.js for Map Import");
    let map = JSON.parse(event.target.result);
    console.log(map);
    let used_tilesets = parseTilesets(map);
    importMap(map, used_tilesets);

    //let new_tiles = await loadTSMapEditor(obj.imagewidth, obj.imageheight, obj.tilewidth, obj.tileheight, obj.image, obj.name);
    //props.importTileset({TSName: obj.name, tiles: new_tiles, numTiles: obj.tilecount});
  const saveJSON = () => {
    console.log("At the save");
    setAnchor(false);
    turnOnJSONMod();
  }

  const handleUndoRedo = async(type) => {
    if(type == "undo"){
      if(transactionStack.hasTransactionToUndo()){
        await transactionStack.undoTransaction();
      }
    }
    else{
      if(transactionStack.hasTransactionToRedo()){
        await transactionStack.doTransaction();
      }
    }
  }

    return (
  <Drawer
    variant="permanent"
    sx={{
      width: drawerWidth,
      flexShrink: 0,
      [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box',  },
      boxShadow:"10px 10px 10px pink"
    }}
      >
        
    <Toolbar />
    <Box sx={{ overflow: 'auto' }}>
      <List>
          <Box textAlign='center'>
            {/* Button for the  add menu */}
            <input onChange={handleImportMap} style={{ display: "none" }} id="contained-button-file-mapImport" type="file"/>
            <label htmlFor="contained-button-file-mapImport">
              <Button variant="contained"  component="span"  sx={{marginTop:3, marginBottom:2, pr:4, pl:4, backgroundColor:"#4E6C50" }}  >
              <Typography variant="h6" component="h2">Import</Typography>
              </Button>
            </label>
            
            <Menu
                id="basic-menu"
                open={Boolean(anchor)}
                anchorEl={anchor}
                onClose={()=>{setAnchor(null)}}
                PaperProps={{  
                  style: {  
                    width: 200,  
                  }}}
                MenuListProps={{
                  'aria-labelledby': 'import-button',
                }}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "center",
                }}
                
              >
                <MenuItem onClick={()=>{setAnchor(false)}}> <MapOutlinedIcon></MapOutlinedIcon> &nbsp; Open Map project</MenuItem>
                <Divider></Divider>
                <MenuItem onClick={()=>{setAnchor(false)}}> <MapOutlinedIcon></MapOutlinedIcon>&nbsp; New Map</MenuItem>
                
              </Menu>
              <Button variant='contained' sx={{marginTop:2, marginBottom:2, pr:5.5, pl:5.5, backgroundColor:"#4E6C50" }} onClick={openPopover}>
                <Typography variant="h6" component="h2">Save</Typography>
                
            </Button>
              <Menu
                id="basic-menu"
                open={Boolean(anchor)}
                anchorEl={anchor}
                onClose={()=>{setAnchor(null)}}
                PaperProps={{  
                  style: {  
                    width: 200,  
                  }}}
                MenuListProps={{
                  'aria-labelledby': 'basic-button',
                }}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "center",
                }}
                
              >
                <MenuItem onClick={()=>{setAnchor(false)}}> <MapOutlinedIcon></MapOutlinedIcon> &nbsp; Save as Png</MenuItem>
                <Divider></Divider>
                <MenuItem onClick={() => {saveJSON()}}> <MapOutlinedIcon></MapOutlinedIcon>&nbsp; Save As</MenuItem>
                <Divider></Divider>
                <MenuItem onClick={()=>{setAnchor(false)}}> <MapOutlinedIcon></MapOutlinedIcon>&nbsp; Save</MenuItem>
                
              </Menu>
      
              
              
            </Box>
    <Divider />
         {/* Map properties*/}
         <MapEditNav mapHeight={mapHeight} mapWidth={mapWidth} setMapHeight={setMapHeight} setMapWidth={setMapWidth} tileHeight={tileHeight} tileWidth={tileWidth} setTileHeight={setTileHeight} setTileWidth={setTileWidth}  />
        <Divider />
    </List>

    <Divider>
      <Undo onClick = {() => handleUndoRedo("undo")}/>
      <Redo onClick = {() => handleUndoRedo("redo")}/>
    </Divider>
    
    
    
  </Box>
      </Drawer>
            
            
            
        
    )
}

export default Sidemenu


