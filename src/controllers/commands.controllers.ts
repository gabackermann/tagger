import { mentionAll } from "../services/mention.service";
import { handleRaffleCommand } from "../services/raffle.service";

export const handleCommand = async (
  sock: any,
  remoteJid: string,
  text: string
) => {
  const args = text.trim().split(/\s+/);
  const command = args.shift()?.toLowerCase();

  if (!command) return;

  switch (command) {
    case "!m":
      await mentionAll(sock, remoteJid);
      break;

    case "!s":
      handleRaffleCommand(sock, remoteJid, args);
      break;

    default:
      return; // Ignora comandos desconhecidos
  }
};
