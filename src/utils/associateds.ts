export const associatedsGroup = [
  {
    responsibleId: "5527988534645",
    keyword: "Ilha Cinnabar",
    isPremium: true,
  },
  {
    responsibleId: "5527988534645",
    keyword: "STAFF",
    isPremium: false,
  },
  {
    responsibleId: "5527988534645",
    keyword: "magikarp",
    isPremium: false,
  },
  {
    responsibleId: "5511947178069",
    keyword: "zorua",
    isPremium: false,
  },
  {
    responsibleId: "5511988162777",
    keyword: "poke 1 tcg",
    isPremium: false,
  },
  {
    responsibleId: "5516997811602",
    keyword: "lucario",
    isPremium: false,
  },
  {
    responsibleId: "5543991559239",
    keyword: "BOO & KOC CARD SHOP",
    isPremium: false,
  },
  {
    responsibleId: "5521971178880",
    keyword: "Aliança",
    isPremium: false,
  },
  {
    responsibleId: "556281398131",
    keyword: "Arena",
    isPremium: false,
  },
  {
    responsibleId: "5511933396550",
    keyword: "NICOTCG",
    isPremium: false,
  },
  {
    responsibleId: "5517988322708",
    keyword: "Pokécenter",
    isPremium: false,
  },
  {
    responsibleId: "5511970670479",
    keyword: "Pokéttox",
    isPremium: false,
  },
  {
    responsibleId: "5519995000880",
    keyword: "Temdetudogeek",
    isPremium: false,
  },
  {
    responsibleId: "5521982573467",
    keyword: "MossLAX TCG",
    isPremium: false,
  },
  {
    responsibleId: "5519982544132",
    keyword: "MewEevee",
    isPremium: false,
  },
  {
    responsibleId: "5511933396550",
    keyword: "NICOTCG",
    isPremium: false,
  },
  {
    responsibleId: "5511972115879",
    keyword: "pokéhub",
    isPremium: false,
  },
  {
    responsibleId: "5513981494768",
    keyword: "vermilion",
    isPremium: false,
  },
  {
    responsibleId: "554284353780",
    keyword: "AuroraGeek",
    isPremium: false,
  },
  {
    responsibleId: "5511989017858",
    keyword: "Sylveon",
    isPremium: false,
  },
  {
    responsibleId: "5521997031062",
    keyword: "pokêtop",
    isPremium: false,
  },
  {
    responsibleId: "5527998351989",
    keyword: "Zapzone",
    isPremium: false,
  },
  {
    responsibleId: "5517999754660",
    keyword: "TAKAHASHI",
    isPremium: false,
  },
  {
    responsibleId: "5511983666238",
    keyword: "Poképobre",
    isPremium: false,
  },
  {
    responsibleId: "5521988569043",
    keyword: "MorpheuTCG",
    isPremium: false,
  },
  {
    responsibleId: "5527992052358",
    keyword: "James TCG",
    isPremium: false,
  },
  {
    responsibleId: "5516993141051",
    keyword: "Escola de Colecionadores",
    isPremium: false,
  },
  {
    responsibleId: "554298097260",
    keyword: "pokegimi",
    isPremium: false,
  },
];

// export const associatedsGroup = [
//   {
//     responsibleId: "5527988534645",
//     keyword: "STAFF",
//   },
//   {
//     responsibleId: "5527988534645",
//     keyword: "Teste",
//   },
// ];

export const isRegisteredResponsible = (userId: string): boolean => {
  return associatedsGroup.some((assoc) => assoc.responsibleId === userId);
};
