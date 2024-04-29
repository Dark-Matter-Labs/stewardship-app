import { Actant } from "@/types/Actant";
import { Agent } from "@/types/Agent";
import { Clause } from "@/types/Clause";
import { Report } from "@/types/Report";
import { createClient, groq } from "next-sanity";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET!;
const token = process.env.SANITY_CRUD_EDITOR;

const client = createClient({
  projectId,
  dataset,
  apiVersion: "2024-04-01",
  token: token,
  useCdn: true,
});

export async function getActants(): Promise<Actant[]> {
  return client.fetch(
    groq`*[_type == "actant"]{
        name,
        "image": image.asset->url
    }`
  );
}

export async function getActantsByAgent(agent: string): Promise<Actant[]> {
  return client.fetch(
    groq`*[_type == "actant" && references(*[_type == "agent" &&  name match $name]._id) ]{
  name, "image": image.asset->url
}`,
    { name: agent }
  );
}

export async function getAgents(): Promise<Agent[]> {
  return client.fetch(
    groq`*[_type == "agent"]{
        name,
    }`
  );
}

export async function getAgent(email: string): Promise<Agent> {
  return client.fetch(
    groq`*[_type == "agent" && email == $email][0]{
        name,
        email,  
        motto,
        "image": image.asset->url,
    }`,
    { email: email }
  );
}

export async function getClause(): Promise<Clause[]> {
  return client.fetch(
    groq`*[_type == "clause"]{
        name,
        responsibilityHolder[0]->{"image": image.asset->url},
        rightHolder[0]->{"image": image.asset->url}
    }`
  );
}

export async function getReports(): Promise<Report[]> {
  return client.fetch(
    groq`*[_type == "report"]{
        name,
        "slug": slug.current,
        type, 
        clause->{name},
        reporter->{name, "image": image.asset->url},
        "image": image.asset->url,
    }`
  );
}

export async function getReportsByAgent(agent: string): Promise<Report[]> {
  return client.fetch(
    groq`*[_type == "report" && $agent match reporter->name]{
        name,
        "slug": slug.current,
        type, 
        clause->{name},
        reporter->{name, "image": image.asset->url},
        "image": image.asset->url,
    }`,
    { agent: agent }
  );
}

export async function createActant(actant: Actant) {
  const result = client.create(actant);
  return result;
}
