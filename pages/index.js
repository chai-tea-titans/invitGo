"use client";

import Head from 'next/head'

import Link from 'next/link'
import { useState, useEffect  } from 'react'
import { getSession, useSession, signOut } from "next-auth/react"

import NoticeCenter from './NoticeCenter';
import Payment from './Payment';



export default function Home() {
  const {data:session} = useSession()

  function handleSignOut(){
    signOut()
  }
  return (
      <div >
       <Head><title>Home</title></Head>
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
 const AuthorizedUser = ({session, handleSignOut })=>{
  const { data: usersession } = useSession();
  const [authUrl, setAuthUrl] = useState("");

  useEffect(() => {
    async function fetchAuthUrl() {
      const res = await fetch("/api/oauth2");
      const data = await res.json();
      setAuthUrl(data.authUrl);
    }

    fetchAuthUrl();
  }, []);
  return(
    <main>
      <h3>Welcome {usersession.user.name} </h3>
      
      <h5>{usersession.user.email}</h5>
         <button onClick={handleSignOut}>Sign Out</button><br/>
         <Link href="/about">About</Link><br/>
         <Link href="/calendar">Calendar</Link><br/>
         <Link href="/contacts">Contacts</Link><br/>
         <Link href="/coolness-tracker">Coolness Tracker</Link><br/>
         <Link href="/event-reply">EventReply</Link><br/>

         <Link href="/Video">Video</Link><br/>
         {/* TEMPORARY LINK FOR VIDEO */}
         
         <Link href="/user-info">My Info</Link><br/>
         <Payment />
         <NoticeCenter /> 
         <br />
      <a href={authUrl}>
        <button>Log in with Gmail</button>
      </a>

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