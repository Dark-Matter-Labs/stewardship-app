import Navigation from "@/app/component/Navigation";
import { getServerSession } from "next-auth/next";
import { options } from "../../../api/auth/[...nextauth]/options";

import React from "react";
import CreateForm from "./createForm";
import { getSpace, getAgent, getAgentIdbyName } from "@/sanity/sanity-utils";
import { Agent } from "@/types/Agent";
let sessionName = "name";
let sessionEmail = "email@email.com";

const Page = async ({ params }: any) => {
  // prepare agent id from session
  console.log(options);
  const session = await getServerSession(options);
  console.log("sessionNOW:::::::::::::::::", session);
  let sessionId = "";

  const space = params.space;
  const spaceDetails = await getSpace(space);

  if (session) {
    //retrieve user data through authenticated account
    sessionEmail = session.user?.email + "";
    sessionName = session.user?.name + "";

    // match user data to agent data
    const agent: Agent | null = await getAgent(sessionEmail);

    if (agent?.email === sessionEmail) {
      sessionEmail = agent.email;

      //replace user name with coresponding agent name
      if (agent?.name != undefined) {
        sessionName = agent.name;
      }
    }

    sessionId = await getAgentIdbyName(sessionName);
    console.log("session id: ", sessionId);
  }

  return (
    <>
      <Navigation
        left="Back"
        title="Actant"
        right="Log Out"
        myStyle={{}}
        session={{}}
        space={space}
      ></Navigation>
      <main className="addactant">
        <h1>Recognise Actant</h1>
        <CreateForm
          id={sessionId}
          spaceId={spaceDetails[0].id}
          space={space}
        ></CreateForm>
      </main>
    </>
  );
};

export default Page;
