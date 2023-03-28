"use strict";

const db = require("./server/database/_db");
const User = require("./server/database/User");
const Event = require("./server/database/Event");
const Video = require("./server/database/Video");
const Expense = require("./server/database/Expense");
const calendarEvent = require("./server/database/calendar");
const spending = require("./server/database/spending");

const spendingDataArray = [
  {
    month: "January",
    day: 1,
    year: 2023,
    spendingname: "Groceries",
    spendingamount: 100,
  },
  {
    month: "February",
    day: 14,
    year: 2023,
    spendingname: "Gas",
    spendingamount: 50,
  },
  {
    month: "March",
    day: 17,
    year: 2023,
    spendingname: "Rent",
    spendingamount: 1000,
  },
];

const calendarEventDataArray = [
  {
    month: "January",
    day: 1,
    year: 2023,
    addeditems: "New Year's Day",
  },
  {
    month: "February",
    day: 14,
    year: 2023,
    addeditems: "Valentine's Day",
  },
  {
    month: "March",
    day: 17,
    year: 2023,
    addeditems: "St. Patrick's Day",
  },
];
const calendarEventDataArray = [
  {
    month: "January",
    day: 1,
    year: 2023,
    addeditems: "New Year's Day",
  },
  {
    month: "February",
    day: 14,
    year: 2023,
    addeditems: "Valentine's Day",
  },
  {
    month: "March",
    day: 17,
    year: 2023,
    addeditems: "St. Patrick's Day",
  },
];

// Creating Users

const userDataArray = [
  {
    username: "carlosz",
    name: "carlos",
    password: "123",
    email: "lcz.market@gmail.com",
    // videosSent: 10,
    // eventsCreated: 10,
    // numEvents: 10,
    // numVideos: 10,
    // inviteesConfirmed: 10,
    // coolnessTracker: 30,
    // history: "",
  },
  {
    username: "leeroy",
    name: "leeroy",
    password: "123",
    email: "leroy.market@gmail.com",
    //   videosSent: 5,
    //   eventsCreated: 5,
    //   numEvents: 5,
    //   numVideos: 5,
    //   inviteesConfirmed: 5,
    //   coolnessTracker: 15,
    //   history: "",
  },
];

const eventDataArray = [
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
  },
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
  },
];

const videoDataArray = [
  {
    eventId: 4,
    userId: 1,
    url: "https://youtube.com/shorts/rTx4G39R1YA?feature=share",
  },
];

async function seed() {
  try {
    await db.sync({ force: true });
    await Event.bulkCreate(eventDataArray);
    await User.bulkCreate(userDataArray);
    await Video.bulkCreate(videoDataArray);
    await Expense.bulkCreate(expenseDataArray);
    await calendarEvent.bulkCreate(calendarEventDataArray);
    await spending.bulkCreate(spendingDataArray);

    console.log("seeding successful");
  } catch (err) {
    console.error(err);
    db.close();
  }
}

seed().then(() => {
  process.exit();
});
