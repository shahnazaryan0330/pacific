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
      id: '1126203726999326760',
      label: 'Apex Legends',
   },
   {
      id: '1126203898395369503',
      label: 'Valorant',
   },
   {
      id: '1126204017912053761',
      label: 'Fortnite',
   },
   {
      id: '1126204123289767997',
      label: 'Counter Strike',
   }],
   [{
      id: '1126204597103493183',
      label: 'Cyberpunk',
   },
   {
      id: '1126204753337135226',
      label: 'The Witcher',
   },
   {
      id: '1126234624109052047',
      label: 'GTA',
   },
   {
      id: '1126235414592753784',
      label: 'The Elder Scrolls',
   }],
   [{
      id: '1126235528233226250',
      label: 'RDR',
   },
   {
      id: '1145525409799221398',
      label: 'Call of Duty',
   },
   {
      id: '1145525566783639562',
      label: 'Warframe',
   },
   {
      id: '1145525603244703795',
      label: 'Diablo',
   }],
   [{
      id: '1145525760203952129',
      label: 'Battlefield',
   }]
];

client.on('ready', async (c) => {
   try {
      const channel = await client.channels.cache.get('1126191073446858822');
      if (!channel) return;

      const row = [
         new ActionRowBuilder(),
         new ActionRowBuilder(),
         new ActionRowBuilder(),
         new ActionRowBuilder(),
      ];

      roles.forEach((item, index) => {
         item.forEach(role => {
            row[index].components.push(
               new ButtonBuilder()
                  .setCustomId(role.id)
                  .setLabel(role.label)
                  .setStyle(ButtonStyle.Success)
            );
         })
      });

      await channel.send({
         content: 'Ընտրի ամենասիրածդ խաղերը',
         components: [...row],
      });
      process.exit();
   } catch (error) {
      console.log(error);
   }
});

client.login(process.env.TOKEN);