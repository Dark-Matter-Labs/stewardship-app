"use client";
import React from "react";
import { useRouter } from "next/navigation";
import Navigation from "../component/Navigation";
import { Tabs, TabList, TabPanels, Tab, TabPanel } from "@chakra-ui/react";
import Image from "next/image";
import Report from "../component/Report";
import Clause from "../component/Clause";
import Actants from "../component/Actants";

const imageSrc = "/calvin_profile.png";

const UsersPage = () => {
  const router = useRouter();
  function handleSubmit(e: { preventDefault: () => void }) {
    e.preventDefault();
    console.log("handling submit");
    router.push("/");
  }
  return (
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
            src={imageSrc}
            width={100}
            height={100}
            alt="profile image"
          />
          <h1>Calvin Po</h1>
          <p>I care therefore I am</p>
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
                  <Report caption={false} sign={false}></Report>
                  <Report caption={false} sign={false}></Report>
                  <Report caption={false} sign={false}></Report>
                  <Report caption={false} sign={false}></Report>
                </div>
              </TabPanel>
              <TabPanel>
                {/* Badges */}
                <div>
                  <p>Thank you for caring these actants</p>
                  <div className="actants_grid">
                    <Actants showName={false} />
                  </div>
                  <p>Thank you for your stewardship </p>
                  <div className="actants_grid">
                    <Clause caption={false} sign={true}></Clause>
                    <Clause caption={false} sign={true}></Clause>
                    <Clause caption={false} sign={true}></Clause>
                    <Clause caption={false} sign={true}></Clause>
                    <Clause caption={false} sign={true}></Clause>
                    <Clause caption={false} sign={true}></Clause>
                    <Clause caption={false} sign={true}></Clause>
                  </div>
                </div>
              </TabPanel>
            </TabPanels>
          </Tabs>
        </section>
      </main>
    </>
  );
};

export default UsersPage;
