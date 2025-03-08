// export const associatedsGroup = [
//   {
//     responsibleId: "5527988534645",
//     keyword: "Ilha",
//   },
//   {
//     responsibleId: "5527988534645",
//     keyword: "bot",
//   },
//   {
//     responsibleId: "556281398131",
//     keyword: "Arena",
//   },
//   {
//     responsibleId: "5527988534645",
//     keyword: "STAFF",
//   },
//   {
//     responsibleId: "5511972115879",
//     keyword: "pokéhub",
//   },
//   {
//     responsibleId: "5511989017858",
//     keyword: "Sylveon",
//   },
//   {
//     responsibleId: "554588310430",
//     keyword: "AmourahTCG",
//   },
//   {
//     responsibleId: "5521997031062",
//     keyword: "pokêtop",
//   },
//   {
//     responsibleId: "5527998351989",
//     keyword: "Zapzone",
//   },
//   {
//     responsibleId: "5511985536495",
//     keyword: "POKECHAINA",
//   },
//   {
//     responsibleId: "5517999754660",
//     keyword: "TAKAHASHI",
//   },
//   {
//     responsibleId: "5511983666238",
//     keyword: "Poképobre",
//   },
//   {
//     responsibleId: "5521988569043",
//     keyword: "MorpheuTCG",
//   },
// ];

export const associatedsGroup = [
  {
    responsibleId: "5527988534645",
    keyword: "STAFF",
  },
];

export const isRegisteredResponsible = (userId: string): boolean => {
  return associatedsGroup.some((assoc) => assoc.responsibleId === userId);
};
