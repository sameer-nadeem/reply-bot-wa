const qrcode = require("qrcode-terminal");
const credentials = require("./credentials.json");
const axios = require("axios");
const moment = require("moment");
const GOOGLE_CALENDAR_API_KEY = credentials.api_key;
const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;
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
let qrCodeStr = "yet-to-be-generated";
const createClient = require("./messageHandler");
const client = createClient();
client.on("qr", (qr) => {
  qrcode.generate(qr, { small: true });
  qrCodeStr = qr;
});
client.initialize();
app.get("/", (req, res) => res.send(qrCodeStr));

app.listen(PORT);
