import { propagandas } from "../utils/ads";
import { associatedsGroup } from "../utils/associateds";

export const mentionAll = async (sock: any, groupJid: string) => {
  const groupMetadata = await sock.groupMetadata(groupJid);
  const participants = groupMetadata.participants.map((p: { id: any }) => p.id);

  const groupName = groupMetadata.subject;
  const associado = associatedsGroup.find((assoc) =>
    groupName.toLowerCase().includes(assoc.keyword.toLowerCase())
  );

  const propagandaAleatoria =
    propagandas[Math.floor(Math.random() * propagandas.length)];
  const invisibleChar = "\u200B";
  const mentionsText = participants.map(() => invisibleChar).join("");

  const mensagemParaFree = `\n\n-------------------\n*ADM:* marcando todos.\n${mentionsText}`;

  if (associado?.isPremium) {
    await sock.sendMessage(groupJid, {
      text: '*ADM:* marcando todos.',
      mentions: participants,
    });
  } else {
    await sock.sendMessage(groupJid, {
      image: { url: propagandaAleatoria.image },
      caption: `${propagandaAleatoria.text}${mensagemParaFree}`,
      mentions: participants,
    });
  }
};
