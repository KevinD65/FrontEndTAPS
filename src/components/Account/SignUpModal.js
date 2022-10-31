import React from 'react';
import './Login.css';

function SignUpModal(props) {

    const submitSignUp = () => {
        //register account code here (email verification, non-duplicate username detection, password encryption)
    }

    const cancelSignUp = () => {
        props.toggleSignUpModal(false);
    }

  return (
    <div className='login-screen-panel login-panel'>
        <input id='emailEnter' className='login-screen-input' type="text" placeholder="Email"></input>
        <input id='usernameEnter' className='login-screen-input' type="text" placeholder="Username"></input>
        <input id='passwordEnter' className='login-screen-input' type="text" placeholder="Password"></input>
        <div id='login-button' onClick={submitSignUp}>Sign Up</div>
        <div id='cancel-button' onClick={cancelSignUp}>Cancel Sign Up</div>
    </div>
  )
}

export default SignUpModal;