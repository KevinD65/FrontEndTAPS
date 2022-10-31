import React from "react";
import './Community.css';
import ExampleMapImage from '../../ExampleAssetImg.jpg';

const Asset = (props) => {

    //props will contain the community asset object which will contain information regarding the asset such as name, type, description, and image
    //let asset = props.asset; UNCOMMENT THIS AFTER BUILD #2

    return (
        <div id='Asset'>
            <div className="Asset-Description-Box">
                {/* UNCOMMENT THIS WHEN CONNECTING FRONTEND TO BACKEND
                <div>{asset.name}</div>
                <div>Type:{" " + asset.type}</div>
                <div>Description: {" " + asset.description}</div>
                */}

                {/*THE FOLLOWING IS HARDCODED STATIC EXAMPLE FOR BUILD #2*/}
                <img className="asset-image" alt="Asset Image Here" src={ExampleMapImage}/>
                <div className="asset-text">Ruins Adventure Map</div>
                <div className="asset-text">Type: Map</div>
                <div className="asset-text">Description: Map design for a 2D fantasy game that takes place in an ancient ruin. Explore and hunt for treasures thought to be lost to time</div>
            </div>
        </div>
    )
}

export default Asset;