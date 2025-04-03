export const associatedsGroup = [
  {
    responsibleId: "5527988534645",
    keyword: "Ilha Cinnabar",
    isPremium: true,
    spamControl: false,
  },
  {
    responsibleId: "5527988534645",
    keyword: "STAFF",
    isPremium: true,
    spamControl: true,
  },
  {
    responsibleId: "5527988534645",
    keyword: "Suporte ao assistente de grupos",
    isPremium: true,
    spamControl: false,
  },
  {
    responsibleId: "11989743724",
    keyword: "Poke Yuan",
    isPremium: false,
    spamControl: false,
  },
  {
    responsibleId: "3597242304",
    keyword: "DragoStore",
    isPremium: true,
    spamControl: false,
  },
  {
    responsibleId: "13996758032",
    keyword: "Deixei Peguei",
    isPremium: true,
    spamControl: false,
  },
  {
    responsibleId: "13996758032",
    keyword: "OAK",
    isPremium: false,
    spamControl: false,
  },
  {
    responsibleId: "5511914793626",
    keyword: "TEC TCG",
    isPremium: true,
    spamControl: false,
  },
  {
    responsibleId: "5566996616860",
    keyword: "Taberna Nerd",
    isPremium: false,
    spamControl: false,
  },
  {
    responsibleId: "74988392413",
    keyword: "ZARD",
    isPremium: true,
    spamControl: false,
  },
  {
    responsibleId: "11978488920",
    keyword: "Giratina Store",
    isPremium: true,
    spamControl: false,
  },
  {
    responsibleId: "5513991510919",
    keyword: "shock league",
    isPremium: false,
    spamControl: false,
  },
  {
    responsibleId: "5511988162777",
    keyword: "poke 1 tcg",
    isPremium: true,
    spamControl: false,
  },
  {
    responsibleId: "5521971178880",
    keyword: "Aliança",
    isPremium: false,
    spamControl: false,
  },
  {
    responsibleId: "5511933396550",
    keyword: "NICOTCG",
    isPremium: false,
    spamControl: false,
  },
  {
    responsibleId: "5517988322708",
    keyword: "Pokécenter",
    isPremium: false,
    spamControl: false,
  },
  {
    responsibleId: "5511970670479",
    keyword: "Pokéttox",
    isPremium: true,
    spamControl: false,
  },
  {
    responsibleId: "5519995000880",
    keyword: "Temdetudogeek",
    isPremium: true,
    spamControl: false,
  },
  {
    responsibleId: "5521982573467",
    keyword: "MossLAX TCG",
    isPremium: true,
    spamControl: false,
  },
  {
    responsibleId: "5519982544132",
    keyword: "MewEevee",
    isPremium: false,
    spamControl: false,
  },
  {
    responsibleId: "5511933396550",
    keyword: "NICOTCG",
    isPremium: false,
    spamControl: false,
  },
  {
    responsibleId: "5511972115879",
    keyword: "pokéhub",
    isPremium: true,
    spamControl: false,
  },
  {
    responsibleId: "5511972115879",
    keyword: "pokéhub rifas",
    isPremium: false,
    spamControl: false,
  },
  {
    responsibleId: "5513981494768",
    keyword: "vermilion",
    isPremium: true,
    spamControl: false,
  },
  {
    responsibleId: "554284353780",
    keyword: "AuroraGeek",
    isPremium: false,
    spamControl: false,
  },
  {
    responsibleId: "5563984839596",
    keyword: "vogado eeveelutions",
    isPremium: false,
    spamControl: false,
  },
  {
    responsibleId: "5511989017858",
    keyword: "Elite 3 TCG",
    isPremium: true,
    spamControl: false,
  },
  {
    responsibleId: "5521997031062",
    keyword: "pokêtop",
    isPremium: false,
    spamControl: false,
  },
  {
    responsibleId: "5527998351989",
    keyword: "Zapzone",
    isPremium: false,
    spamControl: false,
  },
  {
    responsibleId: "5517999754660",
    keyword: "TAKAHASHI",
    isPremium: true,
    spamControl: false,
  },
  {
    responsibleId: "5564992558461",
    keyword: "NineStore",
    isPremium: false,
    spamControl: false,
  },
  {
    responsibleId: "5511983666238",
    keyword: "Poképobre",
    isPremium: true,
    spamControl: false,
  },
  {
    responsibleId: "5527992052358",
    keyword: "James TCG",
    isPremium: false,
    spamControl: false,
  },
  {
    responsibleId: "5516993141051",
    keyword: "Escola de Colecionadores",
    isPremium: false,
    spamControl: false,
  },
  {
    responsibleId: "554298097260",
    keyword: "POKEGIMI",
    isPremium: false,
    spamControl: false,
  },
];

// export const associatedsGroup = [
//   {
//     responsibleId: "5527988534645",
//     keyword: "Suporte ao assistente de grupos",
//     isPremium: true,
// spamControl: false,
//   },
// ];

export const isRegisteredResponsible = (userId: string): boolean => {
  return associatedsGroup.some((assoc) => assoc.responsibleId === userId);
};
