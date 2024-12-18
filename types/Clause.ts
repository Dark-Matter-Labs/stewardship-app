import { Agent } from "./Agent";
import { Actant } from "./Actant";

export type Clause = {
  id: string;
  slug: string;
  name: string;
  responsibilityHolder: Array<Agent>;
  rightHolder: Array<Actant>;
};
