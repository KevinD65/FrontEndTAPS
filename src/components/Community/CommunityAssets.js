import React from "react";
import Asset from "./Asset";
import './Community.css';

const CommunityAssets = (props) => {
    //props will contain list of queried community assets

    return (
        <div id='Community-Assets'>
            <div id='Community-Assets-Label'>Some Popular Assets</div>
            {
                /* THIS WILL MAP ALL QUERIED COMMUNITY ASSETS TO THEIR OWN <Asset> COMPONENT
                props.communityassets.map(asset => (
                    <Asset/>
                ))*/
            }
            
            {/*BELOW IS A HARDCODED STATIC EXAMPLE FOR BUILD #2*/}
            <Asset/>
        </div>
    )
}

export default CommunityAssets;