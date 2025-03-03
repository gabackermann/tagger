import { isUserAdmin } from "../services/group.service";
import { mentionAll } from "../services/mention.service";

export const handleMessage = async (sock: any, m: any) => {
  const message = m.messages[0];
  if (!message.message) return;

  const remoteJid = message.key.remoteJid;
  const text =
    message.message.conversation || message.message.extendedTextMessage?.text;

  // Apenas processa mensagens de grupos
  if (!remoteJid?.endsWith("@g.us")) return;

  const sender = message.key.participant || message.participant;

  // Verifica se é admin
  const isAdmin = await isUserAdmin(sock, remoteJid, sender);

  if (isAdmin && text?.toLowerCase() === "!mencionar") {
    await mentionAll(sock, remoteJid);
  }
};
