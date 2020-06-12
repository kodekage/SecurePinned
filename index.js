'use strict';

require('dotenv').config();
const { WebClient } = require('@slack/web-api');
const bodyParser = require('body-parser');
const express = require('express');

const app = express();
app.set('views', './views');
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true }))
const web = new WebClient(process.env.SIMPLE_BOT_TOKEN);

const options = { channel: 'CA100TWAW' };
const pinned_messages = [];

app.post('/pinned', async  (req, res) => {
  console.log(req.form);
  try {
    const history = await web.conversations.history(options)
    history.messages.map((item, index) => {
      if (item.pinned_info) pinned_messages.push(item);
    })

    web.chat.postMessage({
      channel: 'CA100TWAW',
      text: `Looks like you lost the pinned messages again :confounded:\n\n Luckily I stored them for you :simple_smile: \n\n https://a4cb7242.ngrok.io/pinned/${options.channel}`
    })
  } catch (e) {
    console.log(e);
  }

  console.log("Conversations retrieved successfully");
  res.send('securePinned successfully processed your request');
})

app.get('/pinned/:channel', (req, res) => {
  // console.log(req.params);
  if (req.params.channel !== options.channel) return res.render('error', {message: "Channel does not exist, contact your workspace admin"})

  res.render('index', {pinned_messages, channel: options.channel});
})

app.listen(process.env.PORT || 8000, () => console.log("Server is live on port 8000"));

