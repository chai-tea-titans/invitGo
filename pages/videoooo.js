import React from 'react'
import { useState, useEffect } from 'react';
import { useSupabaseClient } from '@supabase/auth-helpers-react';
import {v4 as uuidv4} from 'uuid'


const videoooo = () => {
  const supabase = useSupabaseClient()
    async function uploadFile(e){
      const videoFile= e.target.files[0];
        console.log("upload");
        const { error } = await supabase.storage
        .from('video')
        .upload(uuidv4() + ".mp4", videoFile)
      if(error){
        console.log(error);
        alert("error uploading file to supabase");
      }
    }
  return (
   
    <div>
        <input type='file' accept='Video/mp4'
        onChange={(e) => uploadFile(e)}></input>

    </div>
  )
}

export default videoooo