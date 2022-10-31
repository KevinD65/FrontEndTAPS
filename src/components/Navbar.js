import * as React from 'react';
import { useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import tapsLogo from "../static/taps-logo.svg" 
import { Tabs,Tab } from '@mui/material';
import { borderLeft } from '@mui/system';
import {Link} from "react-router-dom"

const Navbar=()=> {
  const [value,setvalue]=useState(0)
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="fixed" 
      sx={{ 
        zIndex: (theme) => theme.zIndex.drawer + 1,
        backgroundColor:"#395144"
       }}>
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
            component={Link} to={`/userAsset`}
            onClick={()=>{setvalue(0)}}
          >
            <img src={tapsLogo} alt="logo"  />
          </IconButton>
          <Tabs 
          textColor='inherit' 
          value={value}  
          TabIndicatorProps={{
    style: {backgroundColor: "#AA8B56" }}} 
    onChange={(e,value)=>{setvalue(value)}} sx={{ flexGrow: 1 , ml:4}}>
            <Tab label="Home" component={Link} to={`/userAsset`} sx={{color:"#F8EDE3", fontWeight:700, marginRight:5}} /> 
            <Tab label="Community" component={Link} to={`/community`} sx={{color:"#F8EDE3", fontWeight:700,marginRight:5}}/>
            <Tab label="Profile" component={Link} to={`/userProfile`} sx={{color:"#F8EDE3", fontWeight:700,marginRight:5}}/>
            
          </Tabs>
          <Button color="inherit">Logout</Button>
        </Toolbar>
        
      </AppBar>
      <Toolbar/>
    </Box>
  );
}

export default Navbar;