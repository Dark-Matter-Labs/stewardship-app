import Link from "next/link";

import { getAllSpaces, getAgent } from "@/sanity/sanity-utils";

let sessionName = "name";
let sessionEmail = "email@email.com";

export default async function Home() {
  const spaces = await getAllSpaces();
  console.log("spaces:::::::::::::::::", spaces);

  return (
    <>
      <>
        <main className="feed">
          <h1>Welcome, choose the space/session</h1>
          {spaces.length > 0 &&
            spaces.map((space) => (
              <p key={space._id}>
                <Link href={`/${space.slug.current}`}>{space.name}</Link>
              </p>
            ))}
        </main>
      </>
    </>
  );
}
