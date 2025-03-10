const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const scheduleDailyAds = async (sock: any, groupIds: any[]) => {
  console.log("🚀 Iniciando envio de mensagens publicitárias...");

  for (let i = 0; i < groupIds.length; i++) {
    let groupToSend = groupIds[i];

    try {
      await sock.sendMessage(groupToSend, {
        text: "Oferecimento, Ilha Cinnabar, entre no grupo: https://chat.whatsapp.com/EQMnd8NP9HUBDH6RY14202",
      });
      console.log(`✅ Mensagem enviada para o grupo: ${groupToSend}`);

      await sleep(120000);
    } catch (error) {
      console.error(`❌ Erro ao enviar mensagem para o grupo ${groupToSend}:`, error);
    }
  }

  console.log("📢 Todas as mensagens foram enviadas com sucesso!");
};
