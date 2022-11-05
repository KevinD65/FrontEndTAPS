import { React, useState } from 'react';
import './Login.css';
import TAPSLogo from '../../TAPSLogo.PNG';
import SignUpModal from './SignUpModal';
import {Link, useNavigate} from "react-router-dom";
import {gql, useQuery, useMutation} from '@apollo/client';
import { ADD_USER, GET_USER } from '../../graphql/queries/loginScreenUsers';

function Login() {
  let currentUser = null;
  let attemptUserSignIn = null;
  const [emailOrUsernameInput, updateEmailOrUsernameInput] = useState(null);
  let passwordInput = null;
  //const [passwordInput, updatePasswordInput] = useState(null); //turned into a state to force refetch when password is updated
  const[signUpModal, toggleSignUpModal] = useState(false);
  const navigate = useNavigate();

  //GET_USER QUERY
  const { loading: get_user_loading, error: get_user_error, data: userdata, refetch } = useQuery(GET_USER, {
    variables: {username: emailOrUsernameInput},
  });
  if(userdata){
    if(userdata.getUser[0]){
      console.log("ATTEMPTED USER SIGN IN");
      attemptUserSignIn = userdata.getUser[0];
    }
  }

  /*
  const refetchUser = {
    refetchQueries: [
      {
        query: GET_USER,
        variables: {username: emailOrUsernameInput}
      }
    ]
  }*/

  const [addUser] = useMutation(ADD_USER, refetch);

  //HANDLES SIGN-IN FIELD INPUT
  const handleSignInInput = (type, value) => {
    if(type === "emailOrUsername"){
      updateEmailOrUsernameInput(value);
    }
    else if(type === "password"){
      passwordInput = value; //purposely not used state variable so value is not preserved upon refresh for security
    }
  }

  //VERIFIES PASSWORD USING HASH AND SIGNS IN USER IF VERIFIED
  const submitLogin = async() => {
    if(!emailOrUsernameInput || !passwordInput){
      alert("Please fill out all fields");
    }
    else{
      const bcrypt = require('bcryptjs');

      await refetch();
      if(userdata){
        if(userdata.getUser[0]){
          console.log("ATTEMPTED USER SIGN IN");
          attemptUserSignIn = userdata.getUser[0];
        }
      }

      if(userdata.getUser[0] === undefined){ //attempted user not in database
        console.log("USER NOT PRESENT IN DB");
        attemptUserSignIn = null;
      }
      else{
        if(bcrypt.compareSync(passwordInput, userdata.getUser[0].hash)){ //successful hash match
          currentUser = attemptUserSignIn;
          console.log("SUCCESSFUL HASH MATCH");
        }
        else{ //failed hash match
          attemptUserSignIn = null;
          console.log("FAILED HASH MATCH");
        }
      }
      
      if(attemptUserSignIn == null){
        alert("Incorrect username. Try again or create a new account.");
      }
      else if(currentUser){ //sucessful sign-in
        //CALL LOGIN RESOLVER FOR ACCESS/REFRESH TOKENS
        //UPDATE USER INFORMATION IN PARENT (App.js) SO THAT USER INFORMATION CAN BE SENT TO OTHER ROUTE COMPONENTS (SEND AN AUTH PROP DOWN FROM App.js)

        console.log("YES " + currentUser.username);
        navigate('/userAsset');
      }
    }

    //get the user based off username
    //generate the hash of the input password
    //compare the hashes for successful login
  }

  const showSignUp = () => {
    toggleSignUpModal(true);
  }

  //USED TO REGISTER A NEW USER WITH THE DATABASE (ALL PASSWORD ENCRYPTION, EMAIL VERIFICATION, NON-DUPLICATE USERNAME VERIFICATION DONE IN SignUpModal.js)
  const submitSignUp = async(name, username, email, hash, bio) => {
    await addUser({
      variables: {
        name: name,
        username : username, 
        email: email,
        hash: hash, 
        bio: bio
      }
    });
  }

  return (
    <>
      <div id='login-screen-container'>
        <div className='login-screen-panel TAPSLogo'>
          <img alt="TAPS Logo" id='TAPS-logo-login' src={TAPSLogo}/>
          <div id='taps-slogan'>
            A One Stop Solution To All Your Map Needs
          </div>
        </div>
        {signUpModal ? <SignUpModal toggleSignUpModal = {toggleSignUpModal} submitSignUp={submitSignUp}/> :
        <div className='login-screen-panel login-panel'>
          <input id='usernameEnter' className='login-screen-input' type="text" placeholder="Email or username" onChange={(event) => handleSignInInput("emailOrUsername", event.target.value)}></input>
          <input id='passwordEnter' className='login-screen-input' type="text" placeholder="Password" onChange={(event) => handleSignInInput("password", event.target.value)}></input>
          <div id='login-button'  onClick={submitLogin}>LOG IN</div>
          <div id='password-reset-button'>Forgot Password?</div>
          <div id='account-reset-label'>Don't have an account?</div>
          <div id='account-reset-button' onClick={showSignUp}>Sign up</div>
        </div>}
      </div>
    </>
  )
}

export default Login;