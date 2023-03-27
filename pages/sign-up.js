"use client";
import Head from 'next/head';
import React, { useState } from 'react';
import axios from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/router';










function SignUp() {
const router = useRouter();
  
  const [username, setUsername] = useState('');
  const [password, setPassword]= useState('');
  const [email, setEmail] = useState('');
  

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = {
     
  
      username: username,
      password:password,
      email: email,
      
    };
    axios.post('http://localhost:8080/api/user/addUsers', formData)
      .then(response => {
        console.log('User created:', response.data);
        router.push('/sign-in');
        // handle success response here
      })
      .catch(error => {
        
        console.error('Error creating user:', error);
        // handle error response here
      });
      
     
      
      
  };




 
 
         
      
  

  return (
    
    <div className='createactdiv'>
      <Head><title>Sign Up</title></Head>
      <div className='formcreate'>
   
      <form onSubmit={handleSubmit}>
      
    

      <h1 className='createhappy'> Create Acount</h1>

        {/* <div>
        <p className='signinarea'>{formik.errors.name ? formik.errors.name : "Full name"}</p>
        <input className='inputcreate' name='name' type="text" placeholder='Full name' value={name} onChange={(e) => setName(e.target.value)}  {...formik.getFieldProps('name')}/>
       
        </div> */}

        <div>
        
        <input className='inputcreate' type="text" name='username' placeholder='Username' value={username} onChange={(e) => setUsername(e.target.value) } />
        </div>
      
        <div>
     

        <input className='inputcreate'name='password' type="password" placeholder='Password' value={password}  onChange={(e) => setPassword(e.target.value)}   />
        </div>
        
        {/* <div>
        <input className='inputcreat' type="password" placeholder='Re-enter password' value={rePassword} onChange={(e) => setRePassword(e.target.value)} />
        </div> */}

        <div>
        
        <input className='inputcreate' type="email" placeholder='Email' value={email} onChange={(e) => setEmail(e.target.value)}   />
        </div>
      
     
       
      
      <button className='inputcreateact' type="submit">Create User</button>
     
      </form>
  
    
    </div>
    <p>Already have an Account? <Link className='createlinks' href='/sign-in'>🔒Log in</Link></p>
     </div>
  
  );
}
export default SignUp;