"use client";
// import Head from 'next/head';
import Link from 'next/link';
import React, { useState} from 'react'
// import {HiAtSymbol, HiFingerPrint} from "react-icons/hi"
import {signIn, signOut } from "next-auth/react"
import Cookies from 'js-cookie';
import axios from 'axios';


const SignIn = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [user, setUser] = useState(null);
  const [profileError, setProfileError] = useState(null);
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/users/login', { username, password });
      const token = response.data.token;
      Cookies.set('accessToken', token);
      console.log(token);
    } catch (error) {
      setErrorMessage(error.response.data.error);
    }

    const getUserInformation = async () => {
      try {
        const response = await axios.get('/api/users/profile', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('accessToken')}`
          }
        });
    
        // Return the user information from the response data
        return response.data;
      } catch (error) {
        console.error(error);
        setProfileError(error.message);
      }
    };

    
  };
  
    


    
   

   
  
  // Google Handler function
  async function handleGoogleSignin(){
    signIn('google',{callbackUrl:'http://localhost:3000'})
  }
  
    return (

        
    
          <div className='sign-inpage'>
           <Head> <title>Sign In</title></Head>
         
      <h1 className='mainpagearea'>Plan, Budget, Share with your friends</h1>
  
           
            <div className='sign-inarea'>
            <form onSubmit={handleSubmit}>
    <div className='signindiv'>
       
      
        <div>
        <h1 className='createhappy'>Sign in to your account</h1>
        <p className='signinarea'>Username</p>
        <input type="text" value={username} onChange={(event) => setUsername(event.target.value)}/><br/>
        <p className='signinarea'>Password</p>
        <input type="password" value={password} onChange={(event) => setPassword(event.target.value)} /><br/>
        <button  className='signinarea'  type="submit">Sign in</button>
       
        {errorMessage && <div>{errorMessage}</div>}
        {profileError && <div>{profileError}</div>}
    </div>
      
        
        
    </div>
    </form>
        <div>
          
        <button type="button"onClick={handleGoogleSignin}> <img className='GoogleSignIn' src='https://www.sociomark.in/assets/img/button/signin_google_logo.png'/></button><br/>



<p>Don't have an account? <Link className='createlinks' href={'/sign-up'}> 🔒Register </Link></p>

{/* <br/>
<br/>
<br/>
         <Link href="/calendar">Calendar</Link><br/>
         <Link href="/contacts">Contacts</Link><br/>
         <Link href="/coolness-tracker">Coolness Tracker</Link><br/>
         <Link href="/event-reply">EventReply</Link><br/>
         <Link href="/user-info">My Info</Link><br/>
         
         <Link href="/about">about</Link><br/>
         <Link className='createlinks' href={'/'}>🔙Home</Link><br/>
         <Link href="/NoticeCenter">Center</Link><br/>
     */}
        </div>
        
        </div>
        
      </div>
       
          
          
  
      
  
      

  
    )
  }
  
  export default SignIn;