export const isBotAlive = async (sock: any, groupJid: string) => {
  await sock.sendMessage(groupJid, {
    text: "eu ainda estou aqui..",
  });
};
