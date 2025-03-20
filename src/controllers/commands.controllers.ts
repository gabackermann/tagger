import { isBotAlive } from "../services/alive.service";
import { mentionAll } from "../services/mention.service";
import { handleRaffleCommand } from "../services/raffle.service";
import {
  startAuction,
  registrarLance,
  proximaCarta,
  finalizarLeilao,
} from "../services/auction.service";

export const handleCommand = async (
  sock: any,
  remoteJid: string,
  text: string,
  isGroupPremium: boolean,
  mensagem: any
) => {
  const args = text.trim().split(/\s+/);
  const command = args.shift()?.toLowerCase();
  if (!command) return;

  switch (command) {
    case "!m":
      await mentionAll(sock, remoteJid);
      break;

    case "!s":
      await handleRaffleCommand(sock, remoteJid, args);
      break;

    case "!on":
      await isBotAlive(sock, remoteJid);
      break;

    case "!sa":
      await startAuction(sock, remoteJid);
      break;

    case "!l":
      await registrarLance(sock, mensagem);
      break;

    case "!n":
      await proximaCarta(sock);
      break;

    case "!end":
      await finalizarLeilao(sock);
      break;

    default:
      return;
  }
};
