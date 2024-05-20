import { Agent } from "./Agent";
import { Actant } from "./Actant";

export type Clause = {
  id: string;
  name: string;
  responsibilityHolder: Agent;
  rightHolder: Actant;
};
