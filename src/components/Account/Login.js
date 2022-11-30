import { React, useState } from 'react';

import TAPSLogo from '../../TAPSLogo.PNG';
import SignUpModal from './SignUpModal';
import {Link, useNavigate} from "react-router-dom";
import {gql, useQuery, useMutation} from '@apollo/client';
import { ADD_USER, GET_USER, LOGIN } from '../../graphql/queries/loginScreenUsers';
import PasswordRecoveryModal from './PasswordRecoveryModal';
import {Card,FormControl,Input,InputLabel,Grid, Button, Box,Container, TextField,Divider,Typography} from "@mui/material"

function Login(props) {
  let currentUser = null;
  let attemptUserSignIn = null;
  let validator = require("email-validator");
  const [emailOrUsernameInput, updateEmailOrUsernameInput] = useState(null);
  const [usernameInput, updateUsernameInput] = useState(null);
  const [emailInput, updateEmailInput] = useState(null);
  const [passwordInput, updatePasswordInput] = useState(null);
  const[signUpModal, toggleSignUpModal] = useState(false);
  const[passwordRecoveryModal, togglePasswordRecoveryModal] = useState(false);
  const navigate = useNavigate();

  //GET_USER QUERY
  const { loading: get_user_loading, error: get_user_error, data: userdata, refetch } = useQuery(GET_USER, {
    variables: {username: usernameInput, email: emailInput}
  });
  if(userdata){
    if(userdata.getUser){
      console.log("ATTEMPTED USER SIGN IN");
      attemptUserSignIn = userdata.getUser;
    }
  }

  const [addUser] = useMutation(ADD_USER, refetch);
  const [login] = useMutation(LOGIN);

  //HANDLES SIGN-IN FIELD INPUT
  const handleSignInInput = (type, value) => {
    if(type === "emailOrUsername"){
      updateEmailOrUsernameInput(value); //used for checking fields
      if(validator.validate(value)){ //checks whether an email or username is inputed
        updateEmailInput(value);
      }
      else{
        updateUsernameInput(value);
      }
    }
    else if(type === "password"){
      updatePasswordInput(value);
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
        if(userdata.getUser){
          console.log("ATTEMPTED USER SIGN IN");
          attemptUserSignIn = userdata.getUser;
        }
      }

      console.log(userdata);

      if(userdata.getUser === undefined || userdata.getUser === null){ //attempted user not in database
        console.log("USER NOT PRESENT IN DB");
        attemptUserSignIn = null;
      }
      else{
        if(bcrypt.compareSync(passwordInput, userdata.getUser.hash)){ //successful hash match
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
        //login(userdata.getUser.id);

        props.authenticateUser(currentUser);
        //console.log("YES " + currentUser.username);
        navigate('/userAsset/' + currentUser.id, {state: {user: currentUser}});
      }
    }
  }

  const sendPasswordRecoveryEmail = () => {
    //SHOW PASSWORD RECOVERY MODAL WHICH ASKS FOR EMAIL
    //VALIDATE EMAIL (VALID AND IN DATABASE)
    //SEND EMAIL WITH LINK TO TAPS PASSWORD RECOVERY SCREEN
    //
  }

  const showSignUp = () => {
    toggleSignUpModal(true);
  }

  //USED TO REGISTER A NEW USER WITH THE DATABASE (ALL PASSWORD ENCRYPTION, EMAIL VERIFICATION, NON-DUPLICATE USERNAME VERIFICATION DONE IN SignUpModal.js)
  const submitSignUp = async(name, username, email, hash, bio) => {
    let newUser = await addUser({
      variables: {
        name: name,
        username : username, 
        email: email,
        hash: hash, 
        bio: bio
      }
    });

    //console.log(newUser.data.createUser);
    currentUser = newUser.data.createUser.username
    props.authenticateUser(currentUser);
    navigate('/userAsset');

    return true;
  }

  return (
    <>
      <Box id='login-screen-container'>
      <Grid  spacing={2} direction="column"
  alignItems="center"
  justifyContent="center"
  style={{ minHeight: '100vh' }}>

      <Grid item  md={6}>
    
  
        <Box   className='login-screen-panel TAPSLogo'>
          <img alt="TAPS Logo" id='TAPS-logo-login' src={TAPSLogo} />
          <Typography id='taps-slogan' variant="body1">
            A one stop solution to all your Map needs
          </Typography>
        </Box>
        </Grid>
        <Grid item  md={6} >
        {signUpModal ? <SignUpModal toggleSignUpModal = {toggleSignUpModal} submitSignUp={submitSignUp} authenticateUser={props.authenticateUser}/> :
        passwordRecoveryModal ? <PasswordRecoveryModal togglePasswordRecoveryModal={togglePasswordRecoveryModal} sendPasswordRecoveryEmail={sendPasswordRecoveryEmail}/> : 
        <Card className='login-screen-panel login-panel'>

{/* <FormControl>
  <InputLabel htmlFor="my-input">Email address</InputLabel>
  <Input id="my-input" aria-describedby="my-helper-text" />
  <FormHelperText id="my-helper-text">We'll never share your email.</FormHelperText>
</FormControl> */}
          {/* <InputLabel htmlFor="usernameEnter">Email address</InputLabel> */}
          {/* <TextField id="outlined-basic" label="Outlined"  /> */}
          <TextField sx={{backgroundColor:"white" ,mb:3}} variant="outlined" autocomplete="new-password" id='usernameEnter' className='login-screen-input' type="text" placeholder="Email or username" onChange={(event) => handleSignInInput("emailOrUsername", event.target.value)}/>
          {/* <InputLabel htmlFor="passwordEnter">Password</InputLabel> */}
          <TextField sx={{backgroundColor:"white" ,mb:3}} variant="outlined" autocomplete="new-password" id='passwordEnter' className='login-screen-input' type="password" placeholder="Password" onChange={(event) => handleSignInInput("password", event.target.value)}/>
          <Button id='login-button' size="large" onClick={submitLogin}>LOG IN</Button>
          <Box id='password-reset-button' onClick={() => togglePasswordRecoveryModal(true)}>Forgot Password?</Box>
          <Divider/>
          <Box id='account-reset-label'>Don't have an account?</Box>
          
          <Box id='account-reset-button' onClick={showSignUp}>Sign up</Box>
        </Card>}
        </Grid>
       </Grid>
      </Box>
    </>
  )
}

export default Login;

