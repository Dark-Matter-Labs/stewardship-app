import { Actant } from "@/types/Actant";
import { Agent } from "@/types/Agent";
import { createClient, groq } from "next-sanity";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET!;

const client = createClient({
  projectId,
  dataset,
});

export async function getActants(): Promise<Actant[]> {
  return client.fetch(
    groq`*[_type == "actant"]{
        name,
        "image": image.asset->url
    }`
  );
}

export async function getAgents(): Promise<Agent[]> {
  return client.fetch(
    groq`*[_type == "agent"]{
        name,
    }`
  );
}
