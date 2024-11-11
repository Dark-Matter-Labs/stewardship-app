export type Actant = {
  id: string;
  name: string;
  slug: string;
  image: string;
  imgLink: string;
  agents: Array<{
    _ref: string;
  }>;
};
