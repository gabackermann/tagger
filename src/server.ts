import express from "express";
import { connectToWhatsApp } from "./services/whatsapp.service";

const app = express();
app.use(express.json());

const PORT = 3002;

connectToWhatsApp();

app.get("/", (req, res) => {
  res.send("WhatsApp Bot is running!");
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
