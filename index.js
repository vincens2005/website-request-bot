var Discord = require('discord.js');
require('dotenv').config()
var client = new Discord.Client();
var token = process.env.TOKEN;
var prefix = "!"

/*client.on('message', message => {

if (!message.content.startsWith(prefix) || message.author.bot) {
	message.channel.send('Worked!')
};
const args = message.content.slice(prefix.length).trim().split(' ');
const command = args.shift().toLowerCase();
});*/

client.on('message', message => {

    if (!message.content.startsWith(prefix) || message.author.bot) return;

    const args = message.content.slice(prefix.length).trim().split(' ');
    const command = args.shift().toLowerCase();

    if (message.content === `${prefix}ping`) {
        message.channel.send('Pong.');
    } else if (command === 'request') {
        if (!args.length) {
            return message.channel.send(`You didn't provide any arguments, ${message.author}!`);
        } else if (args[0] === 'foo') {
            return message.channel.send('bar');
        } else if (args[0] === 'bar') {
            return message.channel.send('lel');
        }




        message.channel.send(`Command name: ${command}\nArguments: ${args}`);
    }
});


client.login(token);