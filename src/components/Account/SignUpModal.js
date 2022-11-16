import { React, useState } from 'react';
import './Login.css';
import {gql, useQuery} from '@apollo/client';
import { GET_USER } from '../../graphql/queries/loginScreenUsers';
import {Card, Button,  TextField,Typography} from "@mui/material"

function SignUpModal(props) {
  const bcrypt = require('bcryptjs');
  const saltRounds = bcrypt.genSaltSync(12);
  let validator = require("email-validator");

  const [inputName, updateInputName] = useState(null);
  const [inputUsername, updateInputUsername] = useState(null);
  const [inputEmail, updateInputEmail] = useState(null);
  const [inputPassword, updateInputPassword] = useState(null);
  const [inputPasswordConfirm, updateInputPasswordConfirm] = useState(null);


  //GET_USER QUERY
  const { loading: get_user_loading, error: get_user_error, data: userdata, refetch: refetchUser } = useQuery(GET_USER, {
    variables: { username: inputUsername, email: inputEmail},
  });

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
  }

  const handleSubmitSignUp = async(name, username, email, password, passwordConfirm) => {
      //ENSURE PASSWORDS MATCH
      if(password != passwordConfirm){
        alert("PASSWORDS DO NOT MATCH!");
        return;
      }

      //CHECK FOR DUPLICATE USERNAME/EMAIL
      let user;
      await refetchUser();
      if(userdata){
        if(userdata.getUser){
          user = userdata.getUser;
        }
      }

      if(user){ //user with email/username already exists in DB
        alert("USER ALREADY EXISTS!");
        return;
      }

      //PERFORM EMAIL VERIFICATION
      if(!validator.validate(email)){
        alert("INVALID EMAIL ADDRESS");
        return;
      }

      //HASH PASSWORD
      let hash = bcrypt.hashSync(password, saltRounds);

      if(props.submitSignUp(name, username, email, hash, "")){
        //RESET ALL FIELDS FOR SECURITY
        updateInputName(null);
        updateInputUsername(null);
        updateInputEmail(null);
        updateInputPassword(null);
        updateInputPasswordConfirm(null);
      }
  }

  const cancelSignUp = () => {
      props.toggleSignUpModal(false);
  }

  return (
    <Card className='login-screen-panel login-panel'>
      {/* <Typography> Sign Up</Typography> */}
        <TextField sx={{backgroundColor:"white" ,mb:1}}autocomplete="new-password" id='enterName' className='login-screen-input' type="text"  placeholder="Name" onChange={(event) => storeInputValue("name", event.target.value)}/>
        <TextField sx={{backgroundColor:"white" ,mb:1}}autocomplete="new-password" id='emailEnter' className='login-screen-input' type="text" placeholder="Email" onChange={(event) => storeInputValue("email", event.target.value)}/>
        <TextField sx={{backgroundColor:"white" ,mb:1}}autocomplete="new-password" id='usernameEnter' className='login-screen-input' type="text" placeholder="Username" onChange={(event) => storeInputValue("username", event.target.value)}/>
        <TextField sx={{backgroundColor:"white" ,mb:1}}autocomplete="new-password" id='passwordEnter' className='login-screen-input' type="password" placeholder="Password" onChange={(event) => storeInputValue("password", event.target.value)}/>
        <TextField sx={{backgroundColor:"white" ,mb:1}}autocomplete="new-password" id='passwordConfirmEnter' className='login-screen-input' type="password" placeholder="Confirm Password" onChange={(event) => storeInputValue("passwordConfirm", event.target.value)}/>
        <Button id='login-button' onClick={() => handleSubmitSignUp(inputName, inputUsername, inputEmail, inputPassword, inputPasswordConfirm)}>Sign Up</Button>
        <Button id='cancel-button' onClick={cancelSignUp}>Cancel Sign Up</Button>
    </Card>
  )
}
//autocomplete="new-password"
export default SignUpModal;