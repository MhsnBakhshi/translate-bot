const homeMenu = (bot, data) => {
  const homeInlineKeyboard = {
    reply_markup: {
      inline_keyboard: [
        [{ text: "google", callback_data: "/google" }],
        [{ text: "microsoft", callback_data: "/google" }],
      ],
    },
  };

  bot.sendMessage(
    data.chat.id,
    `سلام ${data.chat.first_name} به ربات مترجم خوش اومدی!`,
    homeInlineKeyboard
  );
};

module.exports = {
  homeMenu,
};
