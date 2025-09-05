import React from "react";
import CreateForm from "./createForm";
import Navigation from "../../../component/Navigation";
import { getServerSession } from "next-auth/next";
import { options } from "../../../api/auth/[...nextauth]/options";
import { getAgent, getAgentIdbyName, getSpace } from "@/sanity/sanity-utils";
import { Agent } from "@/types/Agent";
let sessionName = "name";
let sessionEmail = "email@email.com";

const CreateReport = async ({ params }: any) => {
  const space = params.space;
  const spaceDetails = await getSpace(space);
  const session = await getServerSession(options);
  let sessionId = "";

  if (session) {
    //retrieve user data through authenticated account
    sessionEmail = session.user?.email + "";
    sessionName = session.user?.name + "";

    // match user data to agent data
    const agent = await getAgent(sessionEmail);

    if (agent && agent.email === sessionEmail) {
      sessionEmail = agent.email;

      //replace user name with coresponding agent name
      if (agent.name != undefined) {
        sessionName = agent.name;
      }
    }

    sessionId = await getAgentIdbyName(sessionName);
  }

  return (
    <>
      <Navigation
        left="Back"
        title="Feedback"
        right="Log Out"
        myStyle={{}}
        session={{}}
        space={space}
      ></Navigation>
      <main className="addclause">
        <h1>Provide Feedback</h1>
        <CreateForm
          id={sessionId}
          spaceId={spaceDetails[0].id}
          space={space}
        ></CreateForm>
      </main>
    </>
  );
};

export default CreateReport;
