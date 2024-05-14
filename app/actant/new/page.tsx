import Navigation from "@/app/component/Navigation";
import { getServerSession } from "next-auth/next";
import { options } from "../../api/auth/[...nextauth]/options";

import React from "react";
import CreateForm from "./createForm";
import { getAgent, getAgentIdbyName } from "@/sanity/sanity-utils";
import { Agent } from "@/types/Agent";
let sessionName = "name";
let sessionEmail = "email@email.com";

const Page = async () => {
  // prepare agent id from session
  const session = await getServerSession(options);
  let sessionId = "";

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
      }
    }

    sessionId = await getAgentIdbyName(sessionName);
  }

  return (
    <>
      <Navigation
        left="Back"
        title="Actant"
        right="Log Out"
        myStyle={{}}
      ></Navigation>
      <main className="addactant">
        <h1>Recognise Actant</h1>
        <CreateForm id={sessionId}></CreateForm>
      </main>
    </>
  );
};

export default Page;
