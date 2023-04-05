import { Auth } from '@supabase/auth-ui-react'
import { ThemeSupa } from '@supabase/auth-ui-shared'
import { useSession, useSupabaseClient } from '@supabase/auth-helpers-react'
import Video from "../pages/Video";
import Head from 'next/head'
import Link from 'next/link'




const Home = () => {
  const session = useSession()
  const supabase = useSupabaseClient()

  return (
    <div className="container" >
      {!session ? (
        <Auth supabaseClient={supabase} appearance={{ theme: ThemeSupa }} theme="dark" />
      ) : (
       
         <main className='homepageimg'>
             <div className='navbardesk navbarmobile'>
            <Link className='Logo' href="/">InviteGo</Link>
           
          
           <div className="dropdown">
           
         <button className="dropbtn">Menu</button>
        <div className="dropdown-content">
             <div className='dropdownlinksdiv'><Link className='dropdownlinks' href="/about">Account</Link></div>
        
              <div className='dropdownlinksdiv'><Link className='dropdownlinks' href="/calendar">Calendar</Link></div>
               
               
        
                
        
               <div className='dropdownlinksdiv'> <Link className='dropdownlinks' href="/Video">Video</Link></div>
        
              
                <div className='dropdownlinksdiv'><Link className='dropdownlinks' href="/event-reply">Event Reply</Link></div>
        
            
     

               
        
              
                
        
               </div>
               <Video />
           </div>
           
         
        
        
        
              
        
              
               
          
            
           </div>
          
            
          </main>
      )}
      <footer>
      
      </footer>
    </div>
  )
}

export default Home







// "use client";





// export default function Home() {
//   const {data:session} = useSession()

//   function handleSignOut(){
//     signOut()
//   }
//   return (
//       <div >
//        <Head><title>Home</title></Head>
       

       

//         {session ? AuthorizedUser({session, handleSignOut}) :Guest()}

//       </div>
      
   
//   )
// }
//  // Guest
//  const Guest= ()=>{
//   return(
//     <main>
//       <h1>Guest Page</h1>
//       <Link href="/sign-in">Sign in</Link><br/>
//     </main>
//   )
//  }
 
//  //Authorized User
//  const AuthorizedUser = ({session, handleSignOut})=>{
//   return(
//     <main className='homepageimg'>
//     <div className='navbardesk navbarmobile'>
//     <Link className='Logo' href="/">InviteGo</Link>
  
//     <div className="dropdown">
//  <button className="dropbtn">Menu</button>
//   <div className="dropdown-content">
//        <div className='dropdownlinksdiv'><Link className='dropdownlinks' href="/about">About</Link></div>

//        <div className='dropdownlinksdiv'><Link className='dropdownlinks' href="/calendar">Calendar</Link></div>
       
//        <div className='dropdownlinksdiv'><Link className='dropdownlinks' href="/contacts">Contacts</Link></div>

//        <div className='dropdownlinksdiv'><Link className='dropdownlinks' href="/coolness-tracker">Coolness Tracker</Link></div>

//        <div className='dropdownlinksdiv'> <Link className='dropdownlinks' href="/Video">Video</Link></div>

//        {/* TEMPORARY LINK FOR VIDEO */}
//        <div className='dropdownlinksdiv'><Link className='dropdownlinks' href="/event-reply">Event Reply</Link></div>

    
//        <div className='dropdownlinksdiv'><Link className='dropdownlinks' href="/user-info">Profile</Link></div>

//        <div className='dropdownlinksdiv'><a className='dropdownlinks' onClick={handleSignOut}>Sign Out</a></div>
        

//        </div>
//   </div>
//   <h3>Welcome {session.user.name} </h3>
//   <NoticeCenter />



      

      
       
  
    
//   </div>
  
//       <Squearepayment/>
//   </main>
//   )
//  }

//  export async function getServerSideProps ({req}) {
// const session = await getSession({req})

// if(!session){
//   return {
//     redirect: {
//       permanent:false,
//       destination:'/sign-in',
      
//     },
//   }
// }

// return{
//   props:{session}
// }
//  }
