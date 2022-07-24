const { Client, LocalAuth } = require("whatsapp-web.js");
const logger = require("./logger");
const path = require("path");
const client = new Client({
  authStrategy: new LocalAuth({ dataPath: path.join(__dirname, "/session") }),
});
const cron = require("node-cron");

const ourGroupId = "923054496675-1537473829@g.us";
const AbdullahJauhar = "923164954392@c.us";
const autoGeneratedText =
  "\n\n\n[ This is an Auto-generated Text ]\n" +
  "[ generated by eid-mubarak-reply-bot by sameer]\n";

const goodNightMessage = "Good Night!";
const goodMorningMessage = "Good Morning!";

const createClient = () => {
  const sendMessageToGroup = async (client, message) => {
    const grpchat = await client.getChatById(ourGroupId);
    let text = `${message}\n`;
    let mentions = [];
    console.log(grpchat);
    for (let participant of grpchat.participants) {
      const contact = await client.getContactById(participant.id._serialized);
      mentions.push(contact);
      text += `@${participant.id.user} `;
    }
    await grpchat.sendMessage(text, { mentions });
  };

  client.on("ready", () => {
    logger.info(`Client Ready!`);
    const newMessage = "Client started! \n" + autoGeneratedText;
    client.sendMessage("923045032467@c.us", newMessage);

    cron.schedule(
      "0 0 * * *",
      () => {
        sendMessageToGroup(client, goodNightMessage);
        console.log("hello");
      },
      {
        timezone: "Asia/Karachi",
      }
    );
    cron.schedule(
      "0 10 * * *",
      () => sendMessageToGroup(client, goodMorningMessage),
      {
        timezone: "Asia/Karachi",
      }
    );
  });
  client.on("authenticated", () => {
    logger.info("AUTHENTICATED");
  });

  client.on("message", async (message) => {
    logger.info(`CHAT_ID: ${message.from}, AUTHOR: ${message.author}`);
    const messageText = message.body.toLowerCase();
    if (messageText.includes("eid") && messageText.includes("mubarak")) {
      const newMessage = "Khair Mubarak!\n" + autoGeneratedText;
      message.reply(newMessage);
    }
  });
  client.on("ready", async () => {
    const me = (await client.getContacts()).filter((c) => c.isMe)[0];
    console.log(me);
    console.log(await me.getChat());
    client.sendMessage(me.id._serialized, "Hola!!");
  });
  return client;
};

module.exports = createClient;
