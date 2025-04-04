const express = require('express');
const bodyParser=require('body-parser');
const path=require('node:path');
const fs=require('node:fs');
const https = require('node:https');
const helmet=require('helmet');
const compression=require('compression');

const errorController=require('./controllers/error');
const db=require('./util/database');
// const expressHbs=require('express-handlebars')


const app=express();
app.use(helmet());
app.use(compression());

//Ejs template
app.set('view engine', 'ejs');


const privateKey=fs.readFileSync('server.key');
const certificate=fs.readFileSync('server.cert');


//Handle bar 
// app.engine('hbs',
//     expressHbs({
//     layoutsDir:'views/layouts/',
//     defaultLayout:'main-layout',
//     extname:'hbs'
//     })
// );
// app.set('view engine', 'hbs');
//Template engine to load pug template
// app.set('view engine', 'pug');

//Path to find the views of the pug template
app.set('views', 'views');

const adminRoutes=require('./routes/admin');
const shopRoutes=require('./routes/shop');


//bodyparser to parse the form input elements without buffer.parsedBody
app.use(bodyParser.urlencoded({extended:false}))
//To add custom folder/path to be exposed on the public access site
app.use(express.static(path.join(__dirname,'public')));


// //Middleware to handle req and res
// app.use((req,res,next)=> {
//     console.log("In middleware");
//     next(); // Allows us to move on to next step. Otherwise code will not move to nextline
// })

app.use('/admin',adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404);

https.createServer({key: privateKey, cert:certificate},app)
.listen(
    process.env.PORT || 3000
);
// app.listen(3000);