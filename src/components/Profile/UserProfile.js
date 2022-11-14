import { React, useState } from "react";
import './UserProfile.css';
import DogeLoaf from '../../dogeloaf.jpg';
import ProfileAssets from "./ProfileAssets";
import ProfileNavbar from "./ProfileNavbar";
import UpdateAccountScreen from "./UpdateAccountScreen";
import {gql, useMutation, useQuery} from '@apollo/client';
import {UPDATE_USER_INFO, GET_USER} from '../../graphql/queries/profileScreenQM';

const UserProfile = (props) => {

    //props contains current User object
    let currentUser = props.authenticatedUser;

    const { loading: get_user_loading, error: get_user_error, data: user_data } = useQuery(GET_USER, {
        variables: {input: currentUser.username},
      });
    
      const refetchUser = {
        refetchQueries: [
          {
            query: GET_USER,
            variables: {input: currentUser.username}
          }
        ]
      }

    const [updateAccountScreen, toggleUpdateAccountScreen] = useState(false);
    const [updateAccount] = useMutation(UPDATE_USER_INFO, refetchUser);

    const queryProfileAssets = async(assetType) => {
        if(assetType == "Map"){
            alert("Querying User's Maps");
        }
        else if(assetType == "Tileset"){
            alert("Querying User's Tilesets");
        }
    }

    const handleUpdateAccount = async(id, name, username, email, hash, bio) => {
        let updatedUser = await updateAccount({
            variables: {
              id: id,
              name: name,
              username : username, 
              email: email,
              hash: hash, 
              bio: bio
            }
          });
        console.log(updatedUser.data.updateUser);
        props.authenticateUser(updatedUser); //update the authenticated user
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
                        <div id='bio-name'>{currentUser.name}</div>
                        <div id='bio-username'>{currentUser.username}</div>
                        <div id='bio-bio'>{currentUser.bio}</div>
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
            </>: <UpdateAccountScreen currentUser={props.authenticatedUser} updateAccount={handleUpdateAccount} showUpdateAccountScreen={showUpdateAccountScreen}/>
            }
        </div>
    )
}

export default UserProfile;