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

import { useState } from 'react';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import FolderOpenIcon from '@mui/icons-material/FolderOpen';

const drawerWidth = 240;
const ToolBarLeft = (props) => {
  
  

  const [anchor,setAnchor]=useState(null)
  const openPopover=(e)=>{
    setAnchor(e.currentTarget)
  }

  //changes the filter text to the tag's name
  function handleTagFilterChange(input) {
    props.onTagFilterChange(input);
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
            
    </Box>
    <Divider />


         {/* List of sidebar components */}
    {[{name:'All', icon:<InboxIcon/>}, {name:'Maps', icon:<MapOutlinedIcon/>}, {name:'Tiles', icon:<GridViewOutlinedIcon/>}, {name:'Folders', icon:<FolderOpenIcon/>}, ].map((text, index) => (
        <ListItem key={text.name} disablePadding>
          <ListItemButton onClick={() => handleTagFilterChange(text.name)}>
            <ListItemIcon>
              {text.icon}
            </ListItemIcon>
            <ListItemText primary={text.name} />
            
            
          </ListItemButton>
          
        </ListItem>
        
      ))}

<Divider />

<Divider />

{[{name:'Characters', icon:<InboxIcon/>}, {name:'Texture', icon:<MapOutlinedIcon/>}, {name:'UI', icon:<GridViewOutlinedIcon/>}, {name:'Icons', icon:<StarBorderIcon/>}, {name:'Background', icon:<FolderSharedOutlinedIcon/>},{name:'Sprites', icon:<FolderSharedOutlinedIcon/>}].map((text, index) => (
        <ListItem key={text.name} disablePadding >
          <ListItemButton onClick={() => handleTagFilterChange(text.name)}>
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

export default ToolBarLeft


