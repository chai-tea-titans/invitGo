"use client";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchVideoAsync = createAsyncThunk("AllVideo", async () => {
  try {
    const response = await axios.get(`/api/video`);
    const data = response.data;
    console.log(data);
    return data;
  } catch (err) {
    console.log(err);
  }
});
export const createEventAsync = createAsyncThunk(
    "video/add",
    async ({ month, day, year, addeditems }) => {
      try {
        const { data } = await axios.post(`/api/upload-video`, {
          url,
          eventId,
          userId,
          
        });
        return data;
      } catch (error) {
        console.error("Error creating event fail: ", error);
        throw error; // re-throw the error to trigger the rejected state of the thunk
      }
    }
  );

//   export const deleteEventAsync = createAsyncThunk(
//     "video/delete",
//     async id => {
//       try {
//         const { data } = await axios.delete(
//           `http://localhost:8080/api/video/${id}`
//         );
//         return data;
//       } catch (error) {
//         console.error("Error deleting event: ", error);
//       }
//     }
//   );


  const VideoSlice = createSlice({
    name: "video",
    initialState: [],
    reducers: { displayVideo: (state, action) => {} },
    extraReducers: builder => {
      builder.addCase(fetchVideoAsync.fulfilled, (state, action) => {
        return action.payload;
      });
      builder.addCase(createEventAsync.fulfilled, (state, action) => {
        state.push(action.payload);
      });
      // builder.addCase(deleteEventAsync.fulfilled, (state, action) => {
      //   return state.filter(video => video.id !== action.payload.id);
      // });
    },
  });
  
  export const { setVideo } = VideoSlice.actions;
  export const selectVideo = state => {
    return state.video;
  };
  export default VideoSlice.reducer;
  

