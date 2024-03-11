const express = require('express');
const router = express.Router();
const TestControllar = require('../controller/TestController')


router.get('/test', TestControllar.test)


module.exports = router;
