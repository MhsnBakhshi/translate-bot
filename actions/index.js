const {
  homeMenuKeyboard,
} = require("../components/inlineKeyboardsMakerHandlers");
const { redis } = require("../configs/db");

const homeMenuAction = (bot, data) => {
  const keyboards = homeMenuKeyboard;

  bot.sendMessage(
    data.chat.id,
    `سلام ${data.chat.first_name} عزیز به ربات مترجم خوش اومدی!\n  یکی از گزینه های پایین انتخاب کن:`,
    keyboards
  );
};

const setTranslatorAction = async (
  bot,
  field,
  chatId,
  messageId,
  message,
  keyboard,
  command
) => {
  const inline_keyboard = keyboard;
  await redis.set(`user: ${chatId} ${field}:`, command);

  bot.editMessageText(message, {
    chat_id: chatId,
    message_id: messageId,
    reply_markup: inline_keyboard.reply_markup,
  });
};

module.exports = {
  homeMenuAction,
  setTranslatorAction,
};
