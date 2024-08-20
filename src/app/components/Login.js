import React from 'react'
import { Button } from '@mui/material'
import { provider } from './firebase';
import { auth } from './firebase';
// import { signInWithRedirect } from "firebase/auth";
import { signInWithPopup } from "firebase/auth";

const Login = () => {
    const signIn =async ()=>{
        // try{
        //     // await auth.signInWithPopup(provider)
        //     signInWithRedirect(auth, provider);
        // }
        // catch (error) {
        //     alert(e rror.message);
        //   } 
        signInWithPopup(auth, provider)
  .then((result) => {
    // This gives you a Google Access Token. You can use it to access the Google API.
    const credential = GoogleAuthProvider.credentialFromResult(result);
    const token = credential.accessToken;
    // The signed-in user info.
    const user = result.user;
    // IdP data available using getAdditionalUserInfo(result)
    // ...
  }).catch((error) => {
    // Handle Errors here.
    const errorCode = error.code;
    const errorMessage = error.message;
    // The email of the user's account used.
    // const email = error.customData.email;
    // The AuthCredential type that was used.
    // const credential = provider.credentialFromError(error);
    // ...
  });
 
         };
  return (
    <div className="login flex flex-col items-center justify-center gap-24">
             <div className="login_logo">
                 <img
                     src="/assets/logo1.png"
                     alt=""/>
             </div>
             <Button onClick={signIn}> Sign In</Button>
    </div >
  )
}

export default Login