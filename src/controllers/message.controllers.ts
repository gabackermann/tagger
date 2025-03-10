import { isRegisteredGroup, isUserAdmin } from "../services/group.service";
import { getGroupMetadata } from "../services/groupMetadata.service";
import { isRegisteredResponsible } from "../utils/associateds";
import { availableCommands } from "../utils/avaibleCommands";
import { handleCommand } from "./commands.controllers";
import { handlePrivateCommand } from "./privacy.controllers";

export const handleMessage = async (sock: any, m: any) => {
  const message = m.messages[0];
  if (!message.message) return;

  const remoteJid = message.key.remoteJid;

  const text =
    message.message.conversation || message.message.extendedTextMessage?.text;

  if (!text) return;

  const lowerText = text.toLowerCase();
  const command = availableCommands.find((cmd) => lowerText.includes(cmd));
  if (!command) return;

  const sender = message.key.participant || message.participant;
  if (remoteJid?.endsWith("@g.us")) {
    const groupMetadata = await getGroupMetadata(sock, remoteJid);

    if (!groupMetadata) return;

    const groupIsValid = await isRegisteredGroup(groupMetadata);

    const isAdmin = await isUserAdmin(groupMetadata, sender);

    if (isAdmin && groupIsValid) {
      await handleCommand(sock, remoteJid, text);
    }
  }

  // if (remoteJid?.endsWith("@s.whatsapp.net")) {
  //   console.log("teste");
  //   return
  //   const senderId = remoteJid.replace("@s.whatsapp.net", "");
  //   const isRegistered = isRegisteredResponsible(senderId);
  //   if (isRegistered) {
  //     await handlePrivateCommand(sock, remoteJid, text, senderId);
  //   }
  // }
};