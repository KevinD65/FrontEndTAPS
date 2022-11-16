import React from "react";
import './Community.css';
import SearchIcon from '@mui/icons-material/Search';
import {Card,Box, Button,  TextField,Typography,InputAdornment,IconButton} from "@mui/material"


const Searchbar = (props) => {

    const handleSearch = async(event) => {
        let search = document.getElementById("searchbarinput").value;
        if(search){
            if(event.keyCode === 13 || event.button === 0){ //detect enter button or left mouse button on magnifying glass
                props.executeSearch(search);
                document.getElementById("searchbarinput").value = "";
            }
        }
    }

    return (
        <Box className='Searchbar' onKeyUp={handleSearch}>
            
            <TextField
            id='searchbarinput'
            sx={{ml:35 , width:750}}
            placeholder="Type here to search for assets"
            InputProps={{
                endAdornment: (
      <InputAdornment>
        <IconButton>
          <SearchIcon onClick={handleSearch} />
        </IconButton>
      </InputAdornment>
    )
  }}
/>
           
        </Box>
    )
}

export default Searchbar;




