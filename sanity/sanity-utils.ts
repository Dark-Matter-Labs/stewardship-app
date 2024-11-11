import { Actant } from "@/types/Actant";
import { Agent } from "@/types/Agent";
import { Report } from "@/types/Report";
import { Relationship } from "@/types/Relationship";
import { Responsibility } from "@/types/Responsibility";
import { Right } from "@/types/Right";
import { createClient, groq, UploadBody } from "next-sanity";
import { Clause } from "@/types/Clause";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET!;
const token = process.env.NEXT_PUBLIC_SANITY_CRUD_EDITOR;

export const client = createClient({
  projectId,
  dataset,
  apiVersion: "2024-04-01",
  token: token,
  useCdn: false,
});

export async function getAllActants(): Promise<Actant[]> {
  return client.fetch(
    groq`*[_type == "actant"]{
        "id": _id,
        name,
        "image": image.asset->url,
        agents,
        imgLink,
        "agent_details": agents[]->
    }`,
  );
}

export async function getActantsByAgent(agent: string): Promise<Actant[]> {
  return client.fetch(
    groq`*[_type == "actant" && references(*[_type == "agent" &&  name match $name]._id) ]{
  name, "slug": slug.current, "image": image.asset->url, imgLink
}`,
    { name: agent },
  );
}

// export async function getReportsByAgent(agent: string): Promise<Report[]> {
//   return client.fetch(
//     groq`*[_type == "report" && references(*[_type == "agent" &&  name match $name]._id) ]{
//   name, "slug": slug.current, "image": image.asset->url
// }`,
//     { name: agent }
//   );
// }

export async function getAgents(): Promise<Agent[]> {
  return client.fetch(
    groq`*[_type == "agent"]{
        name,
    }`,
  );
}

export async function getAgent(email: string): Promise<Agent> {
  return client.fetch(
    groq`*[_type == "agent" && email == $email][0]{
       "id": _id,
        name,
        email,  
        motto,
        "image": image.asset->url,
    }`,
    { email: email },
  );
}

export async function getAgentImageByName(name: string): Promise<Agent[]> {
  return client.fetch(
    groq`*[_type == "agent" &&  name match $name]{
  "image": image.asset->url,
}`,
    { name: name },
  );
}

export async function getAgentIdByName(name: string): Promise<String> {
  return client.fetch(
    groq`*[_type == "agent" &&  name match $name][0]{
  "id": _id,
}.id`,
    { name: name },
  );
}

export async function getActant(slug: string): Promise<Actant> {
  return client.fetch(
    groq`*[_type == "actant" && slug.current == $slug][0]{
        "id": _id,
        name,
        slug,  
        "image": image.asset->url,
    }`,
    { slug: slug },
  );
}

export async function getClauses(): Promise<Clause[]> {
  return client.fetch(
    groq`*[_type == "clause"]{
        "id": _id,
        name,
        responsibilityHolder[]->{"image": image.asset->url},
        rightHolder[]->{"image": image.asset->url},
        "slug": slug.current,
    }`,
  );
}

export async function getAllClauses(): Promise<Clause[]> {
  return client.fetch(
    groq`*[_type == "clause"]{
        "id": _id,
        name,
        responsibilityHolder,
        rightHolder,
        "slug": slug.current,
    }`,
  );
}

export async function getClauseID(name: string): Promise<Clause[]> {
  return client.fetch(
    groq`*[_type == "clause" && name == $name ]{
        "id": _id,
    }`,
    { name: name },
  );
}

export async function getClausesByAgent(agent: string): Promise<Clause[]> {
  return client.fetch(
    groq`*[_type == "clause" && references(*[_type == "agent" &&  name match $name]._id) ]{
        "id": _id,
        "slug": slug.current,
        name,
        responsibilityHolder[0]->{"image": image.asset->url},
        rightHolder[0]->{"image": image.asset->url},
         responsibilityHolderM[]->{"image": image.asset->url},
        rightHolderM[]->{"image": image.asset->url},
    }`,
    { name: agent },
  );
}

export async function getRelatinoshipbyId(id: string): Promise<Relationship> {
  return client.fetch(
    groq`*[_type == "clause" && _id match $id][0]{
        "id": _id,
        "slug": slug.current,
        name,
        responsibilityHolder[]->{"image": image.asset->url, name},
        rightHolder[]->{"image": image.asset->url, name},
        rights, 
        responsibilities,
    }
    `,
    { id: id },
  );
}

export async function getReports(): Promise<Report[]> {
  return client.fetch(
    groq`*[_type == "report"]{
        "id": _id,
        name,
        "slug": slug.current,
        type, 
        clause->{name},
        reporter->{name, "image": image.asset->url},
        "image": image.asset->url,
        endorsers,
    }`,
  );
}

export async function getReportbyId(id: string): Promise<Report> {
  return client.fetch(
    groq`*[_type == "report" && _id match $id][0]{
    name, 
    content, 
    type,
    clause->,
    "image": image.asset->url,
    reporter->{"id": _id, name, "image": image.asset->url},
    endorsers[]->{"id": _id, name, "image": image.asset->url},
    }
    `,
    { id: id },
  );
}

export async function getReportsByAgent(agent: string): Promise<Report[]> {
  return client.fetch(
    groq`*[_type == "report" && $agent match reporter->name]{
        "id": _id,
        name,
        "slug": slug.current,
        type, 
        clause->{name},
        reporter->{name, "image": image.asset->url},
        "image": image.asset->url,
        endorsers,
    }`,
    { agent: agent },
  );
}

export async function getReportsByClause(clause: string): Promise<Report[]> {
  return client.fetch(
    groq`*[_type == "report" && $clause match clause->name ]  | order(_createdAt desc) {
        "id": _id,
        name,
        "slug": slug.current,
        type, 
        clause->{name},
        reporter->{name, "image": image.asset->url},
        "image": image.asset->url,
        endorsers,
        _createdAt
    }`,
    { clause: clause },
  );
}

export async function createActant(actant: unknown) {
  const result = client.create(actant as unknown as any);
  return result;
}

export async function createClause(clause: unknown) {
  const result = client.create(clause as unknown as any);
  return result;
}

export async function createReport(report: unknown) {
  const result = client.create(report as unknown as any);
  return result;
}

export async function updateActant(id: string, name: string) {
  return client
    .patch(id) // Document ID to patch
    .set({
      name: name,
      slug: { _type: "slug", current: name.replace(/ /g, "-") },
    }) // Shallow merge
    .commit(); // Perform the patch and return a promise
}

export async function updateReport(id: string, name: string, content: string) {
  return client
    .patch(id) // Document ID to patch
    .set({
      name: name,
      content: content,
      slug: { _type: "slug", current: name.replace(/ /g, "-") },
    }) // Shallow merge
    .commit(); // Perform the patch and return a promise
}

export async function _endorseReport(report_id: string, endorser_id: string) {
  return client
    .patch(report_id) // Document ID to patch
    .setIfMissing({
      endorsers: [
        { _type: "reference", _ref: endorser_id, _key: genRanHex(12) },
      ],
    })
    .commit();
}
export async function endorseReport(report_id: string, endorser_id: string) {
  const newEndorser = {
    _type: "reference",
    _ref: endorser_id,
    _key: genRanHex(12),
  };
  return client
    .transaction()
    .patch(report_id, (patch) =>
      patch
        .setIfMissing({ endorsers: [] })
        .insert("after", " endorsers[-1]", [newEndorser]),
    )
    .commit();
}

export async function unendorseReport(report_id: string, endorser_id: string) {
  const jsonPath = `endorsers[_ref=="${endorser_id}"]`;

  return client
    .transaction()
    .patch(report_id, (patch) => patch.unset([jsonPath]))
    .commit()
    .then((updatedDocument) => {
      console.log("Endorser removed:", updatedDocument);

      return updatedDocument;
    })
    .catch((error) => {
      console.error("Failed to remove endorser:", error);
    });
}

export async function updateRelationship(
  id: string,
  name: string,
  rights: string,
  responsibilities: string,
) {
  return client
    .patch(id) // Document ID to patch
    .set({
      name: name,
      slug: { _type: "slug", current: name.replace(/ /g, "-") },
      rights,
      responsibilities,
    }) // Shallow merge
    .commit(); // Perform the patch and return a promise
}

export async function removeActant(id: string) {
  return client.delete(id); // Document ID to delete
}

export async function removeReport(id: string) {
  return client.delete(id); // Document ID to delete
}

export async function removeRelationship(id: string) {
  return client.delete(id); // Document ID to delete
}

export async function getActantIdbySlug(slug: string): Promise<string> {
  return client.fetch(
    groq`*[_type == "actant" && slug.current match $slug][0]._id
    `,
    { slug: slug },
  );
}

export async function getReportIdbySlug(slug: string): Promise<string> {
  return client.fetch(
    groq`*[_type == "report" && slug.current match $slug][0]._id
    `,
    { slug: slug },
  );
}

export async function getRelationshipIdbySlug(slug: string): Promise<string> {
  return client.fetch(
    groq`*[_type == "clause" && slug.current match $slug][0]._id
    `,
    { slug: slug },
  );
}

export async function getActantNamebyId(id: string): Promise<string> {
  return client.fetch(
    groq`*[_type == "actant" && _id match $id][0].name
    `,
    { id: id },
  );
}

export async function getActantbyId(id: string): Promise<Actant> {
  return client.fetch(
    groq`*[_type == "actant" && _id match $id][0]{
     "id": _id,
        name,
        slug,  
        agents[]->,
        "image": image.asset->url,}
    `,
    { id: id },
  );
}

export async function getAgentIdbyName(name: string): Promise<string> {
  return client.fetch(
    groq`*[_type == "agent" && name match $name][0]._id
    `,
    { name: name },
  );
}

export async function getAllAgents(): Promise<Agent[]> {
  return client.fetch(groq`*[_type == "agent"]{
    "id": _id,
    name,
  }`);
}

export async function getAllRights(): Promise<Right[]> {
  return client.fetch(
    groq`*[_type == "right"]{
        "id": _id,
        name,
    }`,
  );
}

export async function getAllResponsibilities(): Promise<Responsibility[]> {
  return client.fetch(
    groq`*[_type == "responsibility"]{
        "id": _id,
        name,
    }`,
  );
}

export const genRanHex = (size: number) =>
  [...Array(size)]
    .map(() => Math.floor(Math.random() * 16).toString(16))
    .join("");
