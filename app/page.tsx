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
      <>
        <Navigation
          left="Profile"
          title="River Lea Eco-Social Contract"
          right="Log Out"
          // @ts-ignore
          session={session}
          myStyle={{}}
        ></Navigation>
        <div className="theme_header graph-network">
          <ForceLayoutGraph></ForceLayoutGraph>
        </div>
        <main className="feed">
          <div className="greeting">
            {session && <p>Hello {sessionName}! </p>}

            <p>
              This living stewardship agreement represents the relationships
              that create the conditions to thrive for all.
            </p>
            <p>Here’s what has been happening today:</p>
          </div>

          <section>
            <h1>Feedback</h1>
            <p>
              Feedback captures how relationships in this ecosystem are being
              practiced. Here are the most recent ones:
            </p>
            <div className="reports_scroller">
              <Reports caption={true} sign={true} agent=""></Reports>
            </div>

            <form action="/report">
              <button className="button secondary">See All Feedback</button>
            </form>

            <form action="/report/new">
              <button className="button primary">Provide Feedback</button>
            </form>
          </section>

          <h1>Here is what makes up this living stewardship agreement:</h1>
          <section>
            <h1>Actants</h1>
            <p>
              These are humans and more-than-humans who play a role in this
              ecosystem.
            </p>
            <div className="actants_scroller update">
              <Actants showName={true} agent="" />
            </div>
            <form action="/actant">
              <button className="button secondary">See All Actants</button>
            </form>
            <form action="/actant/new">
              <button className="button primary">Recognise a New Actant</button>
            </form>
          </section>
          <section>
            <h1>Relationships</h1>
            <p>
              These are promises made between actants to provide the each other
              with conditions to thrive.
            </p>
            <div className="clauses_scroller">
              <Clauses caption={true} sign={true} agent={""}></Clauses>
            </div>
            <form action="/relationship">
              <button className="button secondary">
                See All Relationships
              </button>
            </form>
            <form action="/relationship/new">
              <button className="button primary">
                Recognise a New Relationship
              </button>
            </form>
          </section>
        </main>
      </>
    </>
  );
}
