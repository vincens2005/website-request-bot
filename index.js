var Discord = require('discord.js');
require('dotenv').config()
var client = new Discord.Client();
var token = process.env.TOKEN;
var prefix = "!";
var commission_channel;
var req_channel;
var requests = [];
/*client.on('message', message => {

if (!message.content.startsWith(prefix) || message.author.bot) {
    message.channel.send('Worked!')
};
const args = message.content.slice(prefix.length).trim().split(' ');
const command = args.shift().toLowerCase();
});*/

client.on('message', message => {

    if (!message.content.startsWith(prefix) || message.author.bot) return;

    var args = message.content.slice(prefix.length).trim().split(/\s(?=(?:(?:[^"]*"){2})*[^"]*$)/);
    var command = args.shift().toLowerCase();

    if (message.content == `${prefix}ping`) {
        message.channel.send('Pong.');
    }
    else if (command == 'request') {
        if (!args.length) {
            return message.channel.send(`You didn't provide any arguments, ${message.author}!`);
        }
        if (args[0] != "bot" && args[0] != "website") {
            return message.channel.send("Request must be a bot or website")
        }
        var current_req = {
            type: args[0],
            note: args[1] || "no note",
            author: message.author.id
        }

        commission_channel.send(`New request for a ${current_req.type} by <@${current_req.author}>. \n${current_req.note}.\nReact with :white_check_mark: to accept`).then((a) => {
            a.react("✅")
            current_req.messageid = a.id
            console.log(a.id)
            requests.push(current_req)
        })
        //message.channel.send(`Command name: ${command}\nArguments: ${args}`);
    }
    else if (command == "help") {
        message.channel.send("Hello. I am the request bot. To use me just type: \n`!request website/bot \"my special request here\"`. \nThe note is optional. \nYou may request a website or bot. \nI will ping you when one of the devs accepts your request.")
    }
});

client.on('ready', () => {
    commission_channel = client.channels.cache.get("814265310911266816");
    req_channel = client.channels.cache.get("814348254447271936");
    console.log("logged in!")
});

client.on('messageReactionAdd', (reaction, user) => {
    if (user.bot) return;
    if (reaction.emoji.name != "✅") return;
    var request = requests.find(a => a.messageid == reaction.message.id)
    if (!request) return;
    var requestindex = requests.indexOf(requests);
    requests.splice(requestindex, 1);
    req_channel.send(`<@${request.author}> Your request for a ${request.type} has been accepted by <@${user.id}>. DM them for further details`)
})
client.login(token);
