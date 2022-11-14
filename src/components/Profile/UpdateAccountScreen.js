import { React, useState } from 'react';
import TAPSLogo from '../../TAPSLogo.PNG';
import '../Account/Login.css';
import './UserProfile.css';

function UpdateAccountScreen(props) {
    const [currentUser, changeCurrentUser] = useState(props.currentUser);
    const [name, updateInputName] = useState(currentUser.name);
    const [username, updateInputUsername] = useState(currentUser.username);
    const [email, updateInputEmail] = useState(currentUser.email);
    const [password, updateInputPassword] = useState(null);
    const [passwordConfirm, updateInputPasswordConfirm] = useState(null);
    const [bio, updateInputBio] = useState(currentUser.bio);
    const [showError, toggleShowError] = useState(false);
    const [showSuccess, toggleShowSuccess] = useState(false);

    const bcrypt = require('bcryptjs');
    const saltRounds = bcrypt.genSaltSync(12);

    const storeInputValue = async(field, value) => {
      toggleShowError(false);
      if(field == "name"){
        if(value == ""){
          updateInputName(currentUser.name)
        }
        updateInputName(value);
      }
      else if(field == "email"){
        if(value == ""){
          updateInputEmail(currentUser.name)
        }
        updateInputEmail(value);
      }
      else if(field == "username"){
        if(value == ""){
          updateInputUsername(currentUser.name)
        }
        updateInputUsername(value);
      }
      else if(field == "password"){
        if(value == ""){
          updateInputPassword(currentUser.name)
        }
        updateInputPassword(value);
      }
      else if(field == "passwordConfirm"){
        if(value == ""){
          updateInputPasswordConfirm(currentUser.name)
        }
        updateInputPasswordConfirm(value);
      }
      else if(field == "bio"){
        if(value == ""){
          updateInputBio(currentUser.name)
        }
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

        await props.updateAccount(currentUser.id, name, username, email, hash, bio);
        toggleShowSuccess(true);

        /*
        updateInputName(name);
        updateInputEmail(username);
        updateInputUsername(email);
        updateInputPassword(null);
        updateInputPasswordConfirm(null);
        updateInputBio(bio);*/
      }
      else{
        toggleShowError(true);
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
        <input autocomplete="new-password" id='updateName' className='login-screen-input' type="text" placeholder={"Name: " + currentUser.name} onChange = {(event) => storeInputValue("name", event.target.value)}></input>
        <input autocomplete="new-password" id='updateUsername' className='login-screen-input' type="text" placeholder={"Username: " + currentUser.username} onChange = {(event) => storeInputValue("username", event.target.value)}></input>
        <input autocomplete="new-password" id='updateEmail' className='login-screen-input' type="text" placeholder={"Email: " + currentUser.email} onChange = {(event) => storeInputValue("email", event.target.value)}></input>
        { !showError ?
        <>
        <input autocomplete="new-password" id='updatePassword' className='login-screen-input' type="password" placeholder="New or Current Password" onChange = {(event) => storeInputValue("password", event.target.value)}></input>
        <input autocomplete="new-password" id='confirmUpdatePassword' className='login-screen-input' type="password" placeholder="Confirm New or Current Password" onChange = {(event) => storeInputValue("passwordConfirm", event.target.value)}></input>
        </>
        : 
        <>
        <input autocomplete="new-password" id='updatePassword-error' className='login-screen-input' type="password" placeholder="New or Current Password" onChange = {(event) => storeInputValue("password", event.target.value)}></input>
        <input autocomplete="new-password" id='updatePassword-error' className='login-screen-input' type="password" placeholder="Confirm New or Current Password" onChange = {(event) => storeInputValue("passwordConfirm", event.target.value)}></input>
        </>
        }
        <textarea autocomplete="new-password" id='updateBio' className='updateaccount-screen-bioinput' type="text" placeholder={"Biography: " + currentUser.bio} onChange = {(event) => storeInputValue("bio", event.target.value)}></textarea>
        { showError ? <div className="on-screen-message-negative">Please make sure the following fields are filled out and match</div>: <></>}
        { showSuccess ? <div className="on-screen-message-positive">Account successfully updated!</div>: <></>}
        <div id='login-button' onClick={submitAccountChange}>Update Account Information</div>
        <div id='cancel-button' onClick={() => props.showUpdateAccountScreen()}>Back</div>
      </div>
    </div>
  )
}

export default UpdateAccountScreen;