export type NodeDatum = {
  id: string;
  color?: string;
  group: string;
};

export type LinkDatum = {
  source: string;
  target: string;
  chapter: string;
  color: string;
  style: string;
};

export type GraphData = {
  nodes: NodeDatum[];
  links: LinkDatum[];
};
