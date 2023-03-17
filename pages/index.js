"use client";

import Head from 'next/head'

import Link from 'next/link'
import { useState } from 'react'
import { useSession } from "next-auth/react"
import Donate from './Donate';





export default function Home() {
  const {data:session} = useSession
  return (
      <div >
       <Head><title>Home</title></Head>
        <div>
          <Link className='Logo' href="/">InviteGo</Link>
        </div>

        <div>
         <Link href="/calendar">Calendar</Link><br/>
         <Link href="/contacts">Contacts</Link><br/>
         <Link href="/coolness-tracker">Coolness Tracker</Link><br/>
         <Link href="/event-reply">EventReply</Link><br/>
         <Link href="/Main-event">My Social Media</Link><br/>
         <Link href="/user-info">My Info</Link><br/>
         <Link href="/sign-up">Sign up</Link><br/>
         <Link href="/about">about</Link><br/>
         <Link href="/sign-in">Sign in</Link><br/>
        <Donate/>
        </div>

        {session ? AuthorizedUser({session}) :Guest()}

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
 const AuthorizedUser = ({session})=>{
  return(
    <main>
      <h1>Authorized User Homepage</h1>
      <h5>session.user.name</h5>
      <h5>session.user.email</h5>
         <button>Sign Out</button>
         <Link href="/about">about</Link><br/>
         <Link href="/calendar">Calendar</Link><br/>
         <Link href="/contacts">Contacts</Link><br/>
         <Link href="/coolness-tracker">Coolness Tracker</Link><br/>
         <Link href="/event-reply">EventReply</Link><br/>
         <Link href="/Main-event">My Social Media</Link><br/>
         <Link href="/user-info">My Info</Link><br/>

    </main>
  )
 }