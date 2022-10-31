import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
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
import { Button,Grid,Popover } from '@mui/material';
import MapOutlinedIcon from '@mui/icons-material/MapOutlined';
import GridViewOutlinedIcon from '@mui/icons-material/GridViewOutlined';
import FolderSharedOutlinedIcon from '@mui/icons-material/FolderSharedOutlined';
import Map from "./Map"
import Tileset from "./Tileset"
import { useState } from 'react';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Sidemenu from './Sidemenu';


const dummyData=[{name:"waterfall" ,image:"something.svg", owner:"abcd", type:"map",starred:0},{name:"Mario " ,image:"something.svg", owner:"abcd", type:"map",starred:0},{name:"My city" ,image:"something.svg", owner:"abcd1", type:"map",starred:1},{name:"mountain" ,image:"something.svg", owner:"abcd2", type:"tiles",starred:0},{name:"soil" ,image:"something.svg", owner:"abcd2", type:"tiles",starred:1}]

export default function UserAsset() {
  
  return (
<Box sx={{ display: 'flex' ,backgroundColor:"F0EBE3"}}>
      <CssBaseline />
      <Sidemenu/> 
         
<Grid container direction="row">


<Typography variant="h6" sx={{mt:4, ml:4, fontWeight:700}} >Maps <hr/></Typography>
{/* This arranges the mapped data items in a grid  */}
    <Grid container>
      
      {dummyData.map((data)=>{
            if (data.type=="map"){
                
                return(
                <Grid  item md={3} >
                <Map mapName={data.name}/>
                </Grid>
            )}
                  })}
    </Grid>


  <Typography variant="h6" sx={{mt:4, ml:4, fontWeight:700}}  >Tilesets <hr/></Typography>
    <Grid container   >
      {dummyData.map((data)=>{
            if (data.type=="tiles"){
                  
                return(
                <Grid item  md={3} >
                <Tileset  tileName={data.name}/>
                
                </Grid>
      )}
                      })}
  
    </Grid>

  </Grid>
      
</Box>
    
  );
}

