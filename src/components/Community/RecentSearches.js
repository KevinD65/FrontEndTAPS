import React from "react";
import SearchItem from "./SearchItem";
import './Community.css';
import { Drawer, Toolbar, Typography,Card } from "@mui/material";
const drawerWidth = 240;
const RecentSearches = (props) => {
    //props will contain list of recent searches
    
    let recentSearches = [];
    if(!props.recentSearches){
        recentSearches.append("Seems like you haven't searched for anything recently. Have fun exploring!");
    }
    else{
        recentSearches = props.recentSearches;
    }

    return (
        
  <Drawer
  anchor={'right'}
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
        <div >
            <Typography id='Recent-Searches-Label' sx={{backgroundColor:"#4E6C50", mt:3 }} >Recent</Typography>
            
            {
                recentSearches.map(searchItem => (
                  <Card sx={{p:1, fontSize:3, mt:1}}>
                    <SearchItem searchItem={searchItem} executeSearch={props.executeSearch}/>
                    </Card>
                ))
            }
        </div>
       </Drawer>
    )
}

export default RecentSearches;