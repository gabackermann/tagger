import express from "express";
import { connectToWhatsApp } from "./services/whatsapp.service";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 3000;

// Inicia conexão com WhatsApp
connectToWhatsApp();

// Rota de status
app.get("/", (req, res) => {
  res.send("WhatsApp Bot is running!");
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
