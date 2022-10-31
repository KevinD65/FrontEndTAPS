import React from "react";
import SearchItem from "./SearchItem";
import './Community.css';

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
        <div id='Recent-Searches-Container'>
            <div id='Recent-Searches-Label'>Recent</div>
            <hr></hr>
            {
                recentSearches.map(searchItem => (
                    <SearchItem searchItem={searchItem} executeSearch={props.executeSearch}/>
                ))
            }
        </div>
    )
}

export default RecentSearches;