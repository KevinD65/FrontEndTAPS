import { React, useState } from "react";
import CommunityAssets from "./CommunityAssets";
import RecentSearches from "./RecentSearches";
import Searchbar from "./Searchbar";
import ToolBarLeft from "./ToolBarLeft";
import {GET_COMMUNITY_SCREEN_MAPS} from "../../graphql/queries/communityScreenMaps";
import {GET_COMMUNITY_SCREEN_TILESETS} from "../../graphql/queries/communityScreenTilesets";
import { useQuery, useMutation } from '@apollo/client';
import { GET_ASSET_SCREEN_MAPS } from "../../graphql/queries/assetScreenMaps";


const Community = () => {
    const [recentSearches, updateRecentSearches] = useState(["map"]);
    const [tagFilter, updateTagFilter] = useState("Maps");
console.log(tagFilter);
    

//set the initial fetching of maps to look for maps of a tag
    const { loading: get_maps_loading, error: get_maps_error, data:mapdata } = useQuery(GET_COMMUNITY_SCREEN_MAPS, {
        variables: {tag: tagFilter,
                    search: recentSearches[0]},
      });

    console.log(mapdata)

// refetching of maps if any changes need to occur
      const refetchMaps = {
        refetchQueries: [
          {
            query: GET_COMMUNITY_SCREEN_MAPS,
            variables:{tag: tagFilter,
                    search: recentSearches[0]}
          }
        ]
      }

      //set the initial fetching of maps to look for tilesets of a tag
    /*const { loading: get_tilesets_loading, error: get_tilesets_error, data:tilesetdata } = useQuery(GET_COMMUNITY_SCREEN_TILESETS, {
        variables: {tag: tagFilter,
                    search: recentSearches[0]},
      });

    console.log(tilesetdata)*/

    //query DB for community assets so we can pass it down to <CommunityAssets/> as a prop

    /**
     * executes a search on the input entered into the searchbox
     */
     const executeSearch = async(input) => {
        //alert(input);
        let recentSearchesCopy = [...recentSearches];
        //IF THE ITEM BEING SEARCHED FOR IS IN THE RECENT, BRING IT TO THE TOP IN RECENT SEARCH LIST
        if(recentSearchesCopy.includes(input)){
            let bringToTop = recentSearches.indexOf(input);
            recentSearchesCopy.splice(bringToTop, 1);
        }
        
        //ADD THE ITEM BEING SEARCHED FOR TO THE TOP OF THE RECENT SEARCH LIST
        recentSearchesCopy.unshift(input);
        updateRecentSearches(recentSearchesCopy);

        //AVOID OVERFLOW IN RECENT SEARCH LIST
        if(recentSearches.length === 10){
            recentSearchesCopy.pop();
            updateRecentSearches(recentSearchesCopy);
        }
        //console.log(recentSearches);
        alert("SEARCHING FOR: " + input);
        //execute query
    }

    function handleTagFilterChange(input) {
        updateTagFilter(input);
      }

    return (
        <div className='Community'>
            <Searchbar executeSearch={executeSearch}/>
            <div id='community-screen-container'>
                <ToolBarLeft tagFilter={tagFilter} onTagFilterChange = {handleTagFilterChange} />
                {/* <div className="community-screen-leftsidecontent">
                    <div className="searchFilterLabel">Type</div>
                    <hr></hr>
                    <div className="searchFilterItem">Map</div>
                    <div className="searchFilterItem">Tiles</div>
                    <div className="searchFilterItem">Folders</div>
                    <br></br>
                    <div className="searchFilterLabel">Category</div>
                    <hr></hr>
                    <div className="searchFilterItem">Characters</div>
                    <div className="searchFilterItem">Textures</div>
                    <div className="searchFilterItem">UI</div>
                    <div className="searchFilterItem">Icons</div>
                    <div className="searchFilterItem">Background</div>
                    <div className="searchFilterItem">Sprites</div>
                </div> */}
                <div className="community-screen-middlecontent">
                    
                    {!get_maps_loading && !get_maps_error &&  <CommunityAssets mapdata = {mapdata}/>}
                </div>
                <div className="community-screen-rightsidecontent">
                    <RecentSearches recentSearches={recentSearches} executeSearch={executeSearch}/>
                </div>

            </div>
        </div>
    )
}


export default Community;

