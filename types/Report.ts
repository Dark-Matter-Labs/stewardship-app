import { Clause } from "./Clause";

export type Report = {
  name: string;
  slug: string;
  image: string;
  clause: Clause;
  content: string;
};
