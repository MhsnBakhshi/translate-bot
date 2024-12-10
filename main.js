const components = require("./components/inlineKeyboardsMakerHandlers");
const { homeMenuAction, setTranslatorAction } = require("./actions/index");
const TelegramBot = require("node-telegram-bot-api");
const { connectToDB } = require("./configs/db");
require("dotenv").config();
const token = process.env.BOT_TOKEN;

const bot = new TelegramBot(token, { polling: true });

bot.onText("/start", (data) => homeMenuAction(bot, data));

bot.on("callback_query", async (query) => {
  const actions = ["/google", "/microsoft"];

  const command = query.data;
  const chatId = query.message.chat.id;
  const messageId = query.message.message_id;

  if (actions.includes(command)) {
    await setTranslatorAction(
      bot,
      "action",
      chatId,
      messageId,
      "حالا زبان مورد نظر خود را انتخاب کنید:",
      components[`${command.slice(1)}MenuKeyboard`],
      command
    );
  }
});

bot.on("polling_error", (err) =>
  console.log("You Have Polling Error => ", err)
);

bot.on("error", (err) =>
  console.log("You Have General Error => ", err)
);

connectToDB();
console.log("Bot Ruunging ...");
