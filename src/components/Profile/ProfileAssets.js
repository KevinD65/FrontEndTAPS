import { React } from "react";
import './UserProfile.css';
import MapQueries from "./MapQueries";
import TSQueries from "./TSQueries";

const ProfileAssets = (props) => {

    //props will contain list of queried user assets

    return (
        <div id='Profile-Assets'>
            {props.queryType == "Map" ? <MapQueries currentUser={props.currentUser}/> : <TSQueries currentUser={props.currentUser}/>}
            
        </div>
    )
}

export default ProfileAssets;