import DisplayRelationship from "./DisplayRelationship";
import { options } from "../../../../api/auth/[...nextauth]/options";
import { getAgent } from "@/sanity/sanity-utils";
import { getServerSession } from "next-auth/next";
import { Agent } from "@/types/Agent";
let sessionEmail = "email@email.com";
let sessionName = "name";

const Page = async () => {
  const session = await getServerSession(options);
  console.log(session);
  if (session) {
    //retrieve user data through authenticated account
    sessionEmail = session.user?.email + "";

    // match agent data
    const agent = await getAgent(sessionEmail);
    // //replace user name with coresponding agent name
    if (agent && agent.name != undefined) {
      sessionName = agent.name;
      // console.log("========agent name: " + agent.name);
    }
    console.log("session name: ", sessionName);
  }
  return (
    <>
      <DisplayRelationship name={sessionName} />
    </>
  );
};

export default Page;
