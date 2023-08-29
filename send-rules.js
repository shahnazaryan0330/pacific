require('dotenv').config();

const {
   Client,
   IntentsBitField,
} = require('discord.js');

const client = new Client({
   intents: [
      IntentsBitField.Flags.Guilds,
      IntentsBitField.Flags.GuildMembers,
      IntentsBitField.Flags.GuildMessages,
      IntentsBitField.Flags.MessageContent,
   ],
});

client.on('ready', async (c) => {
   try {
      const channel = await client.channels.cache.get('1126190953816920145');
      if (!channel) return;



      await channel.send({
         content: `
‼️ԿԱՆՈՆՆԵՐ

🔹 Լինել ադեկվատ
         
🔹 Հարգել սերվերի անդամներին
         
🔹 Պահպանել չատի տարրական կանոնները (ֆլուդ չանել, caps չչարաշահել, սպամ չանել)
         
🔹 Միմյանց տեգ չանել առանց պատճառ
         
🔹 Անձնական խնդիրները չքննարկել սերվերում
         
⚠️  Կանոնները խախտելու դեպքում Block կամ Mute ⚠️` ,
      });
      process.exit();
   } catch (error) {
      console.log(error);
   }
});

client.login(process.env.TOKEN);