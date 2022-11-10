import { React, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import {gql, useQuery} from '@apollo/client';
import { GET_USER, VALIDATE_PWRESET_TOKEN } from '../../graphql/queries/loginScreenUsers';
import './Login.css';


function PasswordResetScreen(props) {
    //const [tokenValidated, setTokenValidated] = useState(false);

    //EXTRACT ID AND TOKEN FROM URL
    
    const URLParams = useParams();
    const id = URLParams.id;
    const token = URLParams.token;

    //IF HACKER KNOWS EMAIL AND REQUESTS PASSWORD RESET, THEY 1.) HAVE TO LOG INTO THE EMAIL AND ACCESS THE LINK OR 2.) HARDCODE THE ROUTE USING THE USER'S ID AND TOKEN, 3.) ALL WITHIN THE EXPIRATION PERIOD
    //ID OF THE USER AND TOKEN MUST BE OBTAINED THRU EMAIL LINK => CAN BE UNDERMINED IF HACKER KNOWS ID AND EMAIL OF USER
    //TOKEN MUST BE DECRYPTED WITH THE CORRECT PW_RESET_HASH WHICH IS GENERATED WHEN A USER REQUESTS A PASSWORD RESET => CAN BE UNDERMINED IF HACKER KNOWS PASSWORD HASH, EXACT DATE & TIME GENERATED, AND STRUCTURE OF THE SECRET KEY; (OR IF HACKER KNOWS PW_RESET_HASH ALREADY)
        //--> THE DECRYPTED TOKEN SHOULD PRODUCE THE CORRECT ID AND EMAIL; OTHERWISE, TOKEN IS INVALID
        //--> IF THE DECRYPTED TOKEN MATCHES, WE HAVE TO 1.) GENERATE A NEW PASSWORD HASH

    
    const { loading: get_user_loading, error: get_user_error, data: userdata, refetch: getUserForValidation } = useQuery(GET_USER, {
        variables: {id: id}
    });

    /*
    const { loading: get_validatePWResetToken_loading, error: get_validatePWResetToken_error, data: validatePWResetTokenData, refetch } = useQuery(VALIDATE_PWRESET_TOKEN, {
        variables: {id: id, token: token}
    });*/

    const validateToken = async() => {

        console.log("Validating token on the front-end...");
        console.log(id);

        let userInDB;
        await getUserForValidation({id: id});
        if(userdata){ //the first time this page renders, this is undefined. The second time, it has data
            if(userdata.getUser){
              userInDB = userdata.getUser;
            }
            console.log("FOUND DATA");

        }
        else{
            console.log("FOUND NOTHING " + userdata);
        }


        /*
        else{
            alert("Invalid access. Returning to home page.");
        }*/

        //attempt to decode the URL token using the found user's pwResetHash
        //refetch();

        return true;
    }

    /*
    useEffect(() => {
        setTokenValidated(validateToken());
        //console.log(isTokenValidated);
    }, []);*/

  return (
    <>
    { validateToken() ? 
    <div className='login-screen-panel login-panel'>
        <input autoComplete="new-password" id='emailEnter' className='login-screen-input' type="text" placeholder="Please enter the email address associated with your account"></input>
        <div id='login-button'>Send Recovery Email</div>
        <div id='cancel-button'>Cancel Password Recovery</div>
    </div>
  : <div>REUSED TOKEN</div>}</>
  )
}

export default PasswordResetScreen;