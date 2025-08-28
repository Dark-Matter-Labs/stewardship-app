import Link from "next/link";

import { getAllSpaces } from "@/sanity/sanity-utils";

export default async function Home() {
  const spaces = await getAllSpaces();

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
