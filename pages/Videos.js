import React from 'react'
import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabaseClient';
import {v4 as uuidv4} from 'uuid'
import { useRouter } from 'next/router';
import Video from "../component/Video"


const Videoo = () => {
 const [video, setVideo]=useState([])
 const [post, setPost]=useState('')
 const router=useRouter();

async function getVideo() {
  const {data, error} =await supabase
  .storage
  .from('video')
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
        .from('video')
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
   <div>
    <div className='insert-video-div' >
       {/* <input type='text' value={post} onChange={(e)=> setPost(e.target.value)}/> */}
       <Video />
        {/* <input type='file' placeholder='Upload Video' accept='Video/mp4'
        onChange={(e) => uploadFile(e)}/> */}
   
    </div >
    <div className='video-input'>
      {video.map((videos)=>{
        console.log(videos);
       
        return(
          <>
          <h3>{videos.name}</h3>
          <video className='videos' controls>
            <source src={process.env.NEXT_PUBLIC_SUPABASE_STORAGE + videos.name} type='video/mp4'/>
          </video><br/>
          
          </>
        )
      })}
      </div>
    <div>

    </div>

    </div>
  )
}

export default Videoo