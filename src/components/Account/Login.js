import { React, useState } from 'react';
import './Login.css';
import TAPSLogo from '../../TAPSLogo.PNG';
import SignUpModal from './SignUpModal';

function Login() {

  const[signUpModal, toggleSignUpModal] = useState(false);

  const submitLogin = () => {
    let emailOrUsername = document.getElementById("usernameEnter").value;
    let password = document.getElementById("passwordEnter").value;
    if(!emailOrUsername || !password){
      alert("Please fill out all fields");
    }
    else{
      alert("Email/Username: " + emailOrUsername + ", Password: " + password);
      //login code here (email/username verification, password hash verification)
    }
  }

  const signUp = async() => {
    toggleSignUpModal(true);
  }


  return (
    <div id='login-screen-container'>
      <div className='login-screen-panel TAPSLogo'>
        <img alt="TAPS Logo" id='TAPS-logo-login' src={TAPSLogo}/>
        <div id='taps-slogan'>
          A One Stop Solution To All Your Map Needs
        </div>
      </div>
      {signUpModal ? <SignUpModal toggleSignUpModal = {toggleSignUpModal}/> :
      <div className='login-screen-panel login-panel'>
        <input id='usernameEnter' className='login-screen-input' type="text" placeholder="Email or username"></input>
        <input id='passwordEnter' className='login-screen-input' type="text" placeholder="Password"></input>
        <div id='login-button' onClick={submitLogin}>LOG IN</div>
        <div id='password-reset-button'>Forgot Password?</div>
        <div id='account-reset-label'>Don't have an account?</div>
        <div id='account-reset-button' onClick={signUp}>Sign up</div>
      </div>}
    </div>
  )
}

export default Login;