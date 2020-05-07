'use strict';

require('dotenv').config();
const { WebClient } = require('@slack/web-api');
const ObjectsToCsv = require('objects-to-csv');
const PdfGenerator = require('pdfkit');
const fs = require('fs');

const doc = new PdfGenerator;

const options = {
  channel: 'C012K8S66P5',
  };

const web = new WebClient(process.env.BOT_TOKEN);
(async  () => {
  try {
    const history = await web.conversations.history(options)
    doc.pipe(fs.createWriteStream(`./pdfs/slack.pdf`));

    doc.fontSize(8)
    doc.text(`Pinned messges in ${options.channel}`, 100, 100);
    doc.moveDown();

    history.messages.map((item, index) => {
      if (item.pinned_info) {
        doc.text(`message in ${item.team}`);
        doc.text(`posted by ${item.pinned_info.pinned_by}`);
        doc.text(`message: ${item.text}`);
        doc.moveDown();
      }});

    doc.end();
  } catch (e) {
    console.log(e);
  }
  console.log("Conversations retrieved successfully");
})();

