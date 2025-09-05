import Navigation from "../component/Navigation";
import Actants from "../component/Actants";
import ForceLayoutGraph from "../component/ForceLayoutGraph";
import { options } from "../api/auth/[...nextauth]/options";
import { getServerSession } from "next-auth/next";
import Clauses from "../component/Clauses";
import Reports from "../component/Reports";
import { Agent } from "@/types/Agent";
import { getSpace, getAgent } from "@/sanity/sanity-utils";

let sessionName = "name";
let sessionEmail = "email@email.com";

interface HomeProps {
  params: {
    space: string;
    [key: string]: string;
  };
}

export default async function Home({ params }: HomeProps) {
  // get the space from params
  const space = params.space;
  const spaceDetails = await getSpace(space);

  const session = await getServerSession(options);

  let agent: Agent | null = null;
  console.log("session:::::::::::::::::", session);

  if (session) {
    //retrieve user data through authenticated account
    sessionEmail = session.user?.email + "";
    sessionName = session.user?.name + "";

    // match user data to agent data
    agent = await getAgent(sessionEmail);

    if (agent && agent.email === sessionEmail) {
      sessionEmail = agent.email;

      //replace user name with coresponding agent name
      if (agent.name != undefined) {
        sessionName = agent.name;
      }
    }
  }

  return (
    <>
      <>
        <Navigation
          left="Profile"
          title={spaceDetails[0].name + " Living Stewardship Agreement"}
          right="Log Out"
          // @ts-ignore
          session={session}
          myStyle={{}}
          space={space}
        ></Navigation>
        {spaceDetails.length != 0 && (
          <div className="theme_header graph-network">
            {/* send the space name */}
            <ForceLayoutGraph
              spaceId={spaceDetails[0].id}
              space={space}
            ></ForceLayoutGraph>
          </div>
        )}
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
              <Reports
                spaceId={spaceDetails[0].id}
                spaceURL={params.space}
                caption={true}
                sign={true}
                agent=""
              ></Reports>
            </div>

            <form action={`${params.space}/report`}>
              <button className="button secondary">See All Feedback</button>
            </form>

            <form action={`${params.space}/report/new`}>
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
              <Actants
                showName={true}
                agent=""
                spaceId={spaceDetails[0].id}
                space={space}
              />
            </div>
            <form action={`${space}/actant`}>
              <button className="button secondary">See All Actants</button>
            </form>
            <form action={`${space}/actant/new`}>
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
              <Clauses
                caption={true}
                sign={true}
                agent={""}
                space={space}
                spaceId={spaceDetails[0].id}
              ></Clauses>
            </div>
            <form action={`/${space}/relationship`}>
              <button className="button secondary">
                See All Relationships
              </button>
            </form>
            <form action={`/${space}/relationship/new`}>
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
