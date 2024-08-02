import Navigation from "./component/Navigation";
import Actants from "./component/Actants";
import ForceLayoutGraph from "./component/ForceLayoutGraph";
import { options } from "./api/auth/[...nextauth]/options";
import { getServerSession } from "next-auth/next";
import Clauses from "./component/Clauses";
import Reports from "./component/Reports";
import { Agent } from "@/types/Agent";
import { getAgent } from "@/sanity/sanity-utils";

let sessionName = "name";
let sessionEmail = "email@email.com";

export default async function Home() {
  const session = await getServerSession(options);

  let agent: Agent | null = null;
  console.log("session:::::::::::::::::", session);

  if (session) {
    //retrieve user data through authenticated account
    sessionEmail = session.user?.email + "";
    sessionName = session.user?.name + "";

    // match user data to agent data
    agent = await getAgent(sessionEmail);

    if (agent?.email === sessionEmail) {
      sessionEmail = agent.email;

      //replace user name with coresponding agent name
      if (agent?.name != undefined) {
        sessionName = agent.name;
      }
    }
  }

  return (
    <>
      {session ? (
        <>
          <Navigation
            left="Profile"
            title="Stewardship App"
            right="Log Out"
            myStyle={{}}
          ></Navigation>
          <div className="theme_header graph-network">
            <ForceLayoutGraph></ForceLayoutGraph>
          </div>
          <main className="feed">
            <div className="greeting">
              <p>Hello {sessionName}! </p>
              <p>This is a Stewardship app that facilitates care actions. </p>
              <p>Check what is happening today.</p>
            </div>

            <section>
              <h1>Reports</h1>
              <p>Reports captures care actions taken each day.</p>
              <div className="reports_scroller">
                <Reports caption={true} sign={true} agent=""></Reports>
              </div>

              <form action="/report">
                <button className="button primary">All Reports</button>
              </form>

              <form action="/report/new">
                <button className="button primary">Make New Report</button>
              </form>
            </section>

            <h1>Check out what makes the current stewardship network</h1>
            <section>
              <h1>Actants</h1>
              <p>
                Actants are things or beings recognised by agents in this
                network.
              </p>
              <div className="actants_scroller update">
                <Actants showName={true} agent="" />
              </div>
              <form action="/actant">
                <button className="button primary">All Actants</button>
              </form>
              <form action="/actant/new">
                <button className="button primary">Recognise New Actant</button>
              </form>
            </section>
            <section>
              <h1>Relationships</h1>
              <p>
                Relationships are stewardship clause or agreements made between
                agents and actants.
              </p>
              <div className="clauses_scroller">
                <Clauses caption={true} sign={true} agent={""}></Clauses>
              </div>
              <form action="/relationship">
                <button className="button primary">All Relationships</button>
              </form>
              <form action="/relationship/new">
                <button className="button primary">
                  Recognise New Relationship
                </button>
              </form>
            </section>
          </main>
        </>
      ) : (
        <h1>session note found!</h1>
      )}
    </>
  );
}
