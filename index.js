var Discord = require('discord.js');
require('dotenv').config()
var client = new Discord.Client();
var token = process.env.TOKEN;
var commandprefix = "!"
client.login(token);