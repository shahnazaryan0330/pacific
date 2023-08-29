require('dotenv').config();
const {
   Client,
   IntentsBitField,
   ActionRowBuilder,
   ButtonBuilder,
   ButtonStyle,
} = require('discord.js');

const client = new Client({
   intents: [
      IntentsBitField.Flags.Guilds,
      IntentsBitField.Flags.GuildMembers,
      IntentsBitField.Flags.GuildMessages,
      IntentsBitField.Flags.MessageContent,
   ],
});

const roles = [
   [{
      id: '1145525937014837308',
      label: 'RPG',
   },
   {
      id: '1145526039741734982',
      label: 'Shooter',
   },
   {
      id: '1145526088471158845',
      label: 'Arcade',
   }],
   [{
      id: '1145526313713668166',
      label: 'Horror',
   },
   {
      id: '1145526402590978128',
      label: 'Stealth',
   },
   {
      id: '1145526465253867531',
      label: 'Platformer',
   }],
   [{
      id: '1145526570317004841',
      label: 'Strategy',
   },
   {
      id: '1145526631054708766',
      label: 'Battle Royale',
   },
   {
      id: '1145526678425186364',
      label: 'Survival',
   }]
];

client.on('ready', async (c) => {
   try {
      const channel = await client.channels.cache.get('1126191073446858822');
      if (!channel) return;

      const row = [new ActionRowBuilder(), new ActionRowBuilder(), new ActionRowBuilder()];

      roles.forEach((item, index) => {
         item.forEach(role => {
            row[index].components.push(
               new ButtonBuilder()
                  .setCustomId(role.id)
                  .setLabel(role.label)
                  .setStyle(ButtonStyle.Primary)
            );
         })
      });

      await channel.send({
         content: 'Ընտրի ամենասիրածդ ժանրերը',
         components: [...row],
      });
      process.exit();
   } catch (error) {
      console.log(error);
   }
});

client.login(process.env.TOKEN);