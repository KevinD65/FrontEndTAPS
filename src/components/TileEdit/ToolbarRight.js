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
import { useState } from 'react';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import LayersEdit  from "./LayersEdit"
//import TilesetMap from "./TilesetMap";
import Avatar from './Collaborators';

const drawerWidth = 240;
const Sidemenu = () => {
  const [anchor,setAnchor]=useState(null)
  const openPopover=(e)=>{
    setAnchor(e.currentTarget)
  }
    return (
  <Drawer
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
            
              <Avatar/>
    </Box>
    
         {/* List of sidebar components */}
         <LayersEdit/>
        <Divider />

    </List>
    
    
    
  </Box>
      </Drawer>
            
            
            
        
    )
}

export default Sidemenu


