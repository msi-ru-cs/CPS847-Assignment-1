import * as functions from 'firebase-functions';
import { XMLHttpRequest } from 'xmlhttprequest-ts';


import { WebClient } from '@slack/web-api';
const bot = new WebClient(functions.config().slack.token);

const { PubSub } = require('@google-cloud/pubsub');
const pubsubClient = new PubSub();

//this gets the url where the weather json is stored
function Get(yourUrl){
    var Httpreq = new XMLHttpRequest(); // a new request
    Httpreq.open("GET",'http://api.openweathermap.org/data/2.5/weather?id=6167865&APPID=21d8fc9f9abfa2bd9f068c2446246765',false);
    Httpreq.send(null);
    return Httpreq.responseText;
}

//http://api.openweathermap.org/data/2.5/weather?id=6167865&APPID=21d8fc9f9abfa2bd9f068c2446246765

// the HTTP gateway validates the request and gives a PubSub message
//within the request, then responds with a 200 code to Slack
export const myBot = functions.https.onRequest( async (req, res) => {

    const data = JSON.stringify(req.body);
    const baseText = req.body.event.text;
    const elements = req.body.event.blocks[0].elements[0].elements;

    //Use our Get function to pull json object with weather data
    const json_obj = JSON.parse(Get('http://api.openweathermap.org/data/2.5/weather?id=6167865&APPID=21d8fc9f9abfa2bd9f068c2446246765'));
    const temperature = (json_obj.main.temp - 273.15).toFixed(1); //temp given in Kelvins so we convert to C with 1 decimal
    //build the weather report string
    var weather_report= new String("The weather conditions in "+ json_obj.name + " currently are "
               + temperature + " degrees Celcius, " + json_obj.weather[0].description +
               ", and " + json_obj.main.humidity + "% humid.");


    for(let ele of elements){
      console.log(ele)
      //ATM3ZGM37 is the bots unique ID, we need to make sure it is in the message
      if(ele.type == "user" && ele.user_id=='ATM3ZGM37'){
          const chatMessage = await bot.chat.postMessage({
            channel: '#general',
            text: `${weather_report}`
          });
        }
      }

      console.log(data);
      res.sendStatus(200);


});
