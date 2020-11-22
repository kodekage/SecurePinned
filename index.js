'use strict';

require('dotenv').config();
const { WebClient } = require('@slack/web-api');
const bodyParser = require('body-parser');
const express = require('express');
const { testDbConnection, addWorkspaceToDb, addChannelToWorkspace, savePinnedMessage, validChannel, getPinnedMessages, getWorkspaceDetails, deletePinnedMessages } = require('./utils');
const port = process.env.PORT || 8000;

const app = express();
app.set('views', './views');
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true }))
const web = new WebClient(process.env.BOT_TOKEN);


testDbConnection();
addWorkspaceToDb(web);

app.post('/pinned', async  (req, res) => {
  const channelInfo = {
    workspace_id: req.body.team_id,
    channel_id: req.body.channel_id,
    channel_name: req.body.channel_name
  }

  addChannelToWorkspace(channelInfo);

  try {
    const history = await web.conversations.history({channel: req.body.channel_id})
    history.messages.map(item => {
      if (item.pinned_info) {
        const data = {
          client_message_id: item.client_msg_id,
          pinned_by: item.pinned_info.pinned_by,
          workspace_id: item.team,
          message: item.text,
          message_timestamp: item.pinned_info.pinned_ts,
          pinned_channel: item.pinned_info.channel,
        }
        savePinnedMessage(data);
      };
    })

    web.chat.postMessage({
      channel: req.body.channel_id,
      text: `Hello <@${req.body.user_id}>,\nLooks like you lost the pinned messages again :confounded:\n\nLuckily I stored them for you :simple_smile: \n\n http://localhost:5000/pinned/${req.body.channel_id}/${req.body.channel_name}`
    })

    console.log("\x1b[33m[SecurePinned] The Pinned Messages where successfully saved to our database\x1b[0m");
    res.send('securePinned successfully processed your request');
  } catch (e) {
    console.log('\x1b[31m[SecuredPinned] ERROR =>\x1b[0m', e);
  }
})

app.get('/pinned/:channelId/:channelName', async (req, res) => {
  const channelExist = await validChannel(req.params.channelId);
  const workspaceDetails = await getWorkspaceDetails(channelExist.workspaceId);

  if (!channelExist.status) return res.render('error', {message: "Channel does not exist, contact your workspace admin"})
  
  const pinned_messages = await getPinnedMessages(req.params.channelId);
  if (pinned_messages.length === 0) return res.render('empty', { message: "Channel has no pinned message(s)", channel: req.params.channelName });
  res.render('index', {pinned_messages, workspace: workspaceDetails, channel: req.params.channelName});
})

// Deletes every pinned messages in the database after 24hrs to save cost
setInterval(deletePinnedMessages, 86_400_000);

app.listen(port, () => console.log(`\x1b[33m[SecurePinned] Server is live on port ${port}\x1b[0m`));



