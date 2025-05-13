import makeWASocket, {
  useMultiFileAuthState,
  DisconnectReason,
} from "@whiskeysockets/baileys";
import qrcode from "qrcode-terminal";
import { handleMessage } from "../controllers/message.controllers";
// import { pino } from "pino";

let sock: any;

export const connectToWhatsApp = async () => {
  const { state, saveCreds } = await useMultiFileAuthState("./auth_info");

  sock = makeWASocket({
    auth: state,
    printQRInTerminal: true,
    browser: ["Firefox", "MacOS", "117"],
    connectTimeoutMs: 300_000,
    syncFullHistory: false,
    // logger: pino({ level: "warn" }),
  });

  sock.ev.on("creds.update", saveCreds);

  sock.ev.on(
    "connection.update",
    (update: { connection: any; lastDisconnect: any }) => {
      const { connection, lastDisconnect } = update;
      if (connection === "close") {
        const shouldReconnect =
          (lastDisconnect?.error as any)?.output?.statusCode !==
          DisconnectReason.loggedOut;
        if (shouldReconnect) {
          connectToWhatsApp();
        }
      } else if (connection === "open") {
        console.log("✅ Conectado ao WhatsApp!");
      }
    }
  );

  sock.ev.on("messages.upsert", async (m: any) => {
    await handleMessage(sock, m);
  });

  sock.ev.on("qr", (qr: string) => {
    qrcode.generate(qr, { small: true });
  });
};
