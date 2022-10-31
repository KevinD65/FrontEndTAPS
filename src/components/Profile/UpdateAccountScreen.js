import { React, useState } from 'react';
import TAPSLogo from '../../TAPSLogo.PNG';
import '../Account/Login.css';
import './UserProfile.css';

function UpdateAccountScreen(props) {
    let currentUser = props.currentUser;

    //props contains current User object

    const submitAccountChange = async() => {
        //confirmation modal
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
        <input id='updateEmail' className='login-screen-input' type="text" placeholder="kevin.duong@stonybrook.edu"></input>
        <input id='updateUsername' className='login-screen-input' type="text" placeholder="ContainerGamer52"></input>
        <input id='updatePassword' className='login-screen-input' type="text" placeholder="**********"></input>
        <input id='updateBio' className='updateaccount-screen-bioinput' type="text" placeholder="Yeah that's right, this is my biography and here are all my assets."></input>
        <div id='login-button' onClick={submitAccountChange}>Update Account Information</div>
        <div id='cancel-button' onClick={() => props.showUpdateAccountScreen()}>Cancel Changes</div>
      </div>
    </div>
  )
}

export default UpdateAccountScreen;