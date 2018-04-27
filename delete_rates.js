const yargs = require('yargs');

const MongoClient = require('mongodb').MongoClient;

//const {MongoClient, ObjectID} = require('mongodb');


//--CREATING AN INPUT
const argv = yargs
  .options({
      collection: {
          demand: true,
          alias: 'c',
          describe: 'selecting collection',
          string: true
      },
      
      pair: {
          demand: true,
          alias: 'p',
          describe: 'selecting pair (please enter pair in upper case format)',
          string: true
      }
  })
 .help()
 .alias('help', 'h')
 .argv;

collection = argv.collection;
pair = argv.pair;

//console.log(typeof date);
   
MongoClient.connect('mongodb://localhost:27017/bittrex', (err, client) => {
    if(err) {
        return console.log('Unabele to connect to server')
    }


console.log('Connected to MongoBD server');
//console.log(date);    

const db = client.db('bittrex');

db.collection(collection).findOneAndDelete({
    bittrex_pair: pair
}).then((result) => {
    console.log('Record deleted:', result);
}, (err) => {
    console.log("Unable to delete record");
});
    
client.close();

});
//module.exports = {MongoClient};