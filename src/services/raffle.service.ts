const drawRandomNumber = (min: number, max: number): number => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

export const handleRaffleCommand = async (
  sock: any,
  remoteJid: string,
  args: string[]
) => {
  const match = args.join(" ").match(/^(\d+)\s*a\s*(\d+)$/i);

  if (!match) {
    await sock.sendMessage(remoteJid, {
      text: "❌ Use o formato correto: `!s 1 a 200`",
    });
    return;
  }

  const min = parseInt(match[1], 10);
  const max = parseInt(match[2], 10);

  if (isNaN(min) || isNaN(max) || min >= max) {
    await sock.sendMessage(remoteJid, {
      text: "❌ Valores inválidos! Exemplo correto: `!s 1 a 200`",
    });
    return;
  }

  const result = drawRandomNumber(min, max);
  await sock.sendMessage(remoteJid, {
    text: `🎲 *Sorteio realizado!* O número sorteado foi: *${result}*`,
  });
};
