export const isBotAlive = async (sock: any, groupJid: string) => {
  await sock.sendMessage(groupJid, {
    text: "Magikarp karp .. karp",
  });
};
