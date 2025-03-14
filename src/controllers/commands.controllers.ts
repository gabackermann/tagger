import { isBotAlive } from "../services/alive.service";
import { mentionAll } from "../services/mention.service";
import { handleRaffleCommand } from "../services/raffle.service";
// import { Ads } from "../utils/ads";

export const handleCommand = async (
  sock: any,
  remoteJid: string,
  text: string,
  isGroupPremium: boolean
) => {
  const args = text.trim().split(/\s+/);
  const command = args.shift()?.toLowerCase();

  if (!command) return;

  // if (!isGroupPremium && Math.random() < 0.7) {
  //   await Ads(sock, remoteJid);
  // }

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

    default:
      return;
  }
};
