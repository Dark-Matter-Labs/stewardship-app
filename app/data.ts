export type NodeDatum = {
  id: string;
  color?: string;
};

export type LinkDatum = {
  source: string;
  target: string;
  chapter: string;
};

export type GraphData = {
  nodes: NodeDatum[];
  links: LinkDatum[];
};

export const nodes: NodeDatum[] = [
  {
    id: "Myriel",
    color: "#277da1",
  },
  {
    id: "Mlle.Baptistine",
    color: "#277da1",
  },
  {
    id: "Mme.Magloire",
    color: "#277da1",
  },
  {
    id: "CountessdeLo",
    color: "#277da1",
  },
  {
    id: "Geborand",
    color: "#277da1",
  },
  {
    id: "Thenardier",
    color: "#43aa8b",
  },
  {
    id: "Cosette",
    color: "#90be6d",
  },
  {
    id: "Javert",
    color: "#43aa8b",
  },
  {
    id: "Fauchelevent",
  },
  {
    id: "Bamatabois",
    color: "#577590",
  },
  {
    id: "Perpetue",
    color: "#4d908e",
  },
  {
    id: "Simplice",
    color: "#577590",
  },
  {
    id: "Woman1",
    color: "#577590",
  },
  {
    id: "Judge",
    color: "#577590",
  },
  {
    id: "Champmathieu",
    color: "#577590",
  },
  {
    id: "Brevet",
    color: "#577590",
  },
  {
    id: "Chenildieu",
    color: "#577590",
  },
  {
    id: "Cochepaille",
    color: "#577590",
  },
  {
    id: "Pontmercy",
    color: "#43aa8b",
  },
  {
    id: "Boulatruelle",
    color: "#f9c74f",
  },
  {
    id: "Eponine",
    color: "#43aa8b",
  },
  {
    id: "Anzelma",
    color: "#43aa8b",
  },
  {
    id: "Woman2",
    color: "#90be6d",
  },
  {
    id: "MotherInnocent",
  },
  {
    id: "Gribier",
  },
  {
    id: "Mlle.Gillenormand",
    color: "#90be6d",
  },
  {
    id: "Mme.Pontmercy",
    color: "#90be6d",
  },
  {
    id: "Mlle.Vaubois",
    color: "#90be6d",
  },
  {
    id: "Lt.Gillenormand",
    color: "#90be6d",
  },
  {
    id: "Marius",
    color: "#f8961e",
  },
  {
    id: "Prouvaire",
    color: "#f8961e",
  },
  {
    id: "Feuilly",
    color: "#f8961e",
  },
  {
    id: "Courfeyrac",
    color: "#f8961e",
  },
  {
    id: "Babet",
    color: "#43aa8b",
  },
];

const links: LinkDatum[] = [
  {
    source: "Fang",
    target: "Salmon",
    chapter: "visit river of salmons every season.",
  },
  {
    source: "Mlle.Baptistine",
    target: "Myriel",
    chapter: "8",
  },
  {
    source: "Mme.Magloire",
    target: "Myriel",
    chapter: "10",
  },
  {
    source: "Mme.Magloire",
    target: "Mlle.Baptistine",
    chapter: "6",
  },
  {
    source: "CountessdeLo",
    target: "Myriel",
    chapter: "1",
  },
  {
    source: "Geborand",
    target: "Myriel",
    chapter: "1",
  },
  {
    source: "Champtercier",
    target: "Myriel",
    chapter: "1",
  },
  {
    source: "Cravatte",
    target: "Myriel",
    chapter: "1",
  },
  {
    source: "Count",
    target: "Myriel",
    chapter: "2",
  },
  {
    source: "OldMan",
    target: "Myriel",
    chapter: "1",
  },
  {
    source: "Valjean",
    target: "Labarre",
    chapter: "1",
  },
  {
    source: "Valjean",
    target: "Mme.Magloire",
    chapter: "3",
  },
  {
    source: "Valjean",
    target: "Mlle.Baptistine",
    chapter: "3",
  },
  {
    source: "Valjean",
    target: "Myriel",
    chapter: "5",
  },
  {
    source: "Marguerite",
    target: "Valjean",
    chapter: "1",
  },
  {
    source: "Mme.deR",
    target: "Valjean",
    chapter: "1",
  },
  {
    source: "Isabeau",
    target: "Valjean",
    chapter: "1",
  },
  {
    source: "Dahlia",
    target: "Fameuil",
    chapter: "3",
  },
  {
    source: "Dahlia",
    target: "Blacheville",
    chapter: "3",
  },
  {
    source: "Dahlia",
    target: "Favourite",
    chapter: "5",
  },
  {
    source: "Zephine",
    target: "Tholomyes",
    chapter: "3",
  },
  {
    source: "Zephine",
    target: "Listolier",
    chapter: "3",
  },
  {
    source: "Zephine",
    target: "Fameuil",
    chapter: "3",
  },
  {
    source: "Zephine",
    target: "Blacheville",
    chapter: "3",
  },
  {
    source: "Zephine",
    target: "Favourite",
    chapter: "4",
  },
  {
    source: "Zephine",
    target: "Dahlia",
    chapter: "4",
  },
  {
    source: "Fantine",
    target: "Tholomyes",
    chapter: "3",
  },
  {
    source: "Fantine",
    target: "Listolier",
    chapter: "3",
  },
  {
    source: "Fantine",
    target: "Fameuil",
    chapter: "3",
  },
  {
    source: "Fantine",
    target: "Blacheville",
    chapter: "3",
  },
  {
    source: "Fantine",
    target: "Favourite",
    chapter: "4",
  },
  {
    source: "Fantine",
    target: "Dahlia",
    chapter: "4",
  },
  {
    source: "Fantine",
    target: "Zephine",
    chapter: "4",
  },
  {
    source: "Fantine",
    target: "Marguerite",
    chapter: "2",
  },
  {
    source: "Fantine",
    target: "Valjean",
    chapter: "9",
  },
  {
    source: "Mme.Thenardier",
    target: "Fantine",
    chapter: "2",
  },
  {
    source: "Mme.Thenardier",
    target: "Valjean",
    chapter: "7",
  },
  {
    source: "Thenardier",
    target: "Mme.Thenardier",
    chapter: "13",
  },
  {
    source: "Thenardier",
    target: "Fantine",
    chapter: "1",
  },
  {
    source: "Thenardier",
    target: "Valjean",
    chapter: "12",
  },
  {
    source: "Cosette",
    target: "Mme.Thenardier",
    chapter: "4",
  },
  {
    source: "Cosette",
    target: "Valjean",
    chapter: "31",
  },
  {
    source: "Cosette",
    target: "Tholomyes",
    chapter: "1",
  },
  {
    source: "Cosette",
    target: "Thenardier",
    chapter: "1",
  },
  {
    source: "Javert",
    target: "Valjean",
    chapter: "17",
  },
  {
    source: "Javert",
    target: "Fantine",
    chapter: "5",
  },
  {
    source: "Javert",
    target: "Thenardier",
    chapter: "5",
  },
  {
    source: "Javert",
    target: "Mme.Thenardier",
    chapter: "1",
  },
  {
    source: "Javert",
    target: "Cosette",
    chapter: "1",
  },
  {
    source: "Fauchelevent",
    target: "Valjean",
    chapter: "8",
  },
  {
    source: "Fauchelevent",
    target: "Javert",
    chapter: "1",
  },
  {
    source: "Bamatabois",
    target: "Fantine",
    chapter: "1",
  },
  {
    source: "Bamatabois",
    target: "Javert",
    chapter: "1",
  },
  {
    source: "Bamatabois",
    target: "Valjean",
    chapter: "2",
  },
  {
    source: "Perpetue",
    target: "Fantine",
    chapter: "1",
  },
  {
    source: "Simplice",
    target: "Perpetue",
    chapter: "2",
  },
  {
    source: "Simplice",
    target: "Valjean",
    chapter: "3",
  },
  {
    source: "Simplice",
    target: "Fantine",
    chapter: "2",
  },
  {
    source: "Simplice",
    target: "Javert",
    chapter: "1",
  },
  {
    source: "Woman1",
    target: "Valjean",
    chapter: "2",
  },
  {
    source: "Woman1",
    target: "Javert",
    chapter: "1",
  },
  {
    source: "Judge",
    target: "Valjean",
    chapter: "3",
  },
  {
    source: "Judge",
    target: "Bamatabois",
    chapter: "2",
  },
  {
    source: "Champmathieu",
    target: "Valjean",
    chapter: "3",
  },
  {
    source: "Champmathieu",
    target: "Judge",
    chapter: "3",
  },
  {
    source: "Champmathieu",
    target: "Bamatabois",
    chapter: "2",
  },
  {
    source: "Brevet",
    target: "Judge",
    chapter: "2",
  },
  {
    source: "Brevet",
    target: "Champmathieu",
    chapter: "2",
  },
  {
    source: "Brevet",
    target: "Valjean",
    chapter: "2",
  },
  {
    source: "Brevet",
    target: "Bamatabois",
    chapter: "1",
  },
  {
    source: "Chenildieu",
    target: "Judge",
    chapter: "2",
  },
  {
    source: "Chenildieu",
    target: "Champmathieu",
    chapter: "2",
  },
  {
    source: "Chenildieu",
    target: "Brevet",
    chapter: "2",
  },
  {
    source: "Chenildieu",
    target: "Valjean",
    chapter: "2",
  },
  {
    source: "Chenildieu",
    target: "Bamatabois",
    chapter: "1",
  },
  {
    source: "Cochepaille",
    target: "Judge",
    chapter: "2",
  },
  {
    source: "Cochepaille",
    target: "Champmathieu",
    chapter: "2",
  },
  {
    source: "Cochepaille",
    target: "Brevet",
    chapter: "2",
  },
  {
    source: "Cochepaille",
    target: "Chenildieu",
    chapter: "2",
  },
  {
    source: "Cochepaille",
    target: "Valjean",
    chapter: "2",
  },
  {
    source: "Cochepaille",
    target: "Bamatabois",
    chapter: "1",
  },
  {
    source: "Pontmercy",
    target: "Thenardier",
    chapter: "1",
  },
  {
    source: "Boulatruelle",
    target: "Thenardier",
    chapter: "1",
  },
  {
    source: "Eponine",
    target: "Mme.Thenardier",
    chapter: "2",
  },
  {
    source: "Eponine",
    target: "Thenardier",
    chapter: "3",
  },
  {
    source: "Anzelma",
    target: "Eponine",
    chapter: "2",
  },
  {
    source: "Anzelma",
    target: "Thenardier",
    chapter: "2",
  },
  {
    source: "Anzelma",
    target: "Mme.Thenardier",
    chapter: "1",
  },
  {
    source: "Woman2",
    target: "Valjean",
    chapter: "3",
  },
  {
    source: "Woman2",
    target: "Cosette",
    chapter: "1",
  },
  {
    source: "Woman2",
    target: "Javert",
    chapter: "1",
  },
  {
    source: "MotherInnocent",
    target: "Fauchelevent",
    chapter: "3",
  },
  {
    source: "MotherInnocent",
    target: "Valjean",
    chapter: "1",
  },
  {
    source: "Gribier",
    target: "Fauchelevent",
    chapter: "2",
  },
  {
    source: "Gavroche",
    target: "Mme.Burgon",
    chapter: "2",
  },
  {
    source: "Gavroche",
    target: "Thenardier",
    chapter: "1",
  },
  {
    source: "Gavroche",
    target: "Javert",
    chapter: "1",
  },
  {
    source: "Gavroche",
    target: "Valjean",
    chapter: "1",
  },
  {
    source: "Gillenormand",
    target: "Cosette",
    chapter: "3",
  },
  {
    source: "Gillenormand",
    target: "Valjean",
    chapter: "2",
  },
  {
    source: "Magnon",
    target: "Gillenormand",
    chapter: "1",
  },
  {
    source: "Magnon",
    target: "Mme.Thenardier",
    chapter: "1",
  },
  {
    source: "Mlle.Gillenormand",
    target: "Gillenormand",
    chapter: "9",
  },
  {
    source: "Mlle.Gillenormand",
    target: "Cosette",
    chapter: "2",
  },
  {
    source: "Mlle.Gillenormand",
    target: "Valjean",
    chapter: "2",
  },
  {
    source: "Mme.Pontmercy",
    target: "Mlle.Gillenormand",
    chapter: "1",
  },
  {
    source: "Mme.Pontmercy",
    target: "Pontmercy",
    chapter: "1",
  },
  {
    source: "Mlle.Vaubois",
    target: "Mlle.Gillenormand",
    chapter: "1",
  },
  {
    source: "Lt.Gillenormand",
    target: "Mlle.Gillenormand",
    chapter: "2",
  },
  {
    source: "Lt.Gillenormand",
    target: "Gillenormand",
    chapter: "1",
  },
  {
    source: "Lt.Gillenormand",
    target: "Cosette",
    chapter: "1",
  },
  {
    source: "Marius",
    target: "Mlle.Gillenormand",
    chapter: "6",
  },
  {
    source: "Marius",
    target: "Gillenormand",
    chapter: "12",
  },
  {
    source: "Marius",
    target: "Pontmercy",
    chapter: "1",
  },
  {
    source: "Marius",
    target: "Lt.Gillenormand",
    chapter: "1",
  },
  {
    source: "Marius",
    target: "Cosette",
    chapter: "21",
  },
  {
    source: "Marius",
    target: "Valjean",
    chapter: "19",
  },
  {
    source: "Marius",
    target: "Tholomyes",
    chapter: "1",
  },
  {
    source: "Marius",
    target: "Thenardier",
    chapter: "2",
  },
  {
    source: "Marius",
    target: "Eponine",
    chapter: "5",
  },
  {
    source: "Marius",
    target: "Gavroche",
    chapter: "4",
  },
  {
    source: "BaronessT",
    target: "Gillenormand",
    chapter: "1",
  },
  {
    source: "BaronessT",
    target: "Marius",
    chapter: "1",
  },
  {
    source: "Mabeuf",
    target: "Marius",
    chapter: "1",
  },
  {
    source: "Mabeuf",
    target: "Eponine",
    chapter: "1",
  },
  {
    source: "Mabeuf",
    target: "Gavroche",
    chapter: "1",
  },
  {
    source: "Enjolras",
    target: "Marius",
    chapter: "7",
  },
  {
    source: "Enjolras",
    target: "Gavroche",
    chapter: "7",
  },
  {
    source: "Enjolras",
    target: "Javert",
    chapter: "6",
  },
  {
    source: "Enjolras",
    target: "Mabeuf",
    chapter: "1",
  },
  {
    source: "Enjolras",
    target: "Valjean",
    chapter: "4",
  },
  {
    source: "Combeferre",
    target: "Enjolras",
    chapter: "15",
  },
  {
    source: "Combeferre",
    target: "Marius",
    chapter: "5",
  },
  {
    source: "Combeferre",
    target: "Gavroche",
    chapter: "6",
  },
  {
    source: "Combeferre",
    target: "Mabeuf",
    chapter: "2",
  },
  {
    source: "Prouvaire",
    target: "Gavroche",
    chapter: "1",
  },
  {
    source: "Prouvaire",
    target: "Enjolras",
    chapter: "4",
  },
  {
    source: "Prouvaire",
    target: "Combeferre",
    chapter: "2",
  },
  {
    source: "Feuilly",
    target: "Gavroche",
    chapter: "2",
  },
  {
    source: "Feuilly",
    target: "Enjolras",
    chapter: "6",
  },
  {
    source: "Feuilly",
    target: "Prouvaire",
    chapter: "2",
  },
  {
    source: "Feuilly",
    target: "Combeferre",
    chapter: "5",
  },
  {
    source: "Feuilly",
    target: "Mabeuf",
    chapter: "1",
  },
  {
    source: "Feuilly",
    target: "Marius",
    chapter: "1",
  },
  {
    source: "Courfeyrac",
    target: "Marius",
    chapter: "9",
  },
  {
    source: "Babet",
    target: "Javert",
    chapter: "2",
  },
];

export const data = { nodes, links };
