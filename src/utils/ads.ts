export const propagandas = [
  {
    text: "*Anúncio do Magikarp* 🗣:\n\n*VERMILION CARDS*\nGrupo focado em cartas de Pokémon Vintage e High end.\n🫵🏻 FAÇA PARTE:👇🏻\nhttps://chat.whatsapp.com/C5l4qL8uWTj8gR7GqRy1AG",
    image: "https://i.imgur.com/0Zbg200.jpg",
  },
  {
    text: "*Anúncio do Magikarp* 🗣:\n\n🌟 TAKAHASHI STORE: *SORTEIO GRÁTIS* ROLANDO, *LEILÃO* TODA SEMANA E A INCRIVÉL *RIFA LENDÁRIA* QUE ESTÁ ACONTECENDO! 🔥\nSaiba mais: https://chat.whatsapp.com/G1tGKQM9oBK8t2xesh6NTQ",
    image: "https://i.imgur.com/f2whI1q.jpg",
  },
  {
    text: "*Anúncio do Magikarp* 🗣:\n\n*VERMILION CARDS*\nGrupo focado em cartas de Pokémon Vintage e High end.\n🫵🏻 FAÇA PARTE:👇🏻\nhttps://chat.whatsapp.com/C5l4qL8uWTj8gR7GqRy1AG",
    image: "https://i.imgur.com/0Zbg200.jpg",
  },
];

export const propagandasSemMencionar: {
  hour: number;
  minute: number;
  message: string;
  image: string;
}[] = [
  // {
  //   hour: 9,
  //   minute: 0,
  //   message: "🌞 Bom dia! Comece o dia com nossa super promoção! 🚀",
  // },
  // {
  //   hour: 11,
  //   minute: 0,
  //   message: "🍽️ Hora do almoço! Que tal aproveitar essa oferta especial?",
  // },
  {
    hour: 19,
    minute: 0,
    image: "https://i.imgur.com/I1rJhT2.png",
    message:
      "*Anúncio do Magikarp* 🗣:\n\n*ILHA CINNABAR*\nParticipe, tem sorteio gratuito!\n Clique e saiba mais: https://chat.whatsapp.com/EQMnd8NP9HUBDH6RY14202 \n\n _este anúncio é automatico, combinado previamente à associação do bot cinnabar_",
  },
  // {
  //   hour: 16,
  //   minute: 0,
  //   message: "☕ Pausa da tarde? Aproveite esse desconto exclusivo! 🎯",
  // },
  {
    hour: 9,
    minute: 0,
    image: "https://i.imgur.com/ro4UcJY.png",
    message:
      "*Anúncio do Magikarp* 🗣:\n\n*MALETA COLECIONADOR DE GRAÇA?*\nParticipe, o sorteio é gratuito!\nClique e saiba mais: https://chat.whatsapp.com/EQMnd8NP9HUBDH6RY14202 \n\n _este anúncio é automatico, combinado previamente à associação do bot cinnabar_",
  },
  // {
  //   hour: 21,
  //   minute: 0,
  //   message: "🌟 Última chance do dia! Não perca nosso desconto especial! 🔥",
  // },
];

// export const Ads = async (sock: any, groupJid: string) => {
//   const propagandaAleatoria =
//     propagandas[Math.floor(Math.random() * propagandas.length)];

//   await sock.sendMessage(groupJid, {
//     image: { url: propagandaAleatoria.image },
//     caption: propagandaAleatoria.text,
//   });
// };
