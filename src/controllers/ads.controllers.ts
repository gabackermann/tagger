import { scheduleDailyAds } from "../services/advertising.service";
import { associatedsGroup } from "../utils/associateds";

export const startAds = async (sock: any) => {
  try {
    const chats = await sock.groupFetchAllParticipating();
    const groupArr = Object.values(chats);

    const matchingGroups = groupArr.filter((group: any) => {
      if (!group.id.includes("@g.us")) return false; // Filtra grupos que não são grupos

      const groupName = group.subject.toLowerCase();
      return associatedsGroup.some((associated) =>
        groupName.includes(associated.keyword.toLowerCase())
      );
    });

    const matchingGroupIds = matchingGroups.map((group: any) => group.id);

    scheduleDailyAds(sock, matchingGroupIds);
    console.log("Processo de busca de grupos concluído.");
  } catch (error) {
    console.error("Erro ao buscar grupos:", error);
  }
};
