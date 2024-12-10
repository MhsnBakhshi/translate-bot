const homeMenuKeyboard = {
  reply_markup: {
    inline_keyboard: [
      [{ text: "ترجمه با موتور Google 📲", callback_data: "/google" }],
      [{ text: "ترجمه با موتور Microsoft 📳", callback_data: "/microsoft" }],
    ],
  },
};
const googleMenuKeyboard = {
  reply_markup: {
    inline_keyboard: [
      [{ text: "انگلیسی 🏴󠁧󠁢󠁥󠁮󠁧󠁿", callback_data: "en" }],
      [{ text: "فارسی 🇮🇷", callback_data: "fa" }],
    ],
  },
};

const microsoftMenuKeyboard = {
  reply_markup: {
    inline_keyboard: [
      [{ text: "انگلیسی 🏴󠁧󠁢󠁥󠁮󠁧󠁿", callback_data: "en" }],
      [{ text: "فارسی 🇮🇷", callback_data: "fa" }],
    ],
  },
};

module.exports = {
  googleMenuKeyboard,
  microsoftMenuKeyboard,
  homeMenuKeyboard,
};
