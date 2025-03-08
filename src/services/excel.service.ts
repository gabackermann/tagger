import fs from "fs";
import path from "path";
import * as XLSX from "xlsx";
import { proto } from "@whiskeysockets/baileys";

const REQUIRED_COLUMNS = [
  "nome",
  "preco_liga",
  "preco_inicial",
  "incremento",
  "estado_da_carta",
  "imagem",
  "arremate",
  "quem_comprou",
  "valor_venda",
];

const waitingForUpload = new Set<string>();

export const waitForExcelUpload = async (
  sock: any,
  remoteJid: string,
  responsibleId: string
) => {
  // Impede múltiplos uploads simultâneos para o mesmo JID
  if (waitingForUpload.has(remoteJid)) return;

  // Adiciona o JID na fila de espera
  waitingForUpload.add(remoteJid);

  await sock.sendMessage(remoteJid, {
    text: "📄 Aguardando envio da planilha (.xlsx) com as novas cartas do leilão.",
  });

  // Espera por 20 segundos para o upload ou envia mensagem se não receber arquivo
  setTimeout(async () => {
    if (waitingForUpload.has(remoteJid)) {
      await sock.sendMessage(remoteJid, {
        text: "❌ Não recebemos o arquivo da planilha em 20 segundos. Por favor, tente novamente.",
      });
      waitingForUpload.delete(remoteJid);
    }
  }, 20000); // 20 segundos

  sock.ev.on(
    "messages.upsert",
    async (m: { messages: proto.IWebMessageInfo[] }) => {
      const message = m.messages[0] as proto.IWebMessageInfo;

      if (!message.message?.documentMessage) return;

      const fileName = message.message.documentMessage.fileName || "";
      const mimeType = message.message.documentMessage.mimetype || "";

      if (
        !fileName.endsWith(".xlsx") ||
        mimeType !==
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
      ) {
        await sock.sendMessage(remoteJid, {
          text: "❌ O arquivo deve estar no formato .xlsx",
        });
        return;
      }

      // Obtendo o arquivo de mídia da mensagem
      const buffer = await sock.downloadMediaMessage(message);

      const tempFilePath = path.join(
        __dirname,
        `../uploads/temp-${responsibleId}.xlsx`
      );
      fs.writeFileSync(tempFilePath, buffer);

      const workbook = XLSX.readFile(tempFilePath);
      const sheetName = workbook.SheetNames[0];
      const sheet = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName], {
        header: 1,
      }) as string[][]; // Adicionando o tipo explícito

      if (!sheet.length) {
        await sock.sendMessage(remoteJid, {
          text: "❌ A planilha está vazia!",
        });
        return;
      }

      // Agora você pode garantir que sheet[0] é um array de strings
      const headers = sheet[0].map((col: string) =>
        col.toString().trim().toLowerCase()
      );

      const missingColumns = REQUIRED_COLUMNS.filter(
        (col) => !headers.includes(col)
      );

      if (missingColumns.length > 0) {
        await sock.sendMessage(remoteJid, {
          text: `❌ Sua planilha não contém todas as colunas obrigatórias!\n\n🔹 Colunas faltando: ${missingColumns.join(
            ", "
          )}`,
        });
        return;
      }

      // Movendo o arquivo final para a pasta de uploads
      const finalFilePath = path.join(
        __dirname,
        `../uploads/${responsibleId}-cartas_leilao.xlsx`
      );
      fs.renameSync(tempFilePath, finalFilePath);

      // Enviando confirmação ao usuário
      await sock.sendMessage(remoteJid, {
        text: "✅ Sua planilha foi validada e salva com sucesso!",
      });
      await sock.sendMessage(remoteJid, {
        document: fs.readFileSync(finalFilePath),
        fileName: `${responsibleId}-cartas_leilao.xlsx`,
        mimetype:
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      });

      waitingForUpload.delete(remoteJid); // Remove da fila quando o processo for finalizado
    }
  );
};
