// import React from 'react'

// const EventReply = () => {
//   return (
//     <div>EventReply</div>
//   )
// }

// export default EventReply


// import React, { useState } from 'react'

// const EventReply = () => {
//   const [email, setEmail] = useState('')
//   const [eventResponse, setEventResponse] = useState('')
//   const [video, setVideo] = useState(null)
//   const [paymentInfo, setPaymentInfo] = useState('')

//   const handleSubmit = (e) => {
//     e.preventDefault()
//     // send reply data to backend for processing
//   }

//   return (
//     <div>
//       <h2>Event Reply</h2>
//       <form onSubmit={handleSubmit}>
//         <label>
//           Email:
//           <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
//         </label>
//         <br />
//         <label>
//           Event Response:
//           <select value={eventResponse} onChange={(e) => setEventResponse(e.target.value)}>
//             <option value="">--Please choose an option--</option>
//             <option value="Agreed">Agreed</option>
//             <option value="Declined">Declined</option>
//           </select>
//         </label>
//         <br />
//         <label>
//           Video:
//           <input type="file" onChange={(e) => setVideo(e.target.files[0])} />
//         </label>
//         <br />
//         <label>
//           Payment Information:
//           <input type="text" value={paymentInfo} onChange={(e) => setPaymentInfo(e.target.value)} />
//         </label>
//         <br />
//         <button type="submit">Submit</button>
//       </form>
//     </div>
//   )
// }

// export default EventReply



import React from 'react'

const EventReply = () => {
  const [email, setEmail] = React.useState('');
  const [agreed, setAgreed] = React.useState(false);
  const [videoUrl, setVideoUrl] = React.useState('');
  const [paymentInfo, setPaymentInfo] = React.useState('');

  // Handle form submission
  const handleSubmit = (event) => {
    event.preventDefault();
    // Send data to backend API for storage in database
  }

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="email">
        Email:
        <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} />
      </label>
      <br />
      <label htmlFor="agreed">
        Agreed:
        <input type="checkbox" id="agreed" checked={agreed} onChange={(e) => setAgreed(e.target.checked)} />
      </label>
      <br />
      <label htmlFor="videoUrl">
        Video URL:
        <input type="text" id="videoUrl" value={videoUrl} onChange={(e) => setVideoUrl(e.target.value)} />
      </label>
      <br />
      <label htmlFor="paymentInfo">
        Payment Info:
        <input type="text" id="paymentInfo" value={paymentInfo} onChange={(e) => setPaymentInfo(e.target.value)} />
      </label>
      <br />
      <button type="submit">Submit</button>
    </form>
  )
}

export default EventReply
