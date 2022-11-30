import { React, useState } from "react";
import './UserProfile.css';
import DogeLoaf from '../../dogeloaf.jpg';
import ProfileAssets from "./ProfileAssets";
import ProfileNavbar from "./ProfileNavbar";
import UpdateAccountScreen from "./UpdateAccountScreen";
import {gql, useMutation, useQuery} from '@apollo/client';
import {UPDATE_USER_INFO, GET_USER} from '../../graphql/queries/profileScreenQM';
import TextField from '@mui/material/TextField';

const UserProfile = (props) => {

    //props contains current User object
    let currentUser = props.authenticatedUser;
    const [editBio, toggleBio] = useState(false);

    const { loading: get_user_loading, error: get_user_error, data: user_data } = useQuery(GET_USER, {
        variables: {id: currentUser.id},
      });
    
      const refetchUser = {
        refetchQueries: [
          {
            query: GET_USER,
            variables: {id: currentUser.id}
          }
        ]
      }

    const [updateAccountScreen, toggleUpdateAccountScreen] = useState(false);
    const [updateAccount] = useMutation(UPDATE_USER_INFO, refetchUser);
    const [queryType, changeQueryType] = useState("Map");

    const queryProfileAssets = async(assetType) => {
        changeQueryType(assetType);
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
        console.log(updatedUser.data.updateUser.id);
        props.authenticateUser(updatedUser.data.updateUser); //update the authenticated user
    }

    const updateBio = async(bio) => {
        
        let updatedUser = await updateAccount({
            variables: {
              id: currentUser.id,
              bio: bio,
            }
          });
        props.authenticateUser(updatedUser.data.updateUser);
        toggleBio(false);
    }

    const showUpdateAccountScreen = async() => {
        toggleUpdateAccountScreen(!updateAccountScreen);
    }
    
      

    return (
        <div className="userprofile-screen-container">
            { !updateAccountScreen ?
            <>
                <div id='userprofile-bio-panel'>
                    {!get_user_loading && !get_user_error && <div id='bio-container'>
                        <img id='profile-pic' src={DogeLoaf}></img>
                        <div id='bio-name'>{user_data.getUser.name}</div>
                        <div id='bio-username'>{user_data.getUser.username}</div>
                        {!editBio ? 
                                <div id='bio-bio' onDoubleClick={()=>{toggleBio(true)}}>{
                                    user_data.getUser.bio ? user_data.getUser.bio : "Empty Bio"
                                }</div>
                                : <TextField
                                id="standard-textarea"
                                label="Bio"
                                placeholder="Enter Bio Here"
                                multiline
                                variant="standard"
                                onBlur={(e) => updateBio(e.target.value)}
                              />
                        }
                    </div>}
                    <div id='updateAccount-container'>
                        <div id='updateAccount-button' onClick={showUpdateAccountScreen}>Update Account Information</div>
                    </div>
                </div>
                <div id='userprofile-asset-panel'>
                    <div id='my-assets-container'>
                        <ProfileNavbar queryProfileAssets = {queryProfileAssets}/>
                        {<ProfileAssets queryType={queryType} currentUser={props.authenticatedUser} />}
                    </div>
                </div>
            </>: <UpdateAccountScreen currentUser={props.authenticatedUser} updateAccount={handleUpdateAccount} showUpdateAccountScreen={showUpdateAccountScreen}/>
            }
        </div>
    )
}

export default UserProfile;