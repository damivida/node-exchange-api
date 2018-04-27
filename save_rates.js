const MongoClient = require('mongodb').MongoClient;

const app = require('./app');


MongoClient.connect('mongodb://localhost:27017/bittrex', (err, client) => {
    if(err) {
        return console.log('Unabele to connect to server')
    }


console.log('Connected to MongoBD server');

const db = client.db('bittrex');
    
    
  //--INSERTING DATA(callBack function)
db.collection(date).insertOne({
    bittrex_pair: bittrexPair,
    date: time,    
    value: avg,
    previous_day_value: previous,     
    percentage_change: perc.toFixed(2)
}).then((result) => {
    console.log(JSON.stringify(result.ops,undefined, 2));
    console.log('Data saved');
}, (err) => {
    console.log('Unable to write document', err);
    });

client.close();
    
});
