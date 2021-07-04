const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const app = express();
const mongoose = require('mongoose');
const session = require('express-session');
const flash = require('connect-flash'); 


//const ejsLint = require('ejs-lint');


app.use(expressLayouts);
app.set('view engine','ejs');

//db config
const db = require('./config/keys').MongoURI;
//body Parser
app.use(express.urlencoded({extended:false}));

//connect-flash
app.use(flash());

//express-session
app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
  }))

//Global variables
app.use((req,res,next) => {
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    next();
});



//connect to mongo
mongoose.connect(db, {useNewUrlParser:true})
    .then(()=> console.log('connection successful'))
    .catch(err => console.log(err))

app.use('/', require('./routes/index.js'));
app.use('/users', require('./routes/users.js'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, console.log(`server started on port${PORT}`));