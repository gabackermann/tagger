import { isRegisteredGroup, isUserAdmin } from "../services/group.service";
import { getGroupMetadata } from "../services/groupMetadata.service";
import { mentionAll } from "../services/mention.service";

export const handleMessage = async (sock: any, m: any) => {
  const message = m.messages[0];
  if (!message.message) return;

  const remoteJid = message.key.remoteJid;
  const text =
    message.message.conversation || message.message.extendedTextMessage?.text;

  if (text?.toLowerCase() !== "!m") return;
  if (!remoteJid?.endsWith("@g.us")) return;

  // 🔹 Obtém metadados do grupo com cache
  const groupMetadata = await getGroupMetadata(sock, remoteJid);
  console.log("📊 Dados do grupo:", groupMetadata);

  if (!groupMetadata) return;

  const sender = message.key.participant || message.participant;
  const groupIsValid = await isRegisteredGroup(groupMetadata);
  console.log("Grupo registrado?", groupIsValid);

  const isAdmin = await isUserAdmin(groupMetadata, sender);
  console.log(`👮 ${sender} é admin?`, isAdmin);

  if (isAdmin && groupIsValid) {
    await mentionAll(sock, remoteJid);
  }
};