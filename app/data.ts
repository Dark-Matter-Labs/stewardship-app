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
