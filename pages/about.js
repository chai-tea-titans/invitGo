import React from 'react'
import Account from '../component/Account'
import { Auth } from '@supabase/auth-ui-react'
import { ThemeSupa } from '@supabase/auth-ui-shared'
import { useSession, useSupabaseClient } from '@supabase/auth-helpers-react'
import Link from 'next/link'

const About = () => {
  const session = useSession()
  const supabase = useSupabaseClient()

  return (
    <div className="container" >
      {!session ? (
        <Auth supabaseClient={supabase} appearance={{ theme: ThemeSupa }} theme="dark" />
      ) : (
        <Account session={session} />
        
      )}
      <footer className="footer">
      <Link className='Logo' href="/about">👤</Link>
      <Link className='Logo' href="/">Go</Link>
      <Link className='Logo' href="/calendar">📅</Link>
      </footer>
    </div>
  )
}
export default About

