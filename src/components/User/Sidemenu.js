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
import Map from "./Map"
import Tileset from "./Tileset"
import { useState } from 'react';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

const drawerWidth = 240;
const Sidemenu = () => {
  const [anchor,setAnchor]=useState(null)
  const openPopover=(e)=>{
    setAnchor(e.currentTarget)
  }
    return (
  <Drawer
    PaperProps={{
    sx: {
      backgroundColor: "#F8EDE3"
    }
  }}
    variant="permanent"
    sx={{
      width: drawerWidth,
      flexShrink: 0,
      [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box' },
      backgroundColor:"#F0EBCE"
    }}
      >
        
    <Toolbar />
    <Box sx={{ overflow: 'auto' }}>
      <List>
          <Box textAlign='center'>
            {/* Button for the  add menu */}
            <Button variant='contained' sx={{marginTop:3, marginBottom:3, pr:4, pl:4, backgroundColor:"#4E6C50" ,color:"#F8EDE3"}} onClick={openPopover}>
                <Typography variant="h3" component="h2">+</Typography>
                <Typography variant="h6" component="h2">&nbsp; New</Typography>
            </Button>
      
              {/* Menu for adding notes and tilesets */}
              <Menu
                id="basic-menu"
                open={Boolean(anchor)}
                anchorEl={anchor}
                onClose={()=>{setAnchor(null)}}
                PaperProps={{  
                  style: {  
                    width: 180,  
                  }}}
                MenuListProps={{
                  'aria-labelledby': 'basic-button',
                }}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "center",
                }}
                
              >
                <MenuItem onClick={()=>{setAnchor(false)}}> <MapOutlinedIcon></MapOutlinedIcon> &nbsp; New Map</MenuItem>
                <Divider></Divider>
                <MenuItem onClick={()=>{setAnchor(false)}}> <GridViewOutlinedIcon/> &nbsp; New Tile</MenuItem>
                
              </Menu>
    </Box>
    <Divider />
         {/* List of sidebar components */}
    {[{name:'All', icon:<InboxIcon/>}, {name:'Maps', icon:<MapOutlinedIcon/>}, {name:'Tiles', icon:<GridViewOutlinedIcon/>}, {name:'Starred', icon:<StarBorderIcon/>}, {name:'Shared with me', icon:<FolderSharedOutlinedIcon/>}].map((text, index) => (
        <ListItem key={text.name} disablePadding>
          <ListItemButton>
            <ListItemIcon>
              {text.icon}
            </ListItemIcon>
            <ListItemText primary={text.name} />
            
            
          </ListItemButton>
          
        </ListItem>
        
      ))}
        <Divider />
    </List>
    
    
    
  </Box>
      </Drawer>
            
            
            
        
    )
}

export default Sidemenu


