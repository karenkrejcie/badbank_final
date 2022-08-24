var express = require('express');
var app     = express();
var cors    = require('cors');
var dal     = require('./dal.js');

//used to serve static files from public directory
app.use(express.static('public'));
app.use(cors());


////////////////////////////////
//create new user account
////////////////////////////////
app.get('/account/create/:name/:email/:password', function (req, res) {
   //else create user
   dal.create(req.params.name,req.params.email,req.params.password).
    then((user) => {
       res.send(user);
    });
 });


////////////////////////////////
//login
////////////////////////////////
app.get('/account/login/:email/:password', function (req, res) {
   
   //deposit depAmt into ID's account
   dal.login(req.params.email,req.params.password).
    then((user) => {
      res.send(user);
    })
 });


////////////////////////////////
//make a deposit
////////////////////////////////
app.get('/account/deposit/:id/:depAmt', function (req, res) {
   //deposit depAmt into ID's account
   dal.deposit(req.params.id, parseFloat(req.params.depAmt)).
    then((user) => {
       res.send(user);
    });
 });

 ////////////////////////////////
//make a withdrawal
////////////////////////////////
app.get('/account/withdraw/:id/:withAmt', function (req, res) {
   //deduct withAmt into ID's account
   dal.deposit(req.params.id, parseFloat(0 - (req.params.withAmt))).
    then((user) => {
       res.send(user);
    });
 });


////////////////////////////////
//get balance
////////////////////////////////
app.get('/account/balance/:id', function (req, res) {
   //Get balance of ID's account
   dal.balance(req.params.id).
    then((user) => {
       res.send(user);
    });
 });

////////////////////////////////
//all accounts
////////////////////////////////
app.get('/account/all', function (req, res) {
  dal.all().
      then((docs) => {
         res.send(docs);
      });
});

////////////////////////////////
//delete all accounts
////////////////////////////////
app.get('/account/deleteAll', function (req, res) {
   dal.deleteAll().
       then((docs) => {
          res.send(docs);
       });
 });

var port = 3000;
app.listen(port);
console.log('Running on port: ' + port);