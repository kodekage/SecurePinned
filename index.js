'use strict';

require('dotenv').config();
const { WebClient } = require('@slack/web-api');
const ObjectsToCsv = require('objects-to-csv');

const options = {
  channel: 'C012K8S66P5',
  };

const web = new WebClient(process.env.BOT_TOKEN);
(async  () => {
  const pinned_messages = [];
  try {
    const history = await web.conversations.history(options)
    history.messages.map((item, index) => {
      if (item.pinned_info) {
        pinned_messages.push([{
          workspace_id: item.team,
          data: {
            id: item.client_msg_id,
            channel: item.pinned_info.channel,
            pinned_by: item.pinned_info.pinned_by,
            time_stamp: item.pinned_info.pinned_ts,
            message: item.text
          }
        }]);
      }});
    const csv = new ObjectsToCsv(pinned_messages);
    const store_csv = await  csv.toDisk(`./document.csv`);

    if (store_csv) console.log("CSV file created successfully!");
  } catch (e) {
    console.log(e);
  }

  console.log("Conversations retrieved successfully");
})();

