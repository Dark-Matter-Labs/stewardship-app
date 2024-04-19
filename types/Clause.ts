import { Agent } from "./Agent";
import { Actant } from "./Actant";

export type Clause = {
  name: string;
  responsibilityHolder: Agent;
  rightHolder: Actant;
};
