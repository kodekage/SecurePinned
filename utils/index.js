'use strict';

const { DataTypes } = require('sequelize');
const sequelize = require('../db/db');
const Workspace = require('../db/models/workspace')(sequelize, DataTypes);
const Channel = require('../db/models/channel')(sequelize, DataTypes);
const PinnedMessage = require('../db/models/pinnedmessage')(sequelize, DataTypes);

const addWorkspaceToDb = async (slackbot) => {
  const workspaceInfo = await slackbot.team.info();
  if (workspaceInfo.ok) {
   const workSpaceExist = await Workspace.findOne({ where: { workspace_id: workspaceInfo.team.id}})

   if (workSpaceExist) return;
   await Workspace.create({
     workspace_id: workspaceInfo.team.id,
     workspace_domain: workspaceInfo.team.domain,
     workspace_logo: workspaceInfo.team.icon.image_44
    })

    return 1;
  }
}

const addChannelToWorkspace = async (channel) => {
  const channelExist = await Channel.findOne({ where: { workspace_id: channel.workspace_id, channel_id: channel.channel_id }});

  if (channelExist) return;
  await Channel.create({
    workspace_id: channel.workspace_id,
    channel_id: channel.channel_id,
    channel_name: channel.channel_name
  })

  return 1;
}

const savePinnedMessage = async (item) => {
  const messageAlreadySaved = await PinnedMessage.findOne({ where: { client_message_id: item.client_message_id, pinned_channel: item.pinned_channel }});

  if (messageAlreadySaved) return;
  await PinnedMessage.create({
    client_message_id: item.client_message_id,
    pinned_by: item.pinned_by,
    workspace_id: item.workspace_id,
    message: item.message,
    message_timestamp: item.message_timestamp,
    pinned_channel: item.pinned_channel
  });

  return 1;
}

const testDbConnection = async () => {
  try {
    await sequelize.authenticate();
  
    console.log("\x1b[33m[SecurePinned] Connection to Postgres has been established successfully.\x1b[0m");
  } catch (error) {
    console.error('\x1b[31m[SecurePinned] Unable to connect to the database:\x1b[0m', error);
  }
}

const validChannel = async (channel_id) => {
  const channelExist = await Channel.findOne({ where: { channel_id } });

  if (!channelExist) return false;
  return true; 
}

const getPinnedMessages = async (channel_id) => {
  const pinnedMessages = await PinnedMessage.findAll({ where: { pinned_channel: channel_id }, order: [ ['id', 'DESC']] });

  return pinnedMessages;
}

module.exports = {
  testDbConnection,
  addWorkspaceToDb,
  addChannelToWorkspace,
  savePinnedMessage,
  validChannel,
  getPinnedMessages
}
