import { parentPort } from "worker_threads";
import { DateTime } from "luxon";

interface ControleSpam {
  [groupId: string]: {
    [link: string]: number;
  };
}

const controleSpam: ControleSpam = {};

function scheduleDailyReset() {
  const now = DateTime.now().setZone("America/Sao_Paulo");

  let nextReset = now.set({ hour: 23, minute: 59, second: 59, millisecond: 0 });
  if (now > nextReset) {
    nextReset = nextReset.plus({ days: 1 });
  }

  const delay = nextReset.toMillis() - now.toMillis();
  console.log(
    `🗓️ Próximo reset agendado para: ${nextReset.toFormat(
      "HH:mm:ss dd/MM/yyyy"
    )}`
  );

  setTimeout(() => {
    for (const grupo in controleSpam) {
      delete controleSpam[grupo];
    }

    console.log(
      "🔁 Controle de spam resetado:",
      DateTime.now()
        .setZone("America/Sao_Paulo")
        .toFormat("HH:mm:ss dd/MM/yyyy")
    );
    scheduleDailyReset(); // reagenda
  }, delay);
}

scheduleDailyReset();

// 🔍 Processamento da mensagem
parentPort?.on("message", async (m) => {
  const message = m.msg.messages[0];
  if (!message.message) {
    console.log("❌ Mensagem sem conteúdo.");
    return;
  }

  const remoteJid = message.key.remoteJid;
  const text =
    message.message.conversation || message.message.extendedTextMessage?.text;

  if (!text) {
    console.log("❌ Mensagem sem texto.");
    return;
  }

  const link = text.match(/https?:\/\/\S+/)?.[0];
  if (!link) {
    console.log("⚠️ Nenhum link válido encontrado.");
    return;
  }

  console.log(`🔗 Link detectado no grupo ${remoteJid}: ${link}`);

  if (!controleSpam[remoteJid]) {
    controleSpam[remoteJid] = {};
  }

  const count = controleSpam[remoteJid][link] || 0;
  controleSpam[remoteJid][link] = count + 1;

  console.log(
    `📊 Link "${link}" já foi postado ${controleSpam[remoteJid][link]}x no grupo ${remoteJid}`
  );

  if (controleSpam[remoteJid][link] > 1) {
    console.log(`🚨 Limite excedido. Removendo: ${link}`);

    parentPort?.postMessage({
      action: "notify-and-delete",
      groupId: remoteJid,
      text: `🚫 Anúncio detectado mais de *uma vez ao dia*. Será removido.`,
      key: message.key,
    });
  }
});
