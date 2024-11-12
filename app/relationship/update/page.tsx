import Navigation from "@/app/component/Navigation";
import "@fortawesome/fontawesome-svg-core/styles.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen, faTrash } from "@fortawesome/free-solid-svg-icons";

import { getServerSession } from "next-auth/next";
import { options } from "../../api/auth/[...nextauth]/options";
import React from "react";
import { getAgent, getClausesByAgent } from "@/sanity/sanity-utils";
import { Clause as ClauseType } from "@/types/Clause";
import { Agent } from "@/types/Agent";
import Clause from "@/app/component/Clause";
let sessionEmail = "email@email.com";
let sessionName = "name";

const page = async () => {
  const session = await getServerSession(options);
  console.log(session);
  if (session) {
    //retrieve user data through authenticated account
    sessionEmail = session.user?.email + "";

    // match agent data
    const agent: Agent = await getAgent(sessionEmail);
    // //replace user name with coresponding agent name
    if (agent?.name != undefined) {
      sessionName = agent.name;
      // console.log("========agent name: " + agent.name);
    }
    console.log("session name: ", sessionName);
  }

  const relationships = await getClausesByAgent(sessionName);

  return (
    <>
      <Navigation
        left="Back"
        title="Relationship"
        right="Log Out"
        myStyle={{}}
        session={{}}
      ></Navigation>
      <main className="allrelationship">
        <h1>Update relationships in the network</h1>
        <p>
          Please note that you can only update the relationships you created
        </p>
        <form action={`/relationship`}>
          <button className="button primary">Back to All Relationships</button>
        </form>
        <div className="allrelationship">
          {relationships.map((relationship: ClauseType) => (
            <div className="clauses_scroller update" key={relationship.name}>
              <Clause
                key={relationship.name}
                caption={true}
                sign={true}
                respHolders={[]}
                rightHolders={[]}
              >
                {`${relationship.name}`}
              </Clause>
              <div>
                <form
                  className="function_button"
                  action={`/relationship/update/${relationship.id}`}
                >
                  <button className="button primary function">
                    <FontAwesomeIcon icon={faPen} />
                    <span>Update</span>
                  </button>
                </form>
                <form
                  className="function_button"
                  action={`/relationship/remove/${relationship.slug}`}
                >
                  <button className="button warning function">
                    <FontAwesomeIcon icon={faTrash} />
                    <span>Remove</span>
                  </button>
                </form>
              </div>
            </div>
          ))}
        </div>
        {/* <form action="/actant/new">
          <button className="button primary">Update an Actant</button>
        </form> */}
      </main>
    </>
  );
};

export default page;
