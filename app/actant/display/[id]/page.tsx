"use client";
import Navigation from "@/app/component/Navigation";
import styles from "./Actant.module.css";
import React, { useEffect } from "react";
import { useParams } from "next/navigation";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import {
  getActantbyId,
  getActantIdbySlug,
  getActantNamebyId,
  updateActant,
} from "@/sanity/sanity-utils";

const DisplayActant = () => {
  const params = useParams();
  const { id } = params;
  const [actantName, setActantName] = useState("");
  const [actantImage, setActantImage] = useState("");
  const [agents, setAgents] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const actant = await getActantbyId(String(id));
      // console.log("actant: ", actant);
      setActantName(actant.name);
      if (actant.image) {
        setActantImage(actant.image);
      } else {
        setActantImage(actant.imgLink);
      }

      // @ts-ignore
      setAgents(actant.agents);
    }
    fetchData();
  }, [id]);

  return (
    <>
      <Navigation
        left="Back"
        title="Actant"
        right="Log Out"
        myStyle={{}}
        session={{}}
      ></Navigation>
      <main className="allactant">
        <h1>Display Actant</h1>
        <p>
          An actant is either a human or more-than-human who plays a role in
          this ecosystem.
        </p>
        <div className={styles.block}>
          <strong>Actant: </strong>
          <div>{actantName}</div>
        </div>

        <div className={styles.block}>
          <strong>Actant Image</strong>
          {actantImage && (
            <Image
              className={styles.image}
              width={125}
              height={45}
              alt={`actant image`}
              src={actantImage}
            />
          )}
        </div>

        {/* show list of agents*/}
        <br />
        <br />
        <br />
        {agents?.length > 0 && <p>This actant is stewarded by these agents:</p>}
        {agents?.map((holder, index) => (
          <div key={index}>
            {/* @ts-ignore */}
            <div>{holder.name}</div>
          </div>
        ))}
      </main>
    </>
  );
};

export default DisplayActant;
