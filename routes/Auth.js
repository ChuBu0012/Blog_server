const {login} = require('../controller/authcontroller');
const express = require('express');
const router = express.Router()

router.post('/login',login)

module.exports = router