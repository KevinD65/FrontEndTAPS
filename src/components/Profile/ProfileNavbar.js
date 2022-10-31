import { React, useState } from 'react';
import { Tabs, Tab } from '@mui/material';
import MapIcon from '../../map-icon.png';
import TileIcon from'../../tile-icon.jpg';

const ProfileNavbar = (props) => {
  const[selectedTab, changeSelectedTab] = useState("Map");
  const [value, setvalue] = useState(0);

  /**
   * Changes the selected tab in the navbar and queries the corresponding data from the DB
   */
  const handleTabChange = async(value) => {
    setvalue(value);
    if(value == 0){ //map tab is selected
        props.queryProfileAssets("Map");
    }
    else{ //tileset tab is selected
        props.queryProfileAssets("Tileset");
    }
  }

  return (
    <Tabs textColor='inherit' value={value}  TabIndicatorProps={{style: {backgroundColor: "white" }}} onChange={(e,value)=>{handleTabChange(value)}} sx={{ flexGrow: 1}}>
        <Tab icon = {<img src={MapIcon} style={{height: "20px"}}/>} label="Maps" sx={{color:"black", fontWeight:700, marginLeft:5}} /> 
        <Tab label="Tilesets" icon = {<img src={TileIcon} style={{height: "20px"}}/>} sx={{color:"black", fontWeight:700, marginLeft:5}}/>
    </Tabs>
  );
}

export default ProfileNavbar;