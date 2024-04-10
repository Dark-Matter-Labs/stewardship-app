import { Actant } from "@/types/Actant";
import { createClient, groq } from "next-sanity";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET!;

export async function getActants(): Promise<Actant[]> {
  const client = createClient({
    projectId,
    dataset,
  });

  return client.fetch(
    groq`*[_type == "actant"]{
        name,
        "image": image.asset->url
    }`
  );
}
