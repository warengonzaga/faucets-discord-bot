import DiscordJS, { Channel, Intents, MessageEmbed } from 'discord.js';
import { default as config } from './config/config.json';
import { default as project } from './package.json';
import dotenv from 'dotenv';

dotenv.config();

const discordBotToken = process.env.DISCORD_BOT_TOKEN;
const discordBotStatus = process.env.DISCORD_BOT_STATUS_CHANNEL_ID;

const bot = new DiscordJS.Client({
    intents: [
        Intents.FLAGS.GUILDS,
        Intents.FLAGS.GUILD_MESSAGES,
    ]
});

bot.on('messageCreate', (message) => {
    if (message.content === 'web3') {
        message.reply({
            content: 'no, it\'s thirdweb!',
        });
    }
});

// online status
bot.on('ready', async () => {
    
    // bot activity
    bot.user?.setActivity('Community', { type: 'WATCHING' });

    // bot status
    if(config.bot_status) {
        if (discordBotStatus) {
            const channel = bot.channels.cache.get(discordBotStatus);
            const embed = new DiscordJS.MessageEmbed()
                .setTitle(config.bot_name + ' v' + project.version + ' is now online!')
                .setColor('#00ff00');
            (channel?.isText()) && channel.send({ embeds: [embed] });
        }
    }

    // bot logs
    console.log('# '+ config.bot_name + ' v' + project.version + ' is now online!');
});

// error handling
bot.on('error', (error) => {
    console.log(error);
});

// authentication
bot.login(discordBotToken);
