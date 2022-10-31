import { React } from "react";
import './UserProfile.css';
import Asset from "../Community/Asset";

const ProfileAssets = (props) => {

    //props will contain list of queried user assets

    return (
        <div id='Profile-Assets'>
            {
                /* THIS WILL MAP ALL QUERIED COMMUNITY ASSETS TO THEIR OWN <Asset> COMPONENT
                props.profileAssets.map(asset => (
                    <Asset/>
                ))*/
            }
            
            {/*BELOW IS A HARDCODED STATIC EXAMPLE FOR BUILD #2*/}
            <Asset/>
        </div>
    )
}

export default ProfileAssets;