"use client";
import Head from 'next/head';
import React, { useState } from 'react';
// import axios from 'axios';
import Link from 'next/link';
import {useFormik} from 'formik';
import { resgisterValidate } from '../library/validate';
import RegisterSubmit from '../library/register';





function SignUp() {


  const formik = useFormik({
    initialValues:{
      username:'',
      name:'',
      password:'',
      email:''

    },
    validate:resgisterValidate,
    onSubmit
  })

  async function onSubmit(values){
    console.log(values)
  }
  
  


        
         
      
  

  return (
    
    <div className='createactdiv'>
      <Head><title>Sign Up</title></Head>
      <div className='formcreate'>
    <form  onSubmit={formik.handleSubmit}>
      
    

      <h1 className='createhappy'> Create Acount</h1>

        <div>
        <p className='signinarea'>{formik.errors.name ? formik.errors.name : "Full name"}</p>
        <input className='inputcreate' name='name' type="text" placeholder='Full name'  {...formik.getFieldProps('name')} />
        </div>

        <div>
        <p className='signinarea'>{formik.errors.username ? formik.errors.username : "Username"}</p>
        <input className='inputcreate' type="text" name='username' placeholder='Username'  {...formik.getFieldProps('username')} />
        </div>
      
        <div>
        <p className='signinarea'>{formik.errors.password ? formik.errors.password : "Password "}</p>
        <input className='inputcreate'name='password' type="password" placeholder='Password'  {...formik.getFieldProps('password')} />
        </div>
        
        {/* <div>
        <input className='inputcreat' type="password" placeholder='Re-enter password' value={rePassword} onChange={(e) => setRePassword(e.target.value)} />
        </div> */}

        <div>
        <p className='signinarea'>{formik.errors.email ? formik.errors.email : " Email"}</p>
        <input className='inputcreate' type="email" placeholder='Email'  {...formik.getFieldProps('email')} />
        </div>
      
     
       
      
      <button className='inputcreateact' type="submit">Create User</button>
     
     
    </form>
    
    </div>
    <p>Already have an Account? <Link className='createlinks' href='/sign-in'>🔒Log in</Link></p>
     </div>
  
  );
}
export default SignUp;