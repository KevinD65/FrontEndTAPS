import { React, useState } from "react";
import './UserProfile.css';
import DogeLoaf from '../../dogeloaf.jpg';
import ProfileAssets from "./ProfileAssets";
import ProfileNavbar from "./ProfileNavbar";
import UpdateAccountScreen from "./UpdateAccountScreen";

const UserProfile = (props) => {

    //props contains current User object
    let currentUser = props.currentUser;

    const [updateAccountScreen, toggleUpdateAccountScreen] = useState(false);

    const queryProfileAssets = async(assetType) => {
        if(assetType == "Map"){
            alert("Querying User's Maps");
        }
        else if(assetType == "Tileset"){
            alert("Querying User's Tilesets");
        }
    }

    const handleUpdateAccount = async(updatedUserInfo) => {
        //calls mutation (identifies user based off of ID)
    }

    const showUpdateAccountScreen = async() => {
        toggleUpdateAccountScreen(!updateAccountScreen);
    }

    return (
        <div className="userprofile-screen-container">
            { !updateAccountScreen ?
            <>
                <div id='userprofile-bio-panel'>
                    <div id='bio-container'>
                        <img id='profile-pic' src={DogeLoaf}></img>
                        <div id='bio-name'>Kevin Duong</div>
                        <div id='bio-username'>ContainerGamer52</div>
                        <div id='bio-bio'>Yeah that's right, this is my biography and here are all my assets.</div>
                    </div>
                    <div id='updateAccount-container'>
                        <div id='updateAccount-button' onClick={showUpdateAccountScreen}>Update Account Information</div>
                    </div>
                </div>
                <div id='userprofile-asset-panel'>
                    <div id='my-assets-container'>
                        <ProfileNavbar queryProfileAssets = {queryProfileAssets}/>
                        <ProfileAssets/>
                    </div>
                </div>
            </>: <UpdateAccountScreen currentUser={currentUser} updateAccount={handleUpdateAccount} showUpdateAccountScreen={showUpdateAccountScreen}/>
            }
        </div>
    )
}

export default UserProfile;