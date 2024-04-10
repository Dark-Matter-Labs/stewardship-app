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
    id: "A",
    color: "#277da1",
  },
  {
    id: "B",
    color: "#277da1",
  },
  {
    id: "C",
    color: "#277da1",
  },
  {
    id: "D",
    color: "#277da1",
  },
  {
    id: "E",
    color: "#277da1",
  },
  {
    id: "F",
    color: "#43aa8b",
  },
  {
    id: "G",
    color: "#90be6d",
  },
  {
    id: "H",
    color: "#43aa8b",
  },
  {
    id: "I",
  },
  {
    id: "J",
    color: "#577590",
  },
  {
    id: "K",
    color: "#4d908e",
  },
  {
    id: "L",
    color: "#577590",
  },
  {
    id: "M",
    color: "#577590",
  },
  {
    id: "N",
    color: "#577590",
  },
  {
    id: "O",
    color: "#577590",
  },
];

const links: LinkDatum[] = [
  {
    source: "A",
    target: "B",
    chapter: "visit river of salmons every season.",
  },
  {
    source: "C",
    target: "D",
    chapter: "8",
  },
  {
    source: "E",
    target: "F",
    chapter: "10",
  },
  {
    source: "G",
    target: "H",
    chapter: "6",
  },
  {
    source: "I",
    target: "J",
    chapter: "1",
  },
  {
    source: "K",
    target: "L",
    chapter: "1",
  },
  {
    source: "M",
    target: "N",
    chapter: "1",
  },
  {
    source: "O",
    target: "P",
    chapter: "1",
  },
  {
    source: "A",
    target: "P",
    chapter: "1",
  },
  {
    source: "A",
    target: "C",
    chapter: "10",
  },
  {
    source: "F",
    target: "C",
    chapter: "10",
  },
  {
    source: "G",
    target: "C",
    chapter: "20",
  },
];

export const data = { nodes, links };
