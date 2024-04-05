import { useState } from 'react'
import {auth, authWithGoogle} from '../config/firebase'
import {createUserWithEmailAndPassword, signInWithPopup, signOut} from 'firebase/auth'


const Auth = () =>{

    const [email, setEmail] = useState("")
    const [password, settPassword] = useState("")
    

    // by the auth we can get the info of the logged in users
    // console.log(auth?.currentUser?.email)


    const signIn = async () =>{
        
        try {await createUserWithEmailAndPassword(
            auth,
            email,
            password
        )} catch (err){
            console.error(err)
        }
    }

    const signInGoogle = async () =>{
        try{await signInWithPopup(
            auth,
            authWithGoogle
        )} catch (err) {
            console.error(err)
        }
    }

    const logout = async () =>{
        try {
            await signOut(auth)
        } catch (error) {
            console.error(error)
        }
    }



    return (
        <div>
            <input type='email' 
            placeholder="Email"
            value={email}
            onChange={(event)=>{setEmail(event.target.value)}} />
            
            <input type='password' 
            placeholder="Password"
            value={password}
            onChange={(event)=>{settPassword(event.target.value)}}/>

            <button onClick={signIn}>Sign In</button>
            <button onClick={signInGoogle}>Sign In into google</button>

            <button onClick={logout}>LogOut</button>
        </div>
    )
}

export default Auth;