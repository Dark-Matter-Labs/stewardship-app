// "use client";
import Navigation from "./component/Navigation";
import Report from "./component/ReportEl";

import Actants from "./component/Actants";
import ForceLayoutGraph from "./component/ForceLayoutGraph";
import { ChakraProvider } from "@chakra-ui/react";
import { options } from "./api/auth/[...nextauth]/options";
import { getServerSession } from "next-auth/next";
import { signOut } from "next-auth/react";
import Clauses from "./component/Clauses";
import Reports from "./component/Reports";

// import User from "./component/User";

export default async function Home() {
  const session = await getServerSession(options);

  return (
    <ChakraProvider>
      {" "}
      {session ? (
        <>
          <Navigation
            left="Profile"
            title="Stewardship"
            right="Log Out"
            myStyle={{}}
          ></Navigation>
          <div className="theme_header graph-network">
            {/* <ForceLayoutGraph></ForceLayoutGraph> */}
          </div>
          <main className="feed">
            <h1>Hello {session?.user?.name}! Check what is happening today.</h1>

            <section>
              <h2>Reports highlighted</h2>
              <div className="reports_scroller">
                <Reports caption={true} sign={true}></Reports>
              </div>
            </section>
            <section>
              <h2>Reports requiring some feedback</h2>
              <div className="reports_scroller">
                <Reports caption={true} sign={true}></Reports>
              </div>

              <button className="button primary">See More Recent Events</button>
            </section>
            <h1>This is what makes the current network</h1>
            <section>
              <h2>Actants in the network</h2>
              <div className="actants_scroller">
                <Actants showName={true} />
              </div>

              <button className="button primary">View Other Actants</button>
            </section>
            <section>
              <h2>Clauses in the network</h2>
              <div className="clauses_scroller">
                <Clauses caption={true} sign={true}></Clauses>
              </div>
              <button className="button primary">View Other Clauses</button>
              <button className="button primary">Create a New Clause</button>
            </section>
          </main>
        </>
      ) : (
        <h1>session note found!</h1>
      )}
    </ChakraProvider>
  );
}
