//index.js code for integrating Google Calendar

const credentials = require("./credentials.json");
const axios = require("axios");
const moment = require("moment");
const GOOGLE_CALENDAR_API_KEY = credentials.api_key;
const cron = require("node-cron");

const getPublicHolidays = async () => {
  const { data } = await axios.get(
    `https://www.googleapis.com/calendar/v3/calendars/en.pk%23holiday%40group.v.calendar.google.com/events?key=${GOOGLE_CALENDAR_API_KEY}`
  );
  const currentDate = moment().format("YYYY-MM-DD");

  const publicHolidays = data.items.filter(
    (holiday) => holiday.start.date === currentDate
  );

  return publicHolidays;
};

require("./messageHandler");

// cron.schedule("*/1 * * * * *", () => console.log("Cron Job ran", new Date()), {
//   timezone: "Asia/Karachi",
// });
