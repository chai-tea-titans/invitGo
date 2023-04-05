import React from 'react'
import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabaseClient';
import {v4 as uuidv4} from 'uuid'
import { useRouter } from 'next/router';
import Link from 'next/link';
import { useSession} from "@supabase/auth-helpers-react";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";


const Videos = () => {
  const session = useSession();
 const [video, setVideo]=useState([])
 const [post, setPost]=useState('')
 const router=useRouter();

async function getVideo() {
  const {data, error} =await supabase
  .storage
  .from('publicpost')
  .list('')


  if(data !== null){
    setVideo(data);
  }
 
}

  useEffect(() =>{
    getVideo()
    
  }, []);

    async function uploadFile(e){

      if(post.length > 0 ){

      const videoFile= e.target.files[0];
        console.log("upload");
        const { error } = await supabase.storage
        .from('publicpost')
        .upload(post, videoFile);
        router.reload()


      }
      if(post.length === 0){
        alert("Add message before posting");

      }
     
      getVideo();
    }
    console.log(video);
  return (

    <div className="">
    <div className="">
      {!session ? (
        <Auth
          supabaseClient={supabase}
          appearance={{ theme: ThemeSupa }}
          theme="dark"
        />
      ) : (
        
   <div>
   <nav className="fullscreenNavbar">
     <div>
   <Link className="Logo" href="/">
       InviteGo
     </Link> 
     </div>

     <div className="insidenavbar">
       <div className="innav">
     <Link className="Logo" href="/about">
       My Account 
     </Link> 
     </div>
       <div className="innav">
     <Link className="Logo" href="/Publicpost">
       PublicPost 
     </Link> 
     </div>
       <div className="innav">
     <Link className="Logo" href="/Videos">
       Videos
     </Link>
     </div>
     </div>

   </nav>
   <h5>BROKE ASS POST ASK FOR MONEY SHAME</h5>
   
 <div className='insert-video-div' >
   
    <input type='text' placeholder='Enter Post' value={post} onChange={(e)=> setPost(e.target.value)}/>
    
     <input type='file' placeholder='Upload Video' accept='Video/mp4'
     onChange={(e) => uploadFile(e)}/>

 </div >
 <div className='video-input'>
   {video.map((videos)=>{
     console.log(videos);
    
     return(
       <>
       <h3>{videos.name}</h3>
       <video className='videos' controls>
         <source src={process.env.NEXT_PUBLIC_SUPABASE_STORAGEE + videos.name} type='video/mp4'/>
       </video><br/>
       
       </>
     )
   })}
   </div>
 <div>

 </div>
 <footer className="footer">
          <Link className="Logo" href="/about">
            👤
          </Link>
          <Link className="Logo" href="/">
            Go
          </Link>
          <Link className="Logo" href="/Publicpost">
          ❌
          </Link>
          <Link className="Logo" href="/Videos">
          🎥
          </Link>
        </footer>
 </div>
       
      )}
    
    </div>
  </div>





  )
}

export default Videos