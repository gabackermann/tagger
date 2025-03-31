export const isBotAlive = async (sock: any, groupJid: string) => {
  await sock.sendMessage(groupJid, {
    text: "Seu assistente virtual está *online*",
  });
};
