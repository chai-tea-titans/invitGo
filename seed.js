"use strict";

const db= require("./server/database/database");
const User= require("./server/models/User");
const Event = require("./server/models/Event");
const Video = require("./server/models/Video");
const Expense = require("./server/models/Expense");


async function seed() {
  await db.sync(); // clears db and matches models to tables
  console.log("db synced!");
  // Creating Users
 
    const users = await Promise.all([
      User.create({
        username: "carlz",
        name: "carl",
        password: "123",
        email: "charlie.market@gmail.com",
        videosSent: 10,
        eventsCreated: 10,
        numEvents: 10,
        numVideos: 10,
        inviteesConfirmed: 10,
        coolnessTracker: 30,
        history: "",
      }),
      User.create({
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
      })
    ]);
    
    const events= await Promise.all([
      Event.create({
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
      }),
      Event.create({
        title: "apple2",
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
      })
    ]);
    
    const expenses = await Promise.all([
      Expense.create({
        title: "Party Party",
        amount: 100,
        paidBy: "Monica",
        paidFor: "simple description to be input here",
        tags: "Jim party",
        eventId: 1,
      }),
      Expense.create({
        title: "Preggers party",
        amount: 50,
        paidBy: "Kelley",
        paidFor: "simple description to be input here",
        tags: "Pam party",
        eventId: 2,
      })
    ]);
    
    const videos = await Promise.all([
      Video.create({
        eventId: 4,
        userId: 1,
        url: "https://youtube.com/shorts/rTx4G39R1YA?feature=share",
      })
    ]);
    console.log(`seeded ${users.length} users`);
    console.log(`seeded ${events.length} products`);
    console.log(`seeded ${expenses.length} products`);
    console.log(`seeded ${videos.length} products`);
    console.log(`seeded successfully`);
    return {
      users, events, expenses, videos
    };
  }
     
  
  
  // seed()
  // .then(()=>{
  //     process.exit();
  
  // });
  
  async function runSeed() {
    console.log("seeding...");
    try {
      await seed();
    } catch (err) {
      console.error(err);
      process.exitCode = 1;
    } finally {
      console.log("closing db connection");
      await db.close();
      console.log("db connection closed");
    }
  }

  if (module === require.main) {
    runSeed();
  }
