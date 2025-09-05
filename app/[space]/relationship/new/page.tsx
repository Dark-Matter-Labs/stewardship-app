import React from "react";
import { getServerSession } from "next-auth/next";
import CreateForm from "./createForm";
import { options } from "../../../api/auth/[...nextauth]/options";
import Navigation from "../../../component/Navigation";
import { Agent } from "@/types/Agent";
import { getSpace, getAgent } from "@/sanity/sanity-utils";

let sessionEmail = "email@email.com";
let agentId = "";

const Relationship = async ({ params }: any) => {
  const space = params.space;
  const spaceDetails = await getSpace(space);
  const session = await getServerSession(options);

  let agent: Agent;

  if (session) {
    //retrieve user data through authenticated account
    sessionEmail = session.user?.email + "";

    // match user data to agent data
    const foundAgent = await getAgent(sessionEmail);
    if (!foundAgent) {
      throw new Error("Agent not found for the given email.");
    }
    agent = foundAgent;
    agentId = agent.id;
  }
  return (
    <>
      <Navigation
        left="Back"
        title="Clauses"
        right="Log Out"
        myStyle={{}}
        session={{}}
        space={space}
      ></Navigation>
      <main className="addclause">
        <h1>Recognise a New Relationship</h1>
        <p>
          A relationship represents promises made by actants to provide another
          with a condition needed to thrive.
        </p>
        {/* @ts-ignore */}
        <CreateForm
          agentId={agentId}
          spaceId={spaceDetails[0].id}
          space={space}
        ></CreateForm>
      </main>
    </>
  );
};

export default Relationship;
