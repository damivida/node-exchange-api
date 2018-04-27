const yargs = require('yargs');

const MongoClient = require('mongodb').MongoClient;

//const {MongoClient, ObjectID} = require('mongodb');


//--CREATING AN INPUT
const argv = yargs
  .options({
      date: {
          demand: true,
          alias: 'd',
          describe: 'quering the database',
          string: true
      }
  })
 .help()
 .alias('help', 'h')
 .argv;

date = argv.date;

//console.log(typeof date);
   
MongoClient.connect('mongodb://localhost:27017/bittrex', (err, client) => {
    if(err) {
        return console.log('Unabele to connect to server')
    }


console.log('Connected to MongoBD server');
//console.log(date);    

const db = client.db('bittrex');

db.collection(date).find({}).toArray().then((doc) => {
    console.log(JSON.stringify(doc, undefined, 2));
}, (err) => {
    console.log('Unable to find doc');
});   
    


client.close();

});
//module.exports = {MongoClient};