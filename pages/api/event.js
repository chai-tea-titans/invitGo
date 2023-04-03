import { addNotification } from "./store/notificationsSlice";
const { events } = require("../../server/database/Event");
import store from "./store/store";
const { Video } = require("../../server/database/Video");


router.post("/createEvent", async (req, res) => {
  try {
    // const { name, date, expenses, videoSent } = req.body;
    // const { title, date, message, invitees, videoMessage } = req.body;  <<< FINAL VERSION
    const { name, date, expenses, videoMessage } = req.body;
    // Save the new event to the database
    const event = await events.create({
      name,
      date,
      expenses,
    });
  
      // If there's a videoMessage, create the video entry and associate it with the event
      if (videoMessage) {
        await Video.create({ url: videoMessage, eventId: event.id });
      }

    // Add a notification to the Redux store
    store.dispatch(
      addNotification({
        id: uuidv4(),
        type: "event",
        event: {
          id: events.id,
          name,
          date,
          expenses,
          read: false,
        },
        // event: {
        //   id: event.id,
        //   title,
        //   date,
        //   message,
        //   invitees
        // },
        //  This commented out portion would be the final version  <<<<
      })
    );
    res.status(200).send(events);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal server error");
  }
});

router.put("/uploadVideo/:eventId", async (req, res) => {
  try {
    const { eventId } = req.params;
    const { videoMessage } = req.body;

    // Find the event in the database and update the short-form video URL
    const event = await Event.findByPk(eventId);

 // If there's a videoMessage, create the video entry and associate it with the event
    if (videoMessage) {
      await Video.create({ url: videoMessage, eventId: event.id });
    }

// router.post("/save-video-url", async (req, res) => {
//   try {
//     const { eventId, videoMessage } = req.body;
//     // Save the video URL to the event model
//     const event = await events.findByPk(eventId);
//     event.videoMessage = videoMessage;
//     await event.save();

    res.status(200).send(event);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal server error");
  }
});

module.exports = router;
