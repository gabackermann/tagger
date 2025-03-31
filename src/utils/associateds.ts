export const associatedsGroup = [
  {
    responsibleId: "5527988534645",
    keyword: "Ilha Cinnabar",
    isPremium: true,
  },
  {
    responsibleId: "5527988534645",
    keyword: "STAFF",
    isPremium: true,
  },
  {
    responsibleId: "5527988534645",
    keyword: "magikarp",
    isPremium: true,
  },
  {
    responsibleId: "11989743724",
    keyword: "Poke Yuan",
    isPremium: false,
  },
  {
    responsibleId: "13996758032",
    keyword: "Deixei Peguei",
    isPremium: true,
  },
  {
    responsibleId: "13996758032",
    keyword: "OAK",
    isPremium: false,
  },
  {
    responsibleId: "5511914793626",
    keyword: "TEC TCG",
    isPremium: true,
  },
  {
    responsibleId: "5566996616860",
    keyword: "Taberna Nerd",
    isPremium: false,
  },
  {
    responsibleId: "74988392413",
    keyword: "ZARD",
    isPremium: true,
  },
  {
    responsibleId: "11978488920",
    keyword: "Giratina Store",
    isPremium: true,
  },
  {
    responsibleId: "5511947178069",
    keyword: "zorua",
    isPremium: false,
  },
  {
    responsibleId: "5513991510919",
    keyword: "shock league",
    isPremium: false,
  },
  {
    responsibleId: "5511988162777",
    keyword: "poke 1 tcg",
    isPremium: true,
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
    isPremium: true,
  },
  {
    responsibleId: "5519995000880",
    keyword: "Temdetudogeek",
    isPremium: true,
  },
  {
    responsibleId: "5521982573467",
    keyword: "MossLAX TCG",
    isPremium: true,
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
    isPremium: true,
  },
  {
    responsibleId: "554284353780",
    keyword: "AuroraGeek",
    isPremium: false,
  },
  {
    responsibleId: "5563984839596",
    keyword: "vogado eeveelutions",
    isPremium: false,
  },
  {
    responsibleId: "5511989017858",
    keyword: "Elite 3 TCG",
    isPremium: true,
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
    isPremium: true,
  },
  {
    responsibleId: "5564992558461",
    keyword: "NineStore",
    isPremium: false,
  },
  {
    responsibleId: "5511983666238",
    keyword: "Poképobre",
    isPremium: true,
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
    keyword: "POKEGIMI",
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
