import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { visionTool } from "@sanity/vision";
import space from "./sanity/schemas/space-schema";
import report from "./sanity/schemas/report-schema";
import actant from "./sanity/schemas/actant-schema";
import agent from "./sanity/schemas/agent-schema";
import clause from "./sanity/schemas/clause-schema";
import right from "./sanity/schemas/right-schema";
import responsibility from "./sanity/schemas/responsibility-schema";

// Import the custom desk structure
import { Structure } from "./sanity/desk-structure"; 

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET!;

export default defineConfig({
  basePath: "/admin", // <-- important that `basePath` matches the route you're mounting your studio from
  title: "Stewardship Studio",
  projectId,
  dataset,
  plugins: [
    structureTool({
      // Use the custom desk structure here
      //structure: Structure, // Reference your custom structure
    }),
    visionTool({
      // Optional configuration
      defaultApiVersion: "2024-04-19",
      defaultDataset: dataset,
    }),
  ],
  schema: {
    types: [space, report, actant, agent, clause, right, responsibility],
  },
  apiVersion: "2024-04-28",
  use: true,
});
