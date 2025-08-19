"use client";
import React, { useState, useEffect } from "react";
import Navigation from "../../component/Navigation";
import { getSpace, getAllActants } from "@/sanity/sanity-utils";
import { Actant as ActantType } from "@/types/Actant";
import Actant from "../../component/Actant";

export default function DisplayActants({ params }: any) {
  const space = params.space;

  let [actants, setActants] = useState<ActantType[]>([]);

  useEffect(() => {
    async function fetchData() {
      const spaceDetails = await getSpace(space);
      let listOfActants = await getAllActants(spaceDetails[0].id);
      setActants(listOfActants);
    }
    fetchData();
  }, []);

  return (
    <>
      <Navigation
        left="Back"
        title="Actant"
        session={{}}
        right="Log Out"
        myStyle={{}}
        space={space}
      ></Navigation>
      <main className="allactant">
        <h1>All Actants</h1>
        <p>These are all the actants in the network.</p>
        <div className="actants_scroller update">
          {actants.map((actant: ActantType) => (
            <form key={actant.id} action={`actant/display/${actant.id}`}>
              <button key={actant.id}>
                <Actant
                  showName={true}
                  name={actant.name ? actant.name : ""}
                  imageSrc={actant.image ? actant.image + "" : actant.imgLink}
                  agentImageSrc={""}
                />
              </button>
            </form>
          ))}
        </div>
        <form action="actant/update">
          <button className="button primary">Update or Remove an Actant</button>
        </form>
      </main>
    </>
  );
}
