import React from "react";
import './Community.css';

const SearchItem = (props) => {

    //props will contain the recent search object which has text regarding the object

    const executeRecentSearch = async(event) => {
        props.executeSearch(props.searchItem);
    }


    return (
        <div className='Search-Item' onClick={executeRecentSearch}>
            {
                props.searchItem
            }
        </div>
    )
}

export default SearchItem;