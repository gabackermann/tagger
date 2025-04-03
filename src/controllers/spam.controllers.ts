import { Worker } from "worker_threads";
import path from "path";

const workerPath = path.resolve(__dirname, "../worker/spam.worker.runner.js");

const spamWorker = new Worker(workerPath, {
  execArgv: ["--require", "ts-node/register"],
});

spamWorker.on("error", (err) => {
  console.error("Erro no worker de spam:", err);
});

spamWorker.on("exit", (code) => {
  if (code !== 0) {
    console.error(`⚠️ Worker de spam finalizou com código ${code}`);
  }
});

export const handleSpam = (sock: any, m: any) => {
  try {
    spamWorker.postMessage({ msg: m });

    spamWorker.on("message", async (res) => {
      const { action, groupId, text, key } = res;

      try {
        if (action === "notify-and-delete" && key && text) {
          await sock.sendMessage(groupId, { delete: key });
        }
      } catch (err) {
        console.error("Erro ao executar ação do worker:", err);
      }
    });
  } catch (err) {
    console.error("❌ Falha ao enviar mensagem para o worker de spam:", err);
  }
};
