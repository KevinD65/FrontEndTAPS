import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import MapOutlinedIcon from '@mui/icons-material/MapOutlined';
import { useState } from 'react';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
//import MapEditNav from './MapEditNav';
import { Button, Input } from '@mui/material';
import {Typography,} from '@mui/material';
import { ChromePicker } from 'react-color';
import TileEditNav from './TileEditNav';
import "./tileEdit.css"
import { loadTS } from '../helpful_functions/Tileset_JSON_to_Local';
import {uploadImageToCloudinaryAPIMethod} from "../../client"

const styles = {
  'default': {
    picker: { background: 'inherit', boxShadow: 'none',  border:"none" ,paddingLeft:"5px"}, 
  
  }}
const drawerWidth = 240;
const Sidemenu = (props) => {
  const [anchor,setAnchor]=useState(null);
  const[importAnchor, setImportAnchor]= useState(null);
  const [color, changeColor] = useState('#fff');
  const colorUpdate = (color, event) => {
    props.updateBrushColorCallback(color);
    changeColor(color);
  }

  const handleImageSelected = async (image) => {
    console.log("New File Selected");
        const formData = new FormData();
        const unsignedUploadPreset = 'ngrdnw4p'
        formData.append('file', image);
        formData.append('upload_preset', unsignedUploadPreset);
  
        console.log("Cloudinary upload");
        return uploadImageToCloudinaryAPIMethod(formData).then((response) => {
            console.log("Upload success", response.secure_url);
            return response.secure_url;
        });
    
  }

  const handleImportJSON=(event)=> {
    var reader = new FileReader();
    reader.onload = onReaderLoad;
    reader.readAsText(event.target.files[0]);
}

const handleImportPNG=(event)=> {
 props.setImportPNG(true)
}
async function onReaderLoad (event) {
    console.log(event.target.result);
    var obj = JSON.parse(event.target.result);
    //console.log("TS", loadTS(obj.imagewidth, obj.imageheight, obj.tilewidth, obj.tileheight, obj.image));
    let new_tiles = await loadTS(obj.imagewidth, obj.imageheight, obj.tilewidth, obj.tileheight, obj.image);
    // let new_srcs = [];
    // for(let i = 0; i < new_tiles.length; i += 1){
    //   let src = await handleImageSelected(new_tiles[i]);
    //   new_srcs.push(src);
    // }
    props.handleImport(new_tiles);
    
}

  const saveJSON = () => {
    setAnchor(false);
    props.turnOnJSONMod();
  }

  const savePNG = () => {
    setAnchor(false);
    props.turnOnPNGMod();
  }

  const savetoDB = () => {
    setAnchor(false);
    props.turnOnSaveMod();
  }

  const openPopover=(e)=>{
    setAnchor(e.currentTarget)
  }
  const openImportPopover=(e)=>{
    setImportAnchor(e.currentTarget)
  }

    return (
  <Drawer
    variant="permanent"
    sx={{
      width: drawerWidth,
      flexShrink: 0,
      [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box', },
      boxShadow:"10px 10px 10px pink"
    }}
      >
         
    <Toolbar />
    <Box sx={{ overflow: 'auto' }}>
      <List>
          <Box textAlign='center'>
            {/* Button for the  add menu */}
            {/* <Input variant='contained' sx={{marginTop:3, marginBottom:2, pr:4, pl:4, backgroundColor:"#4E6C50" }} >
                <Typography variant="h6" component="h2">Import</Typography>
                <input  id="file-upload" type="file" onChange={handleImportJSON}/>
            </Button> */}
            <input
    onChange={handleImportJSON}
    style={{ display: "none" }}
    id="contained-button-file-JSON"
    type="file"
  />
  {/* <div
    onChange={handleImportPNG}
    
    id="contained-button-file-PNG"
    
  /> */}
  
    <Button variant="contained"  component="span"  sx={{marginTop:3, marginBottom:2, pr:4, pl:4, backgroundColor:"#4E6C50" }}  onClick={openImportPopover} >
    <Typography variant="h6" component="h2">Import</Typography>
    </Button>
  
            <Menu
                id="basic-menu"
                open={Boolean(importAnchor)}
                anchorEl={importAnchor}
                onClose={()=>{setImportAnchor(null)}}
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
                <label htmlFor="contained-button-file-JSON">
                <MenuItem onClick={()=>{setImportAnchor(false)}}> <MapOutlinedIcon></MapOutlinedIcon> &nbsp; Import JSON</MenuItem>
                </label>
                <Divider></Divider>
                <label htmlFor="contained-button-file-PNG">
                <MenuItem onClick={handleImportPNG}> <MapOutlinedIcon></MapOutlinedIcon>&nbsp;Import PNG</MenuItem>
                </label>
              </Menu>
              <Button variant='contained' sx={{marginTop:3, marginBottom:2, pr:4, pl:4, backgroundColor:"#4E6C50" }} onClick={openPopover}>
                <Typography variant="h6" component="h2">Export</Typography>
                
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
                <MenuItem onClick={savePNG}> <MapOutlinedIcon></MapOutlinedIcon> &nbsp; Save as PNG</MenuItem>
                <Divider></Divider>
                <MenuItem onClick={saveJSON}> <MapOutlinedIcon></MapOutlinedIcon>&nbsp; Save As JSON</MenuItem>
                <Divider></Divider>
                <MenuItem onClick={savetoDB}> <MapOutlinedIcon></MapOutlinedIcon>&nbsp; Save</MenuItem>
                
              </Menu>
      
              
              
            </Box>
    
         {/* Map properties*/}
         <ChromePicker color={color} onChange={colorUpdate} styles={styles} />
         
         {/* <Box>
            <Button aria-label ="import-button"variant='contained' sx={{marginTop:3, marginBottom:2, marginLeft:2, marginRight:2, pr:1, pl:1, backgroundColor:"#4E6C50" }} 
            onClick={() => {props.eraseOffCallback()}}>
                <Typography variant="h6" component="h2">Draw</Typography>
                
            </Button>
            <Button aria-label ="import-button"variant='contained' sx={{marginTop:3, marginBottom:2, marginLeft:2, marginRight:2, pr:1, pl:1, backgroundColor:"#4E6C50" }} 
            onClick={() => {props.eraseOnCallback()}}>
                <Typography variant="h6" component="h2">Erase</Typography>
                
            </Button>
         </Box> */}
          
        <Divider />
    </List>
    
    <TileEditNav
    
    canvasWidth={props.canvasWidth} setCanvasWidth={props.setCanvasWidth} canvasHeight={props.canvasHeight} setCanvasHeight={props.setCanvasHeight}
    
    />
    
    </Box>
      </Drawer>
            
            
            
        
    )
}

export default Sidemenu


