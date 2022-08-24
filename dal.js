const { ObjectID } = require('bson');

const MongoClient = require('mongodb').MongoClient;
const url         = 'mongodb://mongo:27017';
//const url = "mongodb+srv://karenkrejcie:Vu7I9ryvq8S2RwEG@cluster0.dgymzmn.mongodb.net/?retryWrites=true&w=majority";
let db            = null;

//connect to Mongo
MongoClient.connect(url, {useUnifiedTopology: true}, function(err,client) {
    if (err)
    {
        console.log(err)
    }
    else{
        //connect to database
        db = client.db('Users');
    }
});

////////////////////////////////
//CREATE ACCOUNT
////////////////////////////////
function create(name, email, password){
    return new Promise((resolve, reject) => {
        const collection = db.collection('users');

        //check to make sure email address doesn't already exist.
        collection.findOne(
            {email: email}, function(errEmail, docsEmail) {
                //error processing
                if (errEmail) { reject(errEmail) }
                
                //Check for dup email address. If a record was found, that's an error.
                if (docsEmail) {
                    //email address found.  Error.
                    var jsonData = {};
                    jsonData = {"Error": 0};
                    docsEmail = jsonData;
                    resolve(docsEmail);
                }
                else {
                    //create an account number
                    var acctNum=Math.floor(Math.random()*10003000);

                    //Check to make sure not duplicate acctNum
                    collection.findOne(
                        {acctNum: acctNum}, function(errAcct, docsAcct) {
                            //error processing
                            if (errAcct) { reject(errAcct) }
                            //Account Number already exists.  Make a different one.
                            if (docsAcct) {
                                acctNum=Math.floor(Math.random()*10003000);
                            } 
                            //Not a registered email and a unique acctNum.  Add record.
                            const docs = {acctNum, name, email, password, balance: 0};
        
                            collection.insertOne(docs, {w:1}, 
                                function (err, result) {
                                    err ? reject(err) : resolve(docs);
                                }
                            );         
                        }
                    
                    );
                }
            }
        );
    })
}

////////////////////////////////
//LOGIN
////////////////////////////////
function login(email, password){
    
    return new Promise((resolve, reject) => {
        const collection = db.collection('users');
        collection.findOne(
            {email: email, password: password}, function(err, docs) {
                //error processing
                if (err) { reject(err) }
                
                //no record is not an error. Check if a record was found.
                if (docs) {
                    resolve(docs);
                } else {
                    // we don't have a match
                    var jsonData = {};
                    jsonData = {"Error": 0};
                    docs = jsonData;
                    resolve(docs);
                }
              }
        );
    })
}

////////////////////////////////
//DEPOSIT
////////////////////////////////
function deposit(id, amt){
    return new Promise((resolve, reject) => {
        const collection = db.collection('users');
        
        //must be an ObjectID to find in database.

        newID = ObjectID(id);
        var myquery = { _id: newID };
        var newvalues = { $inc: {"balance": amt }};

        collection.updateOne(myquery, newvalues, 
            function (err, docs){
                //no record is not an error.
                if (docs) {
                 resolve(docs);
            }   else {
                 // we don't
                 var jsonData = {};
                 jsonData = {"Error": 0};
                 docs = jsonData;
                 resolve(docs);
             }
           });
    })
};

////////////////////////////////
//WITHDRAW
////////////////////////////////
function withdraw(id, amt){
    return new Promise((resolve, reject) => {
        const collection = db.collection('users');
        
        //must be an ObjectID to find in database.
        newID = ObjectID(id);
        var myquery = { _id: newID };
        var newvalues = { $inc: {"balance": amt }};

        collection.updateOne(myquery, newvalues, 
            function (err, docs){
                //no record is not an error.
                if (docs) {
                 resolve(docs);
            }   else {
                 // we don't
                 var jsonData = {};
                 jsonData = {"Error": 0};
                 docs = jsonData;
                 resolve(docs);
             }
           });
    })
};

////////////////////////////////
//BALANCE
////////////////////////////////
function balance(id){
    newID = ObjectID(id);
    return new Promise((resolve, reject) => {
        const customers = db  
        .collection('users')
        .findOne({ _id: newID },
            function(err, docs) {
            //error processing
            if (err) { reject(err) }
            
            //no record is not an error.
            if (docs) {
                resolve(docs);
            } else {
                // we don't
                var jsonData = {};
                jsonData = {"Error": 0};
                docs = jsonData;
                resolve(docs);
            }
          });
})
}

////////////////////////////////
//all users read from MongoDB
////////////////////////////////
function all(){
    return new Promise((resolve, reject) => {
        const customers = db  
          .collection('users')
          .find({})
          .toArray(function(err, docs) {
            err ? reject(err) : resolve(docs);
          });
    })
}

////////////////////////////////
//delete all users  from MongoDB
////////////////////////////////
function deleteAll(){
    
    return new Promise((resolve, reject) => {
        const customers = db  
          .collection('users')
          .remove({balance: {$gte: 0}}, 
            function (err, docs){
                //no record is not an error.
                if (docs) {
                 resolve(docs);
                }   
                else {
                 // we don't
                 var jsonData = {};
                 jsonData = {"Error": 0};
                 docs = jsonData;
                 resolve(docs);
                }
           });
}        )
}
module.exports = {create, all, deposit, withdraw, login, balance, deleteAll};