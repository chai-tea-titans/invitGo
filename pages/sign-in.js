"use client";
// import Head from 'next/head';
import Link from 'next/link';
import React, { useState, useEffect} from 'react'
// import {HiAtSymbol, HiFingerPrint} from "react-icons/hi"
import {signIn } from "next-auth/react"
// import Cookies from 'js-cookie';
import { useRouter } from 'next/router';


// import axios from 'axios';



const SignIn = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleSubmit = async (event) => {
    event.preventDefault();

    const result = await signIn('credentials', {
      redirect: false,
      username,
      password,
    });

    if (result.error) {
      console.error(result.error);
    } else {
      // Redirect to home page or wherever you want to go after successful sign-in
      router.push('/');
    }
  };



    
   

   
  
  // Google Handler function
  async function handleGoogleSignin(){
    signIn('google',{callbackUrl:'http://localhost:3000'})
  }
  
    return (
        
    
          <div>
           <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="username">Username:</label>
        <input type="text" id="username" value={username} onChange={(e) => setUsername(e.target.value)} />
      </div>
      <div>
        <label htmlFor="password">Password:</label>
        <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      </div>
      <button type="submit">Sign In</button>
    </form>
        <div>
          
        <button type="button"onClick={handleGoogleSignin}> Sign in with Google</button><br/>

{/* 
<button type="button" > Sign in with Github</button><br/> */}
<p>Don't have an account?<Link className='createlinks' href={'/sign-up'}> 🔒Register </Link></p>
        
      <div class="dropdown">
   <button class="dropbtn">Menu</button>
    <div class="dropdown-content">
         <div className='dropdownlinksdiv'><Link className='dropdownlinks' href="/about">bout</Link></div>

         <div className='dropdownlinksdiv'><Link className='dropdownlinks' href="/calendar">Calendar</Link></div>
         
         <div className='dropdownlinksdiv'><Link className='dropdownlinks' href="/contacts">Contacts</Link></div>

         <div className='dropdownlinksdiv'><Link className='dropdownlinks' href="/coolness-tracker">Coolness Tracker</Link></div>

         <div className='dropdownlinksdiv'> <Link className='dropdownlinks' href="/Video">Video</Link></div>

         {/* TEMPORARY LINK FOR VIDEO */}
         <div className='dropdownlinksdiv'><Link className='dropdownlinks' href="/event-reply">Event Reply</Link></div>

      
         <div className='dropdownlinksdiv'><Link className='dropdownlinks' href="/user-info">Profile</Link></div>

         
         
         </div>
    </div>
        </div>
      </div>
       
          
          
  
      

  
    )
  }
  
  export default SignIn;