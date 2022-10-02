const express = require('express');
const router = express.Router();
const {create,getAllBlogs,getBlog,remove,update} = require('../controller/blogcontroller')
const {requireLogin} = require('../controller/authcontroller');

router.post('/createblog',requireLogin,create)
router.get('/blogs',getAllBlogs)
router.get('/blog/:slug',getBlog)
router.delete('/blog/:slug',requireLogin,remove)
router.put('/blog/:slug',requireLogin,update)

module.exports = router