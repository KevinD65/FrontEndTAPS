import { React, useState } from 'react';
import './Login.css';
import {gql, useQuery} from '@apollo/client';
import { GET_USER } from '../../graphql/queries/loginScreenUsers';

function PasswordRecoveryModal(props) {
  let validator = require("email-validator");
  const [inputEmail, updateInputEmail] = useState(null);
  const [userWithThisEmail, updateUserWithThisEmail] = useState(null);

//GET_USER QUERY
const { loading: get_user_loading, error: get_user_error, data: userdata, refetch: locateUserInDB } = useQuery(GET_USER, {
    variables: {email: inputEmail}
    });

  const handleSubmitPasswordRecovery = async(email) => {
    if(validator.validate(email)){
        locateUserInDB({email: email}); //refetch user 
        if(userdata){
            if(userdata.getUser[0]){ //found user with the email address entered
                //send password recovery email with one time use link
                console.log(userdata.getUser[0]);

                return;
            }
        }
    }
    alert("The email address you entered is invalid. Please enter a valid email address associated with your account");
  }

  const cancelPasswordRecovery = () => {
      props.togglePasswordRecoveryModal(false);
  }

  return (
    <div className='login-screen-panel login-panel'>
        <input autocomplete="new-password" id='emailEnter' className='login-screen-input' type="text" placeholder="Please enter the email address associated with your account" onChange={(event) => updateInputEmail(event.target.value)}></input>
        <div id='login-button' onClick={() => handleSubmitPasswordRecovery(inputEmail)}>Send Recovery Email</div>
        <div id='cancel-button' onClick={cancelPasswordRecovery}>Cancel Password Recovery</div>
    </div>
  )
}

export default PasswordRecoveryModal;