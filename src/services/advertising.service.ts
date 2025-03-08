import { format, toZonedTime } from "date-fns-tz";
import { addDays, differenceInMilliseconds, set } from "date-fns";

const MESSAGE =
  "Você sabia que o Ilha Cinnabar se esforça diariamente para trazer o melhor bot para comunidade? Para isso a gente precisa muito de ajuda nos eventos do grupo (rifa, leilão, entre vários outros), nos dê essa mão. Entre: https://chat.whatsapp.com/EQMnd8NP9HUBDH6RY14202";
const GIF_URL =
  "https://i.pinimg.com/originals/f8/9b/12/f89b1208e837a8f7fc6b08b433b1efcb.gif";
const HOUR_TO_SEND = 19;
const MINUTES_TO_SEND = 30;
const TIME_ZONE = "America/Sao_Paulo";

export const sendAdvertisements = async (sock: any, groupIds: string[]) => {
  console.log("Iniciando envio de mensagens publicitárias...");

  for (const [index, groupId] of groupIds.entries()) {
    setTimeout(async () => {
      try {
        console.log(`📢 Enviando mensagem para ${groupId}...`);

        // Envia o GIF diretamente da web com a legenda
        await sock.sendMessage(groupId, {
          image: { url: GIF_URL },
          caption: MESSAGE,
        });

        console.log(`✅ GIF e mensagem enviados para ${groupId}`);
      } catch (error) {
        console.error(`❌ Erro ao enviar para ${groupId}:`, error);
      }
    }, index * 35000);
  }
};

export const scheduleDailyAds = (sock: any, groupIds: string[]) => {
  const nowUtc = new Date();
  const nowSaoPaulo = toZonedTime(nowUtc, TIME_ZONE);

  console.log(
    `🕰 Horário atual em São Paulo: ${format(
      nowSaoPaulo,
      "dd/MM/yyyy HH:mm:ss",
      { timeZone: TIME_ZONE }
    )}`
  );

  const targetTimeSaoPaulo = set(nowSaoPaulo, {
    hours: HOUR_TO_SEND,
    minutes: MINUTES_TO_SEND,
    seconds: 0,
    milliseconds: 0,
  });

  console.log(
    `⏳ Horário agendado para envio de anúncios: ${format(
      targetTimeSaoPaulo,
      "dd/MM/yyyy HH:mm:ss",
      { timeZone: TIME_ZONE }
    )}`
  );

  let delay = differenceInMilliseconds(targetTimeSaoPaulo, nowSaoPaulo);

  if (delay < 0) {
    console.log(`⏳ O horário já passou hoje, agendando para o próximo dia.`);
    delay = differenceInMilliseconds(
      addDays(targetTimeSaoPaulo, 1),
      nowSaoPaulo
    );
  }

  console.log(`⏳ Delay até o próximo envio: ${delay / 1000} segundos`);

  setTimeout(() => {
    console.log("🚀 Enviando anúncios agora...");
    sendAdvertisements(sock, groupIds);

    setInterval(() => {
      console.log("📅 Enviando anúncios diariamente...");
      sendAdvertisements(sock, groupIds);
    }, 24 * 60 * 60 * 1000);
  }, delay);
};
