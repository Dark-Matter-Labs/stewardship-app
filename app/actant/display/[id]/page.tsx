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

  useEffect(() => {
    async function fetchData() {
      const actant = await getActantbyId(String(id));
      console.log("actant: ", actant);
      setActantName(actant.name);
      setActantImage(actant.image);
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
      ></Navigation>
      <main className="allactant">
        <h1>Display Actant</h1>
        <div className={styles.block}>
          <strong>Actant Name</strong>
          <div>{actantName}</div>
        </div>

        <div className={styles.block}>
          <strong>Actant Image</strong>
          <Image
            className={styles.image}
            width={125}
            height={45}
            alt={`actant image`}
            src={actantImage}
          />
        </div>
      </main>
    </>
  );
};

export default DisplayActant;
