const router = require("express").Router();
const { Calendar: calendarEvent } = require("../../server/database/Index");

router.get("/", async (req, res, next) => {
  try {
    const calendarEvents = await calendarEvent.findAll();
    res.json(calendarEvents);
  } catch (err) {
    next(err);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const calendarEvents = await calendarEvent.create(req.body);
    res.send(calendarEvents);
  } catch (err) {
    next(err);
  }
});

router.delete("/:id", async (req, res, next) => {
  try {
    const calendarEvents = await calendarEvent.findByPk(req.params.id);
    await calendarEvents.destroy();
    res.send(calendarEvents);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
