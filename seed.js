"use strict";

const db= require("./server/database/database");
const User= require("./server/models/User");
const Event = require("./server/models/Event");
const Video = require("./server/models/Video");
const Expense = require("./server/models/Expense");


  // Creating Users
 
    const userDataArray=[
      {
        username: "carlosz",
        name: "carlos",
        password: "123",
        email: "lcz.market@gmail.com",
        videosSent: 10,
        eventsCreated: 10,
        numEvents: 10,
        numVideos: 10,
        inviteesConfirmed: 10,
        coolnessTracker: 30,
        history: "",
      },
      {
        username: "leeroy",
        name: "leeroy",
        password: "123",
        email: "leroy.market@gmail.com",
        videosSent: 5,
        eventsCreated: 5,
        numEvents: 5,
        numVideos: 5,
        inviteesConfirmed: 5,
        coolnessTracker: 15,
        history: "",
      }
    ];
    
    const eventDataArray=[
      {
        title: "apple",
        date: "04/22/23",
        message: "be there or suck",
        invitees: "simple description to be input here about Google",
        videoMessage: "",
        paymentRequest: "monies",
        paymentType: "Group",
        // what should the payment types be???
        paymentStatus: "Paid",
        totalCost: 100,
        paidBy: "Monica",
        paidFor: "Party",
        numConfirmed: 10,
        tags: "party, promotion, Jim",
        // userId: 1,
      },
      {
        title: "apple",
        date: "03/30/23",
        message: "It's a surprise, don't tell Kelley or Pam",
        invitees: "Creed, Ryan, Michael, Kelley, Toby, Phylis, Angela",
        videoMessage: "",
        paymentRequest: "$50 bux",
        paymentType: "Event",
        // what should the payment types be???
        paymentStatus: "Paid",
        totalCost: 200,
        paidBy: "Kelley",
        paidFor: "baby shower",
        numConfirmed: 7,
        tags: "party, preggers, Pam",
        // userId: 2,
      }
    ];
    
    const expenseDataArray = [
      {
        title: "Party Party",
        amount: 100,
        paidBy: "Monica",
        paidFor: "simple description to be input here",
        tags: "Jim party",
        eventId: 1,
      },
      {
        title: "Preggers party",
        amount: 50,
        paidBy: "Kelley",
        paidFor: "simple description to be input here",
        tags: "Pam party",
        eventId: 2,
      }
    ];
    
    const videoDataArray = [
      {
        eventId: 4,
        userId: 1,
        url: "https://youtube.com/shorts/rTx4G39R1YA?feature=share",
      }
    ];
 

  async function seed() {
    try{
      await db.sync({force: true})
       await Event.bulkCreate(eventDataArray)
       await User.bulkCreate(userDataArray)
       await Video.bulkCreate(videoDataArray)
       await Expense.bulkCreate(expenseDataArray)

       
       console.log('seeding successful')
    }
    catch(err){
      console.error(err);
      db.close()
    }
    }
     
  
  
  seed()
  .then(()=>{
      process.exit();
  
  });
  

