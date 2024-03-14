import React from 'react'
import { Button } from '@mui/material'
import { auth } from './firebase';
import { provider } from './firebase';
import { signInWithRedirect } from 'firebase/auth';
const Login = () => {
    const signIn =async ()=>{
        try{
            // await auth.signInWithPopup(provider)
            signInWithRedirect(auth, provider);
        }
        catch (error) {
            alert(error.message);
          }    };
  return (
    <div className="login">
             <div className="login_logo">
                 <img
                     src="/assets/discord.png"
                     alt=""/>
             </div>
             <Button onClick={signIn}> Sign In</Button>
    </div >
  )
}

export default Login