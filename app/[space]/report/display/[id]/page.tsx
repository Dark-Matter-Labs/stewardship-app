import Navigation from "@/app/component/Navigation";
import { getServerSession } from "next-auth/next";
import { options } from "../../../../api/auth/[...nextauth]/options";
import React from "react";
import { getAgent, getAgentIdbyName } from "@/sanity/sanity-utils";
import { Agent } from "@/types/Agent";
import DisplayReport from "./DisplayReport";
let sessionName = "name";
let sessionEmail = "email@email.com";

const Page = async ({ params }: any) => {
  const space = params.space;
  // prepare agent id from session
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
      <DisplayReport sessionId={sessionId}></DisplayReport>
    </>
  );
};

export default Page;
