import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import report from "./sanity/schemas/report-schema";
import actant from "./sanity/schemas/actant-schema";
import agent from "./sanity/schemas/agent-schema";
import clause from "./sanity/schemas/clause-schema";
import right from "./sanity/schemas/right-schema";
import responsibility from "./sanity/schemas/responsibility-schema";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET!;

export default defineConfig({
  basePath: "/admin", // <-- important that `basePath` matches the route you're mounting your studio from
  title: "Stewardship Studio",
  projectId,
  dataset,
  plugins: [structureTool()],
  schema: { types: [report, actant, agent, clause, right, responsibility] },
});
