require('dotenv').config();
const fs = require('node:fs');
const path = require('node:path');
const { Client, IntentsBitField, Collection, Events, GatewayIntentBits, EmbedBuilder } = require('discord.js');
const { token } = require('./config.json');

const client = new Client({
   intents: [
      GatewayIntentBits.Guilds,
      IntentsBitField.Flags.Guilds,
      IntentsBitField.Flags.GuildMembers,
      IntentsBitField.Flags.GuildMessages,
      IntentsBitField.Flags.MessageContent,
   ],
});

client.once(Events.ClientReady, () => {
   console.log('Ready!');
});

// client.commands = new Collection();
// const foldersPath = path.join(__dirname, 'commands');
// const commandFolders = fs.readdirSync(foldersPath);

// for (const folder of commandFolders) {
//    const commandsPath = path.join(foldersPath, folder);
//    const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));
//    for (const file of commandFiles) {
//       const filePath = path.join(commandsPath, file);
//       const command = require(filePath);
//       if ('data' in command && 'execute' in command) {
//          client.commands.set(command.data.name, command);
//       } else {
//          console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
//       }
//    }
// }

// Slash commands response
// client.on(Events.InteractionCreate, async interaction => {
//    if (!interaction.isChatInputCommand()) return;

//    const command = client.commands.get(interaction.commandName);

//    if (!command) return;

//    try {
//       await command.execute(interaction);
//    } catch (error) {
//       console.error(error);
//       if (interaction.replied || interaction.deferred) {
//          await interaction.followUp({ content: 'There was an error while executing this command!', ephemeral: true });
//       } else {
//          await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
//       }
//    }
// });

client.on('ready', (c) => {
   console.log(`✅ ${c.user.tag} is online.`);
});

//welcome user
client.on('guildMemberAdd', async member => {
   const channel = await client.channels.cache.get('1126189252066164888');
   if (!channel) return;

   const rules_channel = client.channels.cache.get('1126190953816920145')
   const roles_channel = client.channels.cache.get('1126191073446858822')

   const message = `
Բարի գալուստ ${member}
   Կարդա կանոնները ${rules_channel}
   Վերցրու ռոլեր ${roles_channel}
`

   channel.send({
      content: message
   });
})

// Button roles
client.on('interactionCreate', async (interaction) => {
   try {
      if (!interaction.isButton()) return;
      await interaction.deferReply({ ephemeral: true });

      const role = interaction.guild.roles.cache.get(interaction.customId);
      if (!role) {
         interaction.editReply({
            content: "Error",
         });
         return;
      }

      const hasRole = interaction.member.roles.cache.has(role.id);

      if (hasRole) {
         await interaction.member.roles.remove(role);
         await interaction.editReply(`${role} Ջնջվեց`);
         return;
      }

      await interaction.member.roles.add(role);
      await interaction.editReply(`${role} ավելացվեց`);
   } catch (error) {
      console.log(error);
   }
});

client.login(process.env.TOKEN);