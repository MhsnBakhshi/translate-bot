const components = require("./components/inlineKeyboardsMakerHandlers");
const TelegramBot = require("node-telegram-bot-api");
const { connectToDB, redis } = require("./configs/db");
const axios = require("axios");
require("dotenv").config();
const {
  homeMenuAction,
  setTranslatorAction,
  sendLangAction,
} = require("./actions/index");

const apiToken = process.env.API_TOKEN;
const token = process.env.BOT_TOKEN;

const bot = new TelegramBot(token, { polling: true });

bot.onText("/start", (data) => homeMenuAction(bot, data));

bot.on("callback_query", async (query) => {
  const actions = ["/google", "/microsoft"];
  const langs = ["fa", "en"];

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

  if (langs.includes(command)) {
    sendLangAction(
      bot,
      chatId,
      command,
      "حالا متنی که میخواهی ترجمه بشه رو بفرست.ّ"
    );
  }
});

bot.on("message", async (data) => {
  const chatId = data.chat.id;
  const text = data.text;

  if (!text.startsWith("/")) {
    const action = await redis.get(`user: ${chatId} action:`);
    const lang = await redis.get(`user: ${chatId} lang:`);

    if (action && lang) {
      const response = await axios.post(
        `https://api.one-api.ir/translate/v1${action}`,
        {
          source: lang === "en" ? "fa" : "en",
          target: lang === "en" ? "en" : "fa",
          text,
        },
        {
          headers: {
            "one-api-token": apiToken,
            "Content-Type": "application/json",
          },
        }
      );

      const data = response.data.result;

      bot.sendMessage(
        chatId,
        `ترجمه انجام شد 🥳🥳

متن ارسالی 👇:\n ${text}

متن ترجمه شده 👇:\n ${data}`
      );

      await redis.del(`user: ${chatId} lang:`);
      await redis.del(`user: ${chatId} action:`);
    }

    homeMenuAction(bot, data);
  }
});

bot.on("polling_error", (err) =>
  console.log("You Have Polling Error => ", err)
);

bot.on("error", (err) => console.log("You Have General Error => ", err));

connectToDB();
console.log("Bot Ruunging ...");
