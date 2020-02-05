import * as functions from 'firebase-functions';

import { WebClient } from '@slack/web-api';
const bot = new WebClient(functions.config().slack.token);

export const myBot = functions.https.onRequest( async (req, res) => {
    
  const data = JSON.stringify(req.body);
  const baseText = req.body.event.text;
  const elements = req.body.event.blocks[0].elements[0].elements;

  for (let ele of elements) {
    console.log(ele)
    // UTGV6LU3S is the que bot id that we need to remove from text
    if (ele.type == "user" && ele.user_id == 'UTGV6LU3S') {
      const userID = ele.user_id;
      const echoText = baseText.replace('<@' + userID + '>', '');
      const chatMessage = await bot.chat.postMessage({
        channel: '#general',
        text: `${echoText}`
      });
    } 
  }

  // Solution 2 (only works for text and not emojis): 
  // const elements = req.body.event.blocks[0].elements[0].elements;
  // console.log(elements);

  // for (let ele of elements ) {
  //   console.log(ele)
  //   if (ele.type == "text") {
  //     const echoText = ele.text;
  //     console.log(echoText);
  //     const chatMessage = await bot.chat.postMessage({
  //       channel: '#general',
  //       text: `${echoText}`
  //     });
  //   } 
  // }

  console.log(data);

  res.sendStatus(200);

});