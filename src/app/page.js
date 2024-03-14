'use client'
import Chat from "./components/Chat"
import Sidebar from "./components/Sidebar"
import Login from "./components/Login";
import { auth } from "./components/firebase";
import { useAppSelector } from "../../lib/hooks";
import { useAppDispatch } from "../../lib/hooks";
import { login,logout } from "../../lib/features/user/userSlice";
import { useEffect } from "react";
const index = () => {
  const user =useAppSelector(state=>state.user.user);
  const dispatch = useAppDispatch()
    useEffect(() => {
      auth.onAuthStateChanged((authuser)=>{
        console.log(authuser)
        if(authuser){
          //the user is looged in
          dispatch(login({
            uid:authuser.uid,
            photo:authuser.photoURL,
            email:authuser.email,
            displayName:authuser.displayName,
          }));
        }
        else{
          //the user is logged out
          dispatch(logout());
        }
      })   
    }, [dispatch])
    

  return (
    <div className="app ">
      {user?(<>
        <Sidebar/>
        <Chat/>
        </>):<Login/> }
    </div>
  )
}

export default index
