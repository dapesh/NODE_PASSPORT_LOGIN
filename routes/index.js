const express = require('express');
//var express = require('express');
const router = express.Router();
router.get('/', (req, res)=> {
    
    res.render('welcome.ejs')
});

module.exports = router;