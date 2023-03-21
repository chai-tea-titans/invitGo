const router = require("express").Router();
const {calendarEvent} = require("../models");

router.get("/", async (req, res, next) => {
    try {
      const calendarEvents = await calendarEvent.findAll();
      res.json(calendarEvents);
    } catch (err) {
      next(err);
    }
  });

module.exports = router;