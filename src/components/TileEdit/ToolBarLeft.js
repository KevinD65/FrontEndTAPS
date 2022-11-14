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
import { Button } from '@mui/material';
import {Typography} from '@mui/material';
import { ChromePicker } from 'react-color';
import TileEditNav from './TileEditNav';

const styles = {
  'default': {
    picker: { background: 'inherit', boxShadow: 'none',  border:"none" ,paddingLeft:"5px"}, 
  }}
const drawerWidth = 240;
const Sidemenu = (props) => {
  const [anchor,setAnchor]=useState(null);
  const [color, changeColor] = useState('#fff');
  const colorUpdate = (color, event) => {
    props.updateBrushColorCallback(color);
    changeColor(color);
  }
  const openPopover=(e)=>{
    setAnchor(e.currentTarget)
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
            <Button aria-label ="import-button"variant='contained' sx={{marginTop:3, marginBottom:2, pr:4, pl:4, backgroundColor:"#4E6C50" }} onClick={openPopover}>
                <Typography variant="h6" component="h2">Import</Typography>
                
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
                <MenuItem onClick={()=>{setAnchor(false)}}> <MapOutlinedIcon></MapOutlinedIcon> &nbsp; Save as Png</MenuItem>
                <Divider></Divider>
                <MenuItem onClick={()=>{setAnchor(false)}}> <MapOutlinedIcon></MapOutlinedIcon>&nbsp; Save As</MenuItem>
                <Divider></Divider>
                <MenuItem onClick={()=>{setAnchor(false)}}> <MapOutlinedIcon></MapOutlinedIcon>&nbsp; Save</MenuItem>
                
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


