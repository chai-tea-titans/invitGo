"use client";
import Head from 'next/head';
import Link from 'next/link';
import React, { useState, useEffect} from 'react'
// import {HiAtSymbol, HiFingerPrint} from "react-icons/hi"
import {signIn, signOut } from "next-auth/react"

import {useFormik} from 'formik';
import login_validate from '../library/validate';



// import axios from 'axios';


const SignIn = () => {

  
    


    const formik = useFormik({
      initialValues:{
        username:'',
        password:''
      },
      validate:login_validate,
      onSubmit
    })
   

    async function onSubmit(values){
      console.log(values)
    }
  
  // Google Handler function
  async function handleGoogleSignin(){
    signIn('google',{callbackUrl:'http://localhost:3000'})
  }
  
    return (

        
    
          <div className='sign-inpage'>
           <Head> <title>Sign In</title></Head>
         
      <h1 className='mainpagearea'>Plan, Budget, Share with your friends</h1>
  
           
            <div className='sign-inarea'>
            <form onSubmit={formik.handleSubmit}>
          <h1 className='createhappy'>Sign in to your account</h1>


          <p className='signinarea'>{formik.errors.username ? formik.errors.username : "Username"}</p>

          <input type="text" name='username' placeholder='@username' value={formik.values.username} onChange={formik.handleChange}/><br/>


  
          <p className='signinarea'>{formik.errors.password ? formik.errors.password : "Password"}</p>
        
          <input type="password" name='password' placeholder='password' value={formik.values.password} onChange={formik.handleChange} /><br/>
          
          <button  className='signinarea'  type="submit">Sign in</button><br/>
          <br/>


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