const qrcode = require("qrcode-terminal");
const { Client, LocalAuth } = require("whatsapp-web.js");
const logger = require("./logger");
const client = new Client({
  authStrategy: new LocalAuth(),
});

const ourGroupId = "923054496675-1537473829@g.us";
const AbdullahJauhar = "923164954392@c.u";
const autoGeneratedText =
  "\n\n\n[ This is an Auto-generated Text ]\n" +
  "[ generated by eid-mubarak-reply-bot ]\n";

client.on("qr", (qr) => {
  qrcode.generate(qr, { small: true });
});

client.on("ready", () => {
  logger.info(`Client Ready!`);
  const newMessage = "Client started! \n" + autoGeneratedText;
  client.sendMessage("923045032467@c.us", newMessage);
});
client.on("authenticated", () => {
  logger.info("AUTHENTICATED");
});

client.on("message", (message) => {
  logger.info(`CHAT_ID: ${message.from}, AUTHOR: ${message.author}`);
  const messageText = message.body.toLowerCase();
  if (messageText.includes("eid") && messageText.includes("mubarak")) {
    const newMessage = "Khair Mubarak!\n" + autoGeneratedText;
    message.reply(newMessage);
  }
  if (message.from === ourGroupId && message.author === AbdullahJauhar) {
    message.reply("Chup kr kuttay!");
  }
});
client.on("ready", async () => {
  const me = (await client.getContacts()).filter((c) => c.isMe)[0];
  console.log(me);
  console.log(await me.getChat());
  client.sendMessage(me.id._serialized, "Hola!!");
});

client.initialize();
