import React from 'react'
import { auth, provider } from '../config/firebase'
import {useAuthState} from 'react-firebase-hooks/auth'

function SignIn() {
    const signInWithGoogle = () => {
        auth.signInWithPopup(provider)
    }
    return(
        <button onClick={signInWithGoogle}>Sign In</button>
    )

}
function Login() {
    const [user] = useAuthState(auth) 
    console.log(useAuthState(auth));

    function signOut (){
        return(
            <div onClick={() => { auth.signOut() }}>Sign Out</div>
        )
    }
  return (
    <div>
        <h1>Name</h1>
        <div>{user ?<div>hello</div>: <SignIn /> }</div>
    </div>
  )
}

export default Login