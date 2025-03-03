export const mentionAll = async (sock: any, groupJid: string) => {
    const groupMetadata = await sock.groupMetadata(groupJid);
    const participants = groupMetadata.participants.map((p: { id: any; }) => p.id);
  
    const invisibleChar = "\u200B";
    const mentionsText = participants.map(() => invisibleChar).join("");
  
    await sock.sendMessage(groupJid, {
      text: `MARCANDO TODOS\n${mentionsText}`,
      mentions: participants,
    });
  };
  