import { React, useState } from 'react';
import TAPSLogo from '../../TAPSLogo.PNG';
import '../Account/Login.css';
import './UserProfile.css';

function UpdateAccountScreen(props) {
    let currentUser = props.currentUser;
    const [name, updateInputName] = useState(currentUser.name);
    const [username, updateInputUsername] = useState(currentUser.username);
    const [email, updateInputEmail] = useState(currentUser.email);
    const [password, updateInputPassword] = useState(null);
    const [passwordConfirm, updateInputPasswordConfirm] = useState(null);
    const [bio, updateInputBio] = useState(currentUser.bio);
    const [showError, toggleShowError] = useState(false);

    const bcrypt = require('bcryptjs');
    const saltRounds = bcrypt.genSaltSync(12);

    const storeInputValue = async(field, value) => {
      if(field == "name"){
        updateInputName(value);
      }
      else if(field == "email"){
        updateInputEmail(value);
      }
      else if(field == "username"){
        updateInputUsername(value);
      }
      else if(field == "password"){
        updateInputPassword(value);
      }
      else if(field == "passwordConfirm"){
        updateInputPasswordConfirm(value);
      }
      else if(field == "bio"){
        updateInputBio(value);
      }
    }

    /**
     * Responds to submission of updated account information. Checks password to ensure they are correct and sends new user information to UserProfile.js for backend processing
     */
    const submitAccountChange = async() => {

      //ENSURE PASSWORD IS NOT NULL
      if(password == null){
        toggleShowError(true);
        return;
      }
      
      //ENSURE PASSWORD AND CONFIRM PASSWORD MATCH
      if(password == passwordConfirm){

        let hash;
        if(!bcrypt.compareSync(password, currentUser.hash)){
          hash = bcrypt.hashSync(password, saltRounds);
        }
        else{
          hash = currentUser.hash;
        }

        props.updateAccount(currentUser.id, name, username, email, hash, bio);

        updateInputName(name);
        updateInputEmail(username);
        updateInputUsername(email);
        updateInputPassword(null);
        updateInputPasswordConfirm(null);
        updateInputBio(bio);
      }
    }


  return (
    <div id='login-screen-container'>
      <div className='login-screen-panel TAPSLogo'>
        <img alt="TAPS Logo" id='TAPS-logo-login' src={TAPSLogo}/>
        <div id='taps-slogan'>
          A One Stop Solution To All Your Map Needs
        </div>
      </div>
      <div className='updateaccount-screen-panel update-panel'>
        <input autocomplete="new-password" id='updateName' className='login-screen-input' type="text" placeholder={currentUser.name} onChange = {(event) => storeInputValue("name", event.target.value)}></input>
        <input autocomplete="new-password" id='updateUsername' className='login-screen-input' type="text" placeholder={currentUser.username} onChange = {(event) => storeInputValue("username", event.target.value)}></input>
        <input autocomplete="new-password" id='updateEmail' className='login-screen-input' type="text" placeholder={currentUser.email} onChange = {(event) => storeInputValue("email", event.target.value)}></input>
        { !toggleShowError ?
        <>
        <input autocomplete="new-password" id='updatePassword' className='login-screen-input' type="password" placeholder="New or Current Password" onChange = {(event) => storeInputValue("password", event.target.value)}></input>
        <input autocomplete="new-password" id='confirmUpdatePassword' className='login-screen-input' type="password" placeholder="Confirm New or Current Password" onChange = {(event) => storeInputValue("passwordConfirm", event.target.value)}></input>
        </>
        : 
        <>
        <input autocomplete="new-password" id='updatePassword' className='login-screen-input' type="password" placeholder="New or Current Password" onChange = {(event) => storeInputValue("password", event.target.value)}></input>
        <input autocomplete="new-password" id='confirmUpdatePassword' className='login-screen-input' type="password" placeholder="Confirm New or Current Password" onChange = {(event) => storeInputValue("passwordConfirm", event.target.value)}></input>
        </>
        }
        <textarea autocomplete="new-password" id='updateBio' className='updateaccount-screen-bioinput' type="text" placeholder={currentUser.bio} onChange = {(event) => storeInputValue("bio", event.target.value)}></textarea>
        <div id="updateAccount-error" visibility="hidden">Error</div>
        <div id='login-button' onClick={submitAccountChange}>Update Account Information</div>
        <div id='cancel-button' onClick={() => props.showUpdateAccountScreen()}>Back</div>
      </div>
    </div>
  )
}

export default UpdateAccountScreen;