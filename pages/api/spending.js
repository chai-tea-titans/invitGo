const router = require("express").Router();
const { Spending: spendingEvent } = require("../../server/database/Index");

router.get("/", async (req, res, next) => {
  try {
    const spendingEvents = await spendingEvent.findAll();
    res.json(spendingEvents);
  } catch (err) {
    next(err);
  }
});
router.post("/", async (req, res, next) => {
  try {
    const spendingEvents = await spendingEvent.create(req.body);
    res.send(spendingEvents);
  } catch (err) {
    next(err);
  }
});

router.delete("/:id", async (req, res, next) => {
  try {
    const spendingEvents = await spendingEvent.findByPk(req.params.id);
    await spendingEvents.destroy();
    res.send(spendingEvents);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
