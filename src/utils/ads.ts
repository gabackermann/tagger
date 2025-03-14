const propagandas = [
  {
    text: "📢 Anúncio: Você sabia que o Ilha Cinnabar disponibiliza um bot automático para seu grupo?\nO bot sobrevive através dos eventos do grupo, acesse e ajude!\n\n🔗 Entre: https://chat.whatsapp.com/EQMnd8NP9HUBDH6RY14202",
    image: "https://i.imgur.com/I1rJhT2.png",
  },
  {
    text: "📢 *Anúncio Magikarp*: 🌟 TAKAHASHI STORE: *SORTEIO GRÁTIS* ROLANDO, *LEILÃO* TODA SEMANA E A INCRIVÉL *RIFA LENDÁRIA* QUE ESTÁ ACONTECENDO! 🔥\nSaiba mais: https://chat.whatsapp.com/G1tGKQM9oBK8t2xesh6NTQ",
    image: "https://i.imgur.com/f2whI1q.jpg",
  },
  {
    text: "📢 Anúncio:\n*VERMILION* CARDS\nGrupo focado em cartas de Pokémon Vintage e High end.\n🫵🏻 FAÇA PARTE:👇🏻\nhttps://chat.whatsapp.com/C5l4qL8uWTj8gR7GqRy1AG",
    image: "https://i.imgur.com/0Zbg200.jpg",
  },
];

export const Ads = async (sock: any, groupJid: string) => {
  const propagandaAleatoria =
    propagandas[Math.floor(Math.random() * propagandas.length)];

  await sock.sendMessage(groupJid, {
    image: { url: propagandaAleatoria.image },
    caption: propagandaAleatoria.text,
  });
};
