import Navigation from "../component/Navigation";
import Clause from "../component/Clause";
import Actants from "../component/Actants";
import Image from "next/image";
import { Tabs, TabList, TabPanels, Tab, TabPanel } from "@chakra-ui/react";
import { getServerSession } from "next-auth/next";
import { options } from "../api/auth/[...nextauth]/options";
import { getAgent } from "@/sanity/sanity-utils";
import { Agent } from "@/types/Agent";
import Reports from "../component/Reports";
let sessionImageSrc =
  "https://cdn.sanity.io/images/zodsj17c/production/031ea2c9fffeafff80a13fe508fdc445c125256b-2158x1619.jpg";
let sessionEmail = "email@email.com";
let sessionName = "name";
let sessionMotto = "";

const UsersPage = async () => {
  //load session data
  const session = await getServerSession(options);

  if (session) {
    //retrieve data through auth account
    sessionImageSrc = session.user?.image + "";
    sessionEmail = session.user?.email + "";
    sessionName = session.user?.name + "";

    console.log("image: " + sessionImageSrc);
    console.log("Email: " + sessionEmail);
    console.log("name: " + sessionName);

    // match agent data
    const agent: Agent = await getAgent(sessionEmail);

    if (agent?.email === sessionEmail) {
      sessionEmail = agent.email;

      if (agent?.name != undefined) {
        sessionName = agent.name;
      }
      if (agent?.motto != undefined) {
        sessionMotto = agent.motto;
      }
      if (agent?.image != undefined) {
        sessionImageSrc = agent.image;
      }
    }
  }
  return (
    <>
      {session ? (
        <>
          <Navigation
            title="Profile"
            left="Home"
            right="Log Out"
            myStyle={{}}
          ></Navigation>
          <div className="theme_header"></div>
          <main className="profile">
            <section className="name">
              <Image
                className="profile_img"
                src={sessionImageSrc}
                width={100}
                height={100}
                alt="profile image"
              />
              <h1>{capitalizeFirstLetter(sessionName)}</h1>
              <p>{sessionMotto}</p>
            </section>
            <section className="profile_content">
              <Tabs variant="soft-rounded" colorScheme="brand">
                <TabList>
                  <Tab>Reports</Tab>
                  <Tab>Badges</Tab>
                </TabList>
                <TabPanels>
                  <TabPanel>
                    {/* Reports */}
                    <div className="reports_grid">
                      <Reports
                        caption={true}
                        sign={false}
                        agent={sessionName}
                      ></Reports>
                    </div>
                  </TabPanel>
                  <TabPanel>
                    {/* Badges */}
                    <div>
                      <p>Thank you for caring these actants</p>
                      <div className="actants_grid">
                        <Actants showName={false} agent={sessionName} />
                      </div>
                      <p>Thank you for your stewardship </p>
                      <div className="actants_grid">
                        {/* <Clause caption={false} sign={true}></Clause>
                    <Clause caption={false} sign={true}></Clause>
                    <Clause caption={false} sign={true}></Clause>
                    <Clause caption={false} sign={true}></Clause>
                    <Clause caption={false} sign={true}></Clause>
                    <Clause caption={false} sign={true}></Clause>
                    <Clause caption={false} sign={true}></Clause> */}
                      </div>
                    </div>
                  </TabPanel>
                </TabPanels>
              </Tabs>
            </section>
          </main>
        </>
      ) : (
        <h1>session note found!</h1>
      )}
    </>
  );
};

export default UsersPage;

function capitalizeFirstLetter(str: string) {
  return str[0].toUpperCase() + str.slice(1);
}
