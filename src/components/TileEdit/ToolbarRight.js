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
import { useState,useEffect } from 'react';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import LayersEdit  from "./LayersEdit"
//import TilesetMap from "./TilesetMap";
import Avatar from './Collaborators';
import {Card,CardContent,Grid,Badge} from '@mui/material';
import mergeImages from 'merge-base64'



const drawerWidth = 240;
const Sidemenu = (props) => {
  const removeSelected=(e)=>{
    let i=e.target.id
    console.log(e.target.id)
    
  }


  useEffect(()=>{

  },[props.tileList])

  let counter=0;
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
         <LayersEdit changeBrushSizeCallback={props.changeBrushSizeCallback} 
         defaultBrush={props.defaultBrush}
         setErase={props.setErase} erase={props.erase}
         
         />
        <Divider />

    </List>
    <Typography sx={{color:"white" ,backgroundColor:"#4E6C50" ,fontWeight:700, pl:2 ,pt:1,pb:1}}>Tiles</Typography>

    <Grid container 
            direction='row'
            >
    
    {props.tileList.length<=0 && <Typography sx={{color:"black"  ,fontWeight:400, pl:2 ,pt:1,pb:1}}>Save tiles to add...</Typography>}
    {props.tileList &&  props.tileList.map((data)=>{
            console.log("Data", data);
                
            return(
            <Grid id={counter} item md={3} >
              {counter+=1}
              <Badge  cursor="pointer"  badgeContent="x" color="error" onClick={removeSelected} sx={{pl:6}}></Badge>
              {/*<Box sx={{ border: 5}}>
                <img src={data}></img>
            </Box>*/}
              
            <Card sx={{width:40 ,height:40 ,mb:1}}>
            
            <CardContent sx={{paddingLeft: 0, paddingTop: 0}}>
      <img src={data}></img>
    </CardContent>
            </Card>
    
            </Grid>
        )
              })}




    
    </Grid>
    
    
    
  </Box>
      </Drawer>
            
            
            
        
    )
}

export default Sidemenu




