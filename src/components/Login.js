import React, { useState, useEffect } from 'react'
import { createUserWithEmailAndPassword, getAuth, deleteUser,signInWithEmailAndPassword} from "firebase/auth";
import { auth} from "../config/firebase";
import { useAuthState } from 'react-firebase-hooks/auth'


function Login() {
    const [username, getUsername] = useState()
    const [password, getPassword] = useState()
    const user = useAuthState(auth)
    console.log(auth?.currentUser?.uid);

    useEffect(() => {
        localStorage.clear()
      
    }, [])

    const deleteUsers = async () => {
        deleteUser(auth.currentUser).then(() => {
            // User deleted.
          }).catch((error) => {
            // An error ocurred
            // ...
          });
    }
    // const ListUsers = async ()=>{
        
    // }
    const  emailSignIn= async ()=>{
        if (auth?.currentUser?.uid !== undefined) {
            try{
                await signInWithEmailAndPassword(auth, `${username}@email.com`, password)
            }catch(err){
                console.error(err);
            }   
        }else{
            try{
                await createUserWithEmailAndPassword(auth, `${username}@email.com`, password)
            }catch(err){
                console.error(err);
            }            
        }

    }

    function ChatRoom(){
            return auth.currentUser &&(
                <div>
                    <a href="/online">go to Game</a>
                    <button onClick={deleteUsers} >SignOut</button>
                </div>
    
            )  

    }




  return (
    <div>
    {auth.currentUser ? <ChatRoom /> : <div>
        <div>
            <h1>Login</h1>
            <div>
                <h2>Play a friend</h2>
                <input placeholder='Username...' id='username' onChange={(e) => {getUsername(e.target.value)}} type="text" />
                <input placeholder='Password...' id='password' onChange={(e) => {getPassword(e.target.value)}} type="password" /> <br />
                <button onClick={emailSignIn}>Play a Friend</button>
            </div>                
        </div>
    </div>   }

    </div>

  )
}

export default Login