const router = require("express").Router();
const {Calendar:calendarEvent} = require("../database/Index");

router.get("/", async (req, res, next) => {
    try {
      const calendarEvents = await calendarEvent.findAll();
      res.json(calendarEvents);
    } catch (err) {
      next(err);
    }
  });

  router.get('/:Id', async (req, res, next) => {
    try {
        const calendarEvents = await calendarEvent.findByPk(req.params.Id)
        res.json(calendarEvents)
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
      }
})

module.exports = router;