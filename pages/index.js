"use client";

import Head from 'next/head'

import Link from 'next/link'
// import { useState } from 'react'
import { getSession, useSession, signOut } from "next-auth/react"
import NoticeCenter from './NoticeCenter';



export default function Home() {
  const {data:session} = useSession()

  function handleSignOut(){
    signOut()
  }
  return (
      <div >
       <Head><title>Home</title></Head>
       

       

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
    <main className='homepageimg'>
    <div className='navbardesk navbarmobile'>
    <Link className='Logo' href="/">InviteGo</Link>
  
    <div className="dropdown">
 <button className="dropbtn">Menu</button>
  <div className="dropdown-content">
       <div className='dropdownlinksdiv'><Link className='dropdownlinks' href="/about">About</Link></div>

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
  <h3>Welcome {session.user.name} </h3>
  <NoticeCenter />



      

      
       
  
    
  </div>
  <img src='https://images.ctfassets.net/1nw4q0oohfju/5KX62i9wOsL9uVRzULSgeT/c8da4a544f6a553e6bd352e3110301f5/cash-app-pay-button.png'/>
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