import { React, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import {gql, useQuery} from '@apollo/client';
import { VALIDATE_PWRESET_TOKEN } from '../../graphql/queries/loginScreenUsers';
import './Login.css';
import {Link, useNavigate} from "react-router-dom";


function PasswordResetScreen(props) {
    const [tokenValidated, validateToken] = useState(false);
    const navigate = useNavigate();

    //EXTRACT ID AND TOKEN FROM URL
    
    const URLParams = useParams();
    const id = URLParams.id;
    const token = URLParams.token;

    //IF HACKER KNOWS EMAIL AND REQUESTS PASSWORD RESET, THEY 1.) HAVE TO LOG INTO THE EMAIL AND ACCESS THE LINK OR 2.) HARDCODE THE ROUTE USING THE USER'S ID AND TOKEN, 3.) ALL WITHIN THE EXPIRATION PERIOD
    //ID OF THE USER AND TOKEN MUST BE OBTAINED THRU EMAIL LINK => CAN BE UNDERMINED IF HACKER KNOWS ID AND EMAIL OF USER
    //TOKEN MUST BE DECRYPTED WITH THE CORRECT PW_RESET_HASH WHICH IS GENERATED WHEN A USER REQUESTS A PASSWORD RESET => CAN BE UNDERMINED IF HACKER KNOWS PASSWORD HASH, EXACT DATE & TIME GENERATED, AND STRUCTURE OF THE SECRET KEY; (OR IF HACKER KNOWS PW_RESET_HASH ALREADY)
        //--> THE DECRYPTED TOKEN SHOULD PRODUCE THE CORRECT ID AND EMAIL; OTHERWISE, TOKEN IS INVALID
        //--> IF THE DECRYPTED TOKEN MATCHES, WE HAVE TO 1.) GENERATE A NEW PASSWORD HASH

    const { loading: get_validatePWResetToken_loading, error: get_validatePWResetToken_error, data: validatePWResetTokenData } = useQuery(VALIDATE_PWRESET_TOKEN, {
        variables: {id: id, token: token}
    });
    if(get_validatePWResetToken_loading){
        console.log("Verifying token validity...")
    }
    if(get_validatePWResetToken_error){
        alert("Invalid token. Redirecting to TAPS login page.");
    }
    if(validatePWResetTokenData){
        console.log(validatePWResetTokenData);
        console.log("Token is valid!");
        validateToken(true);
    }

  return (
    <>
    { tokenValidated ? 
    <div className='login-screen-panel login-panel'>
        <input autoComplete="new-password" id='emailEnter' className='login-screen-input' type="text" placeholder="Please enter the email address associated with your account"></input>
        <div id='login-button'>Send Recovery Email</div>
        <div id='cancel-button'>Cancel Password Recovery</div>
    </div>
  : navigate('/')}</>
  )
}

export default PasswordResetScreen;