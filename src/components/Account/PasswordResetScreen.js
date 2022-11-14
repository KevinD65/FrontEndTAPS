import { React, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery, useMutation } from '@apollo/client';
import { VALIDATE_PWRESET_TOKEN, UPDATE_USER_INFO } from '../../graphql/queries/loginScreenUsers';
import './Login.css';

function PasswordResetScreen(props) {
    const [tokenValidated, validateToken] = useState(false); //causes infinite rerenders
    const [newPasswordInput, changeNewPasswordInput] = useState(null);
    const [newPasswordConfirmInput, changeNewPasswordConfirmInput] = useState(null);
    const navigate = useNavigate();
    const bcrypt = require('bcryptjs');
    const saltRounds = bcrypt.genSaltSync(12);

    //EXTRACT ID AND TOKEN FROM URL
    const URLParams = useParams();
    const id = URLParams.id;
    const token = URLParams.token;

    //IF HACKER KNOWS EMAIL AND REQUESTS PASSWORD RESET, THEY 1.) HAVE TO LOG INTO THE EMAIL AND ACCESS THE LINK OR 2.) HARDCODE THE ROUTE USING THE USER'S ID AND TOKEN, 3.) ALL WITHIN THE EXPIRATION PERIOD
    //ID OF THE USER AND TOKEN MUST BE OBTAINED THRU EMAIL LINK => CAN BE UNDERMINED IF HACKER KNOWS ID AND EMAIL OF USER
    //TOKEN MUST BE DECRYPTED WITH THE CORRECT PW_RESET_HASH WHICH IS GENERATED WHEN A USER REQUESTS A PASSWORD RESET => CAN BE UNDERMINED IF HACKER KNOWS PASSWORD HASH, EXACT DATE & TIME GENERATED, AND STRUCTURE OF THE SECRET KEY; (OR IF HACKER KNOWS PW_RESET_HASH ALREADY)
        //--> THE DECRYPTED TOKEN SHOULD PRODUCE THE CORRECT ID AND EMAIL; OTHERWISE, TOKEN IS INVALID
        //--> IF THE DECRYPTED TOKEN MATCHES, WE HAVE TO 1.) GENERATE A NEW PASSWORD HASH

    const [setNewPassword] = useMutation(UPDATE_USER_INFO);

    /**
     * Query used to validate token using URL parameters. Returns User object if successful; throws an error otherwise
     */
    const { loading: get_validatePWResetToken_loading, error: get_validatePWResetToken_error, data: validatePWResetTokenData } = useQuery(VALIDATE_PWRESET_TOKEN, {
        variables: {id: id, token: token}
    });
    if(get_validatePWResetToken_loading){
        console.log("Verifying token validity...")
    }
    if(get_validatePWResetToken_error){
        validateToken(false);
        alert("Invalid token. Redirecting to TAPS login page.");
    }
    if(validatePWResetTokenData && !tokenValidated){ //validate the token if 
        validateToken(true);
    }

    /**
     * Handles changes to the input boxes
     * 
     * @param {*string} type the field type of this value (either password or passwordConfirm)
     * @param {*string} value the input value
     */
    const handleNewPasswordInput = (type, value) => {
        if(type == "password"){
            changeNewPasswordInput(value);
        }
        else if(type == "passwordConfirm"){
            changeNewPasswordConfirmInput(value);
        }
    }

    /**
     * Async function used to submit a password change. Checks if passwordConfirm is equivalent to the password, hashes the password, and stores it in the User object in the DB
     */
    const submitPasswordChange = async() => {
        if(newPasswordInput == newPasswordConfirmInput){
            let hash = bcrypt.hashSync(newPasswordInput, saltRounds);
            await setNewPassword({
                variables: {
                    id: id,
                    hash: hash, 
                    pwResetHash: ""
                }
            });
        }
        else{
            //error handling
        }
    }

  return (
    <>
    { tokenValidated ? 
    <div className='login-screen-panel login-panel'>
        <input autoComplete="new-password" className='login-screen-input' type="text" placeholder="New password" onChange={(event) => handleNewPasswordInput("password", event.target.value)}></input>
        <input autoComplete="new-password" className='login-screen-input' type="text" placeholder="Confirm new password" onChange={(event) => handleNewPasswordInput("passwordConfirm", event.target.value)}></input>
        <div id='login-button' onClick = {submitPasswordChange}>Change Password</div>
        <div id='cancel-button'>Cancel Change Password</div>
    </div>
  : navigate('/')}</>
  )
}

export default PasswordResetScreen;