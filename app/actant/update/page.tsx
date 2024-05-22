import Navigation from "@/app/component/Navigation";
import "@fortawesome/fontawesome-svg-core/styles.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen, faTrash } from "@fortawesome/free-solid-svg-icons";

import { getServerSession } from "next-auth/next";
import { options } from "../../api/auth/[...nextauth]/options";
import React from "react";
import { getActantsByAgent, getAgent } from "@/sanity/sanity-utils";
import Actant from "@/app/component/Actant";
import { Actant as ActantType } from "@/types/Actant";
import { Agent } from "@/types/Agent";
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

  const actants = await getActantsByAgent(sessionName);

  return (
    <>
      <Navigation
        left="Back"
        title="Actant"
        right="Log Out"
        myStyle={{}}
      ></Navigation>
      <main className="allactant">
        <h1>Update Actants in the network</h1>
        <p>Please note the you can only update the actants you care for</p>
        <form action={`/actant`}>
          <button className="button primary">Back to All Actants</button>
        </form>
        <div className="allactant">
          {actants.map((actant: ActantType) => (
            <div className="actants_scroller" key={actant.name}>
              <Actant
                showName={true}
                name={actant.name ? actant.name : ""}
                imageSrc={
                  actant.image ? actant.image + "" : "/rainbow-trout.jpg"
                }
                agentImageSrc={""}
              />
              <div>
                <form
                  className="function_button"
                  action={`/actant/update/${actant.slug}`}
                >
                  <button className="button primary function">
                    <FontAwesomeIcon icon={faPen} />
                    <span>Update</span>
                  </button>
                </form>
                <form
                  className="function_button"
                  action={`/actant/remove/${actant.slug}`}
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
