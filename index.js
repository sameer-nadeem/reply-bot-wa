const qrcode = require("qrcode-terminal");
const express = require("express");
const app = express();
// eslint-disable-next-line
const PORT = process.env.PORT || 3000;
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
