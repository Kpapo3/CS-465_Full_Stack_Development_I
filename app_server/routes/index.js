var express = require('express'); // Express app
var router = express.Router();    // Router logic

const ctrlMain = require('../controllers/main');

/* GET home page. */
router.get('/', ctrlMain.index);

module.exports = router;
