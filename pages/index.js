"use client";

import Head from 'next/head'

import Link from 'next/link'
import { useState } from 'react'
import { getSession, useSession, signOut } from "next-auth/react"






export default function Home() {
  const {data:session} = useSession()

  function handleSignOut(){
    signOut()
  }
  return (
      <div >
       <Head><title>InviteGo</title></Head>
        <div>
          <Link className='Logo' href="/">InviteGo</Link>
        </div>

       

        {session ? AuthorizedUser({session, handleSignOut}) :Guest()}

      </div>
      
   
  )
}
 // Guest
 const Guest= ()=>{
  return(
    <main>
      <h1>Guest Page</h1>
      <Link href="/sign-in">Sign in</Link><br/>
    </main>
  )
 }
 
 //Authorized User
 const AuthorizedUser = ({session, handleSignOut})=>{
  return(
    <main>
      <h3>Welcome {session.user.name} </h3>
      
    
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

         <div className='dropdownlinksdiv'><a className='dropdownlinks' onClick={handleSignOut}>Sign Out</a></div>
         
         </div>
    </div>
  
      
        

        
         
    
      

    </main>
  )
 }

 export async function getServerSideProps ({req}) {
const session = await getSession({req})

if(!session){
  return {
    redirect: {
      permanent:false,
      destination:'/sign-in',
      
    },
  }
}

return{
  props:{session}
}
 }