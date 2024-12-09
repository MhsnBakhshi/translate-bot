const { homeMenu } = require("./components/inlineKeyboardsMakerHandlers");
const TelegramBot = require("node-telegram-bot-api");
require("dotenv").config();
const token = process.env.BOT_TOKEN;

const bot = new TelegramBot(token, { polling: true });

bot.onText("/start", (data) => homeMenu(bot, data));
