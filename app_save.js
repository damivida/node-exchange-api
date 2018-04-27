const yargs = require('yargs');
const axios = require('axios');

const mongo = require('./test/mongodb-connect');

//--CREATING AN INPUT
const argv = yargs
  .options({
     save: {
          demand: true,
          alias: 's',
          describe: 'save value in database',
          string: true
      },
      date: {
          demond: true,
          alias: 'd',
          describe: 'date of monitoring',
          string: true
      }
  })
 .help()
 .alias('help', 'h')
 .argv;

date = argv.date;
var save = argv.save;
var bittrexUrl = `https://bittrex.com/api/v1.1/public/getmarketsummary?market=${save}`; 

axios.get(bittrexUrl).then((response) => {
    if (response.data.result === null) {
        throw new Error('Unable to find that pair');
    }
    
    //--getting data from JSON
    bittrexPair = response.data.result[0].MarketName;
    time = response.data.result[0].TimeStamp;
    var high = response.data.result[0].High;
    var low = response.data.result[0].Low;
    var last = response.data.result[0].Last;
    var bid = response.data.result[0].Bid;
    var ask = response.data.result[0].Ask;
    previous = response.data.result[0].PrevDay;
    
    //-calculations
    avg = (high+low+last+bid+ask)/5; 
    var dif = avg - previous;
    perc = (dif*100)/previous;
      
    console.log('============================');
    console.log(`BittrexPair: ${bittrexPair}`);
    console.log(`UtcTime: ${time}`);
    console.log('----------------------------');
    console.log(`HighValue: ${high}`);
    console.log(`LowValue: ${low}`);
    console.log(`LastValue: ${last}`);
    console.log(`BidValue: ${bid}`);
    console.log(`AskValue: ${ask}`);
    console.log('----------------------------');
    console.log(`AverageValue: ${avg.toFixed(8)}`);
    console.log('----------------------------');
    console.log(`PreviouseDay: ${previous}`);
    console.log('----------------------------');
    console.log(`PercentageChange: ${perc.toFixed(2)} %`);
    console.log('============================');    
    
    var btc_eur = `https://www.bitstamp.net/api/v2/ticker/btceur/`;
    return axios.get(btc_eur);
    
}).then((response) => {
    var vwap = response.data.vwap;
    //var som_res = high_value * previouse;
    console.log(`BTC/EUR_PRICE: ${vwap}`);
}).catch((e) => {
    if (e.code === 'ENOTFOUND') {
        console.log('Unable to connect to API Bittrex');
    }else {
        console.log(e.message);
    }
});

