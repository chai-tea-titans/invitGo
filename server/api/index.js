const router = require('express').Router()
router.use("/user", require("./users"));
router.use('/calendar', require('./calendar'));
// router.use('/video', require('./video'))


//add additional model routes here as you create them!


module.exports = router;