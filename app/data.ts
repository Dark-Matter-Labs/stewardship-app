export type NodeDatum = {
  id: string;
  color?: string;
  group: number;
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
