"use client";
import Head from 'next/head';
import Link from 'next/link';
import React, { useState, useEffect} from 'react'
// import {HiAtSymbol, HiFingerPrint} from "react-icons/hi"
import {signIn, signOut } from "next-auth/react"
import Donate from './Payment';



// import axios from 'axios';


const SignIn = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [user, setUser] = useState(null);
  
  // Google Handler function
  async function handleGoogleSignin(){
    signIn('google',{callbackUrl:'http://localhost:3000'})
  }
  
    return (
    //     <form onSubmit={handleSubmit}>
    //   <div className='signindiv'>
    //       <Link className='createlinks' to={'/'}>🔙Store</Link>
    //       {user ? (
    //       <div>
    //         <p>Welcome, {user.username}!</p>
    //         <p>Your address is {user.address}.</p>
    //       </div>
    //     ) : (
          <div>
          <h1 className='createhappy'>Sign in to your account</h1>
          <p className='signinarea'>Username</p>
          <input type="text" value={username} onChange={(event) => setUsername(event.target.value)}/><br/>
          <p className='signinarea'>Password</p>
          <input type="password" value={password} onChange={(event) => setPassword(event.target.value)} /><br/>
          
          <button  className='signinarea'  type="submit">Sign in</button><br/>
          <br/>


          <button type="button"onClick={handleGoogleSignin}> Sign in with Google</button><br/>


          <button type="button" > Sign in with Github</button><br/>
          <p>Don't have an account?<Link className='createlinks' href={'/sign-up'}> 🔒Register </Link></p>
          <br/>
          <br/>
          <br/>
        <div>
         <Link href="/calendar">Calendar</Link><br/>
         <Link href="/contacts">Contacts</Link><br/>
         <Link href="/coolness-tracker">Coolness Tracker</Link><br/>
         <Link href="/event-reply">EventReply</Link><br/>
         <Link href="/user-info">My Info</Link><br/>
         
         <Link href="/about">about</Link><br/>
         <Link className='createlinks' href={'/'}>🔙Home</Link><br/>
        
        <Donate/>
        </div>
      </div>
       
          
          
    //   </div>
     // )}
    //   </form>

  
    )
  }
  
  export default SignIn;