import { React, useState } from 'react';
import './Login.css';

function SignUpModal(props) {
  const bcrypt = require('bcryptjs');
  const saltRounds = bcrypt.genSaltSync(12);

  const [inputName, updateInputName] = useState(null);
  const [inputUsername, updateInputUsername] = useState(null);
  const [inputEmail, updateInputEmail] = useState(null);
  let inputPassword = null;

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
      inputPassword = value;
    }
  }

  const handleSubmitSignUp = async(name, username, email, password) => {
      //CHECK FOR DUPLICATE USERNAME FIRST!!!

      //PERFORM EMAIL VERIFICATION!!!
    
      //HASH PASSWORD
      let hash = bcrypt.hashSync(password, saltRounds);

      //console.log("THIS IS MY HASH: " + hash);
      props.submitSignUp(name, username, email, hash, "");

      //RESET ALL FIELDS FOR SECURITY
      updateInputName(null);
      updateInputUsername(null);
      updateInputEmail(null);
      inputPassword = null;
  }

  const cancelSignUp = () => {
      props.toggleSignUpModal(false);
  }

  return (
    <div className='login-screen-panel login-panel'>
        <input id='enterName' className='login-screen-input' type="text" placeholder="Name" onChange={(event) => storeInputValue("name", event.target.value)}></input>
        <input id='emailEnter' className='login-screen-input' type="text" placeholder="Email" onChange={(event) => storeInputValue("email", event.target.value)}></input>
        <input id='usernameEnter' className='login-screen-input' type="text" placeholder="Username" onChange={(event) => storeInputValue("username", event.target.value)}></input>
        <input id='passwordEnter' className='login-screen-input' type="text" placeholder="Password" onChange={(event) => storeInputValue("password", event.target.value)}></input>
        <div id='login-button' onClick={() => handleSubmitSignUp(inputName, inputUsername, inputEmail, inputPassword)}>Sign Up</div>
        <div id='cancel-button' onClick={cancelSignUp}>Cancel Sign Up</div>
    </div>
  )
}

export default SignUpModal;