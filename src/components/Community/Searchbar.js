import React from "react";
import './Community.css';
import SearchIcon from '@mui/icons-material/Search';

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
        <div className='Searchbar' onKeyUp={handleSearch}>
            <SearchIcon id='searchbar-magnifyingglass' onClick={handleSearch}/>
            <input id='searchbarinput' placeholder="Type here to search for assets"></input>
        </div>
    )
}

export default Searchbar;