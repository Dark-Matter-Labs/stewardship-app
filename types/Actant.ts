export type Actant = {
  id: string;
  name: string;
  slug: string;
  image: string;
  agents: Array<{
    _ref: string;
  }>;
};
