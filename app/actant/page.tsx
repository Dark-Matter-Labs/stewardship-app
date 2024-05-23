"use client";
import React, { useState, useEffect } from "react";
import Navigation from "../component/Navigation";
import { getAllActants } from "@/sanity/sanity-utils";
import { Actant as ActantType } from "@/types/Actant";
import Actant from "../component/Actant";

const DisplayActants = () => {
  let [actants, setActants] = useState<ActantType[]>([]);

  useEffect(() => {
    async function fetchData() {
      let listOfActants = await getAllActants();
      setActants(listOfActants);
    }
    fetchData();
  }, []);

  return (
    <>
      <Navigation
        left="Back"
        title="Actant"
        right="Log Out"
        myStyle={{}}
      ></Navigation>
      <main className="allactant">
        <h1>All Actants</h1>
        <p>These are all the actants in the network.</p>
        <div className="actants_scroller update">
          {actants.map((actant: ActantType) => (
            <Actant
              key={actant.name}
              showName={true}
              name={actant.name ? actant.name : ""}
              imageSrc={actant.image ? actant.image + "" : "/rainbow-trout.jpg"}
              agentImageSrc={""}
            />
          ))}
        </div>
        <form action="/actant/update">
          <button className="button primary">Update or Remove an Actant</button>
        </form>
      </main>
    </>
  );
};

export default DisplayActants;
