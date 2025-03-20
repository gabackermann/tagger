import xlsx from "xlsx";
import { proto } from "@whiskeysockets/baileys";
import { associatedsGroup } from "../utils/associateds";

const workbook = xlsx.readFile("src/data/leilao.xlsx");
const sheetName = workbook.SheetNames[0];
const sheet = workbook.Sheets[sheetName];
const data = xlsx.utils.sheet_to_json<any>(sheet);

let leilaoAtivo: {
  index: number;
  grupo: string;
  comprador?: string;
  valor?: number;
  contadorAtivo: boolean;
  contadorTimeouts: NodeJS.Timeout[];
} | null = null;

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const startAuction = async (sock: any, remoteJid: string) => {
  const grupo = associatedsGroup.find((g) => g.keyword.includes("Teste"));

  if (!grupo) return;

  const proximaCartaIndex = data.findIndex(
    (item) => !item.quem_comprou && !item.valor_venda
  );

  if (proximaCartaIndex === -1) {
    await sock.sendMessage(remoteJid, {
      text: "Todas as cartas deste leilão já têm seus devidos comprados.",
    });
    return;
  }

  leilaoAtivo = {
    index: proximaCartaIndex,
    grupo: remoteJid,
    contadorAtivo: true,
    contadorTimeouts: [],
  };
  await enviarCartaAtual(sock);
};

const enviarCartaAtual = async (sock: any) => {
  if (leilaoAtivo && data[leilaoAtivo.index]) {
    const carta = data[leilaoAtivo.index];
    const mensagem = `🃏 *${carta.nome}*\n📌 *Preço na Liga Pokémon:* R$ ${carta.preco_liga}\n💰 *Preço Inicial:* R$ ${carta.preco_inicial}\n🔺 *Incremento:* R$ ${carta.incremento}\n🏷️ *Estado da Carta:* ${carta.estado_da_carta}`;

    await sock.sendMessage(leilaoAtivo.grupo, {
      image: { url: carta.imagem },
      caption: mensagem,
    });

    leilaoAtivo.contadorAtivo = true;
    iniciarContador(sock);
  }
};

const iniciarContador = (sock: any) => {
  const tempos = [30, 20, 10, 5];

  leilaoAtivo?.contadorTimeouts.forEach(clearTimeout);
  leilaoAtivo!.contadorTimeouts = [];

  tempos.forEach((tempo, idx) => {
    const timeout = setTimeout(async () => {
      if (leilaoAtivo?.contadorAtivo) {
        await sock.sendMessage(leilaoAtivo.grupo, {
          text: `⏳ ${tempo} segundos restantes...`,
        });
      }
    }, (30 - tempo) * 1000);
    leilaoAtivo?.contadorTimeouts.push(timeout);
  });

  const fimTimeout = setTimeout(async () => {
    if (leilaoAtivo?.contadorAtivo) {
      await sock.sendMessage(leilaoAtivo.grupo, {
        text: "⏳ Fim da contagem, aguardando lance do administrador.",
      });
    }
  }, 30000);

  leilaoAtivo?.contadorTimeouts.push(fimTimeout);
};

export const registrarLance = async (
  sock: any,
  mensagem: proto.IWebMessageInfo
) => {
  if (leilaoAtivo && data[leilaoAtivo.index]) {
    const quotedMsg: any = mensagem.message?.extendedTextMessage?.contextInfo;
    const quotedParticipantComplete = quotedMsg?.participant ?? "";
    const quotedParticipant = quotedParticipantComplete?.split("@")[0] ?? "";

    let quotedMsgContent = quotedMsg?.quotedMessage?.conversation;

    if (!quotedMsgContent) {
      quotedMsgContent = quotedMsg?.quotedMessage?.extendedTextMessage?.text;
    }

    if (!quotedMsgContent) return;

    const valor = parseFloat(
      quotedMsgContent.replace(/[^0-9.,]/g, "").replace(",", ".")
    );

    if (!isNaN(valor)) {
      data[leilaoAtivo.index].quem_comprou = quotedParticipant;
      data[leilaoAtivo.index].valor_venda = valor;

      await new Promise((resolve) => {
        xlsx.utils.sheet_add_json(sheet, data, { origin: "A1" });
        xlsx.writeFile(workbook, "src/data/leilao.xlsx");
        resolve(true);
      });

      leilaoAtivo.contadorAtivo = false;
      leilaoAtivo.contadorTimeouts.forEach(clearTimeout);
      leilaoAtivo.contadorTimeouts = [];

      await delay(200);
      await sock.sendMessage(leilaoAtivo.grupo, {
        text: `🎉 ${quotedParticipant} levou a carta ${
          data[leilaoAtivo.index].nome
        } por R$${valor}!`,
      });
    }
  }
};

const enviarResumoCompradores = async (sock: any) => {
  const compradoresMap = new Map();

  data.forEach((item: any) => {
    if (item.quem_comprou && item.valor_venda) {
      if (!compradoresMap.has(item.quem_comprou)) {
        compradoresMap.set(item.quem_comprou, []);
      }
      compradoresMap.get(item.quem_comprou).push(item);
    }
  });

  for (const [comprador, cartas] of compradoresMap.entries()) {
    let total = 0;
    let detalheMensagem = "🧾 *Resumo das cartas arrematadas:*\n\n";

    cartas.forEach((carta: any) => {
      detalheMensagem += `🃏 *${carta.nome}* — R$${carta.valor_venda}\n`;
      total += parseFloat(carta.valor_venda);
    });

    detalheMensagem += `\n💰 *Total:* R$${total.toFixed(2)}`;

    await sock.sendMessage(`${comprador}@s.whatsapp.net`, {
      text: detalheMensagem,
    });
  }
};

export const proximaCarta = async (sock: any) => {
  if (leilaoAtivo) {
    let proximaIndex = leilaoAtivo.index + 1;

    while (
      proximaIndex < data.length &&
      data[proximaIndex].quem_comprou &&
      data[proximaIndex].valor_venda
    ) {
      proximaIndex++;
    }

    if (proximaIndex < data.length) {
      leilaoAtivo.index = proximaIndex;
      leilaoAtivo.contadorAtivo = false;
      leilaoAtivo.contadorTimeouts.forEach(clearTimeout);
      leilaoAtivo.contadorTimeouts = [];

      await delay(200);
      await enviarCartaAtual(sock);
    } else {
      await sock.sendMessage(leilaoAtivo.grupo, {
        text: "Leilão finalizado, obrigado a todos!",
      });

      await enviarResumoCompradores(sock);

      leilaoAtivo = null;
    }
  }
};

export const finalizarLeilao = async (sock: any) => {
  if (leilaoAtivo) {
    leilaoAtivo.contadorTimeouts.forEach(clearTimeout);
    leilaoAtivo.contadorTimeouts = [];
    await sock.sendMessage(leilaoAtivo.grupo, {
      text: "Leilão finalizado, obrigado a todos!",
    });

    await enviarResumoCompradores(sock);

    leilaoAtivo = null;
  }
};
