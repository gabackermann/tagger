import { isRegisteredGroup, isUserAdmin } from "../services/group.service";
import { getGroupMetadata } from "../services/groupMetadata.service";
import { availableCommands } from "../utils/avaibleCommands";
import { handleCommand } from "./commands.controllers";

export const handleMessage = async (sock: any, m: any) => {
  const message = m.messages[0];
  if (!message.message) return;

  const remoteJid = message.key.remoteJid;
  if (!remoteJid?.endsWith("@g.us")) return;

  const text =
    message.message.conversation || message.message.extendedTextMessage?.text;
  if (!text) return;

  const lowerText = text.toLowerCase();
  const command = availableCommands.find((cmd) => lowerText.includes(cmd));
  const isLink = /https?:\/\/\S+/i.test(text);

  if (!isLink && !command) return;

  const groupMetadata = await getGroupMetadata(sock, remoteJid);
  if (!groupMetadata) return;

  const groupIsValid = await isRegisteredGroup(groupMetadata);
  if (!groupIsValid) return;

  const isGroupPremium = groupIsValid.isPremium;

  const haveSpamControl = groupIsValid.spamControl;


  if (command) {
    const sender = message.key.participant || message.participant;
    const isAdmin = await isUserAdmin(groupMetadata, sender);

    if (isAdmin) {
      await handleCommand(sock, remoteJid, text, isGroupPremium, message);
    }
  }
};
