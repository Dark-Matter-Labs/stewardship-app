import { Clause } from "./Clause";
import { Reporter } from "./Reporter";

export type Report = {
  id: string;
  name: string;
  slug: string;
  image: string;
  clause: Clause;
  content: string;
  reporter: Reporter;
};
