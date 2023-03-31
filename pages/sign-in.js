"use client";
import Head from 'next/head';
import Link from 'next/link';
import React, { useState} from 'react'
// import {HiAtSymbol, HiFingerPrint} from "react-icons/hi"
import {signIn, signOut } from "next-auth/react"
import Cookies from 'js-cookie';
import axios from 'axios';
import Image from 'next/image'; // Import image component from next/image



const SignIn = () => {
  
 
  // Google Handler function
  async function handleGoogleSignin(){
    signIn('google',{callbackUrl:'https://invitegotea.vercel.app'})
  }
  
    return (
<div>
        <button type="button"onClick={handleGoogleSignin}> Google Sign in</button><br/>
      </div>
  );
  }
  
  export default SignIn;