import Link from "next/link";
import { getServerSession } from "next-auth/next";
import { options } from "./api/auth/[...nextauth]/options";
import { getAllSpaces } from "@/sanity/sanity-utils";

export default async function Home() {
  const spaces = await getAllSpaces();
  const session = await getServerSession(options);

  console.log("Home page session:", session);

  return (
    <>
      <main className="feed">
        <h1>Welcome to Stewardship App</h1>
        
        <h2>Choose a space/session:</h2>
        {spaces.length > 0 ? (
          spaces.map((space) => (
            <p key={space._id}>
              <Link href={`/${space.slug.current}`}>{space.name}</Link>
            </p>
          ))
        ) : (
          <p>No spaces available.</p>
        )}
        
        {session && (
          <div style={{ marginTop: "2rem", padding: "1rem", backgroundColor: "#f8f9fa", borderRadius: "4px" }}>
            <p style={{ margin: "0 0 0.5rem 0", fontSize: "0.9em", color: "#666" }}>
              Signed in as: {session.user?.name || session.user?.email}
            </p>
            <a 
              href="/signout"
              style={{ 
                padding: "0.5rem 1rem", 
                backgroundColor: "#dc3545", 
                color: "white", 
                textDecoration: "none",
                borderRadius: "4px",
                display: "inline-block",
                fontSize: "0.9em"
              }}
            >
              Sign Out
            </a>
          </div>
        )}
      </main>
    </>
  );
}
