import { propagandas } from "../utils/ads";

export const mentionAll = async (sock: any, groupJid: string) => {
  const groupMetadata = await sock.groupMetadata(groupJid);
  const participants = groupMetadata.participants.map((p: { id: any }) => p.id);

  const propagandaAleatoria =
    propagandas[Math.floor(Math.random() * propagandas.length)];

  const invisibleChar = "\u200B";
  const mentionsText = participants.map(() => invisibleChar).join("");

  await sock.sendMessage(groupJid, {
    image: { url: propagandaAleatoria.image },
    caption: `${propagandaAleatoria.text}\n\n\n-------------------\n🔹 *MARCANDO TODOS!* 🔹\n${mentionsText}`,
    mentions: participants,
  });
};
