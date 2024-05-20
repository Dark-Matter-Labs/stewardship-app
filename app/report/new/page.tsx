import React from "react";
import CreateForm from "./createForm";
import Navigation from "../../component/Navigation";
import { getServerSession } from "next-auth/next";
import { options } from "../../api/auth/[...nextauth]/options";
import { getAgent, getAgentIdbyName } from "@/sanity/sanity-utils";
import { Agent } from "@/types/Agent";
let sessionName = "name";
let sessionEmail = "email@email.com";

const CreateReport = async () => {
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
        title="Report"
        right="Log Out"
        myStyle={{}}
      ></Navigation>
      <main className="addclause">
        <h1>Create Report</h1>
        <CreateForm id={sessionId}></CreateForm>
      </main>
    </>
  );
};

export default CreateReport;
