// "use client";
import Navigation from "./component/Navigation";
import Report from "./component/Report";

import Actants from "./component/Actants";
import ForceLayoutGraph from "./component/ForceLayoutGraph";
import { ChakraProvider } from "@chakra-ui/react";
import { options } from "./api/auth/[...nextauth]/options";
import { getServerSession } from "next-auth/next";
import { signOut } from "next-auth/react";
import Clauses from "./component/Clauses";
import Reports from "./component/Reports";
import { Agent } from "@/types/Agent";
import { getAgent } from "@/sanity/sanity-utils";
import Link from "next/link";
let sessionName = "name";
let sessionEmail = "email@email.com";

export default async function Home() {
  const session = await getServerSession(options);

  if (session) {
    //retrieve user data through authenticated account
    sessionEmail = session.user?.email + "";
    sessionName = session.user?.name + "";

    // match user data to agent data
    const agent: Agent = await getAgent(sessionEmail);

    if (agent?.email === sessionEmail) {
      sessionEmail = agent.email;

      //replace user name with coresponding agent name
      if (agent?.name != undefined) {
        sessionName = agent.name;
        // console.log("========agent name: " + agent.name);
      }
    }
  }

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
            <h1>Hello {sessionName}! Check what is happening today.</h1>

            <section>
              <h2>Reports highlighted</h2>
              <div className="reports_scroller">
                <Reports caption={true} sign={true} agent=""></Reports>
              </div>
            </section>
            <section>
              <h2>Reports requiring some feedback</h2>
              <div className="reports_scroller">
                <Reports caption={true} sign={true} agent=""></Reports>
              </div>
              <form action="/relationship">
                <button className="button primary">
                  See More Recent Events
                </button>
              </form>
            </section>
            <h1>This is what makes the current network</h1>
            <section>
              <h2>Actants in the network</h2>
              <>
                <div className="actants_scroller">
                  <Actants showName={true} agent="" />
                </div>
              </>
              <form action="/actant">
                <button className="button primary">View Other Actants</button>
              </form>
            </section>
            <section>
              <h2>Clauses in the network</h2>
              <div className="clauses_scroller">
                <Clauses caption={true} sign={true}></Clauses>
              </div>
              <form action="/relationship">
                <button className="button primary">View Other Clauses</button>
              </form>
              <form action="/relationship/new">
                <button className="button primary">Create a New Clause</button>
              </form>
            </section>
          </main>
        </>
      ) : (
        <h1>session note found!</h1>
      )}
    </ChakraProvider>
  );
}
