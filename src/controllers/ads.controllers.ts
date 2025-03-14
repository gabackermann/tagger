import { scheduleDailyAds } from "../services/advertising.service";
import { propagandasSemMencionar } from "../utils/ads";
import { associatedsGroup } from "../utils/associateds";
import { format } from "date-fns-tz";

const TIME_ZONE = "America/Sao_Paulo";

export const startAds = async (sock: any) => {
  try {
    const now = new Date();
    const currentHour = parseInt(format(now, "H", { timeZone: TIME_ZONE }));
    const currentMinute = parseInt(format(now, "m", { timeZone: TIME_ZONE }));

    const adMessage = propagandasSemMencionar.find(
      (ad) => ad.hour === currentHour && ad.minute === currentMinute
    );

    if (!adMessage) {
      console.log("⏳ Nenhuma propaganda programada para este horário.");
      return;
    }

    const chats = await sock.groupFetchAllParticipating();
    const groupArr = Object.values(chats);

    const matchingGroups = groupArr.filter((group: any) => {
      if (!group.id.includes("@g.us")) return false;

      const groupName = group.subject.toLowerCase();
      return associatedsGroup.some((associated) =>
        groupName.includes(associated.keyword.toLowerCase())
      );
    });

    const matchingGroupIds = matchingGroups.map((group: any) => group.id);
    console.log(
      `🔍 Encontrados ${matchingGroupIds.length} grupos para anúncios.`
    );

    if (matchingGroupIds.length === 0) {
      console.log(
        "🚫 Nenhum grupo associado encontrado para envio de anúncio."
      );
      return;
    }

    await scheduleDailyAds(sock, matchingGroupIds, adMessage);
    console.log(`📢 Anúncio enviado: "${adMessage.message}"`);
  } catch (error) {
    console.error("❌ Erro ao buscar grupos:", error);
  }
};
