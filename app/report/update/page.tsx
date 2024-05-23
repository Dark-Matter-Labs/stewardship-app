import Navigation from "@/app/component/Navigation";
import "@fortawesome/fontawesome-svg-core/styles.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen, faTrash } from "@fortawesome/free-solid-svg-icons";

import { getServerSession } from "next-auth/next";
import { options } from "../../api/auth/[...nextauth]/options";
import React from "react";
import {
  getActantsByAgent,
  getAgent,
  getReportsByAgent,
} from "@/sanity/sanity-utils";
import Report from "@/app/component/Report";
import { Report as ReportType } from "@/types/Report";
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

  const reports = await getReportsByAgent(sessionName);

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
        <p>Please note that you can only update the actants you care for</p>
        <form action={`/actant`}>
          <button className="button primary">Back to All Actants</button>
        </form>
        <div className="allactant">
          {reports.map((report: ReportType) => (
            <div className="actants_scroller" key={report.name}>
              <Report
                key={report.name}
                caption={true}
                sign={false}
                report={report}
              />
              <div>
                <form
                  className="function_button"
                  action={`/report/update/${report.id}`}
                >
                  <button className="button primary function">
                    <FontAwesomeIcon icon={faPen} />
                    <span>Update</span>
                  </button>
                </form>
                <form
                  className="function_button"
                  action={`/report/remove/${report.slug}`}
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
