import { WASocket } from "@whiskeysockets/baileys";
import pLimit from "p-limit";

const adsMessage = async (sock: WASocket, groupId: any, adMessage: any) => {
  try {
    if (adMessage.image) {
      await sock.sendMessage(groupId, {
        image: { url: adMessage.image },
        caption: adMessage.message,
      });
    } else {
      await sock.sendMessage(groupId, {
        text: adMessage.message,
      });
    }

    console.log(`📢 Mensagem enviada para o grupo: ${groupId}`);
  } catch (e) {
    console.error(`❌ Falhou ao enviar mensagem para o grupo: ${groupId}`, e);
  }
};

export const scheduleDailyAds = async (
  sock: WASocket,
  groupIds: any[],
  adMessage: any
) => {
  console.log(`📢 Enviando anúncio: ${adMessage.message}`);

  const limit = pLimit(5);

  const tasks = groupIds.map((groupId, index) =>
    limit(
      () =>
        new Promise((resolve) => {
          setTimeout(async () => {
            await adsMessage(sock, groupId, adMessage);
            resolve(null);
          }, index * 2000);
        })
    )
  );

  await Promise.all(tasks);
  console.log("✅ Todas as mensagens foram enviadas com sucesso!");
};
