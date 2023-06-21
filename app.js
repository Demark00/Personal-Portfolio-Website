// Importing modules
const express = require('express');
const path = require('path');
const backend = express();
const port = 80;


// Creating mongoose server
const mongoose = require('mongoose');
main().catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/PortfolioContact');
}


// Creating mognoose Schema
const PortfolioSchema = new mongoose.Schema({
    name: String,
    email:String,
    message:String,
    number:Number
});

//Compiling Schema into a Model
const PortfolioContact = mongoose.model('PortfolioContact', PortfolioSchema);


// Static configuration
backend.use('/static', express.static('static'));
backend.use(express.urlencoded());

// Views specific configuration
backend.set('/views', path.join(__dirname, 'views'));


// Requests
backend.get('/', (req,res)=>{
    res.sendFile(path.join(__dirname, '/views/index.html'))
    res.statusCode = 200;
})

backend.post('/contact', (req,res)=>{
    let data = new PortfolioContact(req.body);
    data.save().then(()=>{
        res.send("Your Data has been saved I will contact You")
    }).catch(()=>{
        res.send("Your data is not saved please try again")
    })
})

// Listening to server
backend.listen(port, ()=>{
    console.log(`Server has started at port ${port}`)
})