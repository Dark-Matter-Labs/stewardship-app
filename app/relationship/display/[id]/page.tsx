"use client";
import styles from "../../../component/Actant.module.css";
import Image from "next/image";
import Navigation from "@/app/component/Navigation";
import React, { useEffect } from "react";
import { useParams } from "next/navigation";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { getRelatinoshipbyId } from "@/sanity/sanity-utils";
import { Actant } from "@/types/Actant";
import { Agent } from "@/types/Agent";

const DisplayRelationship = () => {
  const router = useRouter();
  const params = useParams();
  const { id } = params;
  const [relName, setRelName] = useState("");
  const [rightHolders, setRightHolders] = useState<Actant[]>([]);
  const [resbonsibilityHolders, setResbonsibilityHolders] = useState<Agent[]>(
    []
  );

  useEffect(() => {
    async function fetchData() {
      console.log("hello!!");
      const relationship = await getRelatinoshipbyId(String(id));
      console.log("relationship: ", relationship);
      setRelName(relationship.name);
      setRightHolders(relationship.rightHolder);
      setResbonsibilityHolders(relationship.responsibilityHolder);
    }
    fetchData();
  }, [id]);
  console.log("rightHolders: ", rightHolders);
  return (
    <>
      <Navigation
        left="Back"
        title="Relationship"
        right="Log Out"
        myStyle={{}}
      ></Navigation>
      <main className="updateRelationship login">
        <div>Relationship Name </div>
        <h1>{relName}</h1>

        <div>Rights Holder </div>
        {rightHolders.map((holder) => (
          <div key={holder.id}>
            <div>{holder.name}</div>
            <Image
              width={45}
              height={45}
              priority
              className={styles.actant_img}
              alt={`actant image of ${holder.name}`}
              src={holder.image}
            />
          </div>
        ))}

        <div>Resbonsibility Holder </div>
        {resbonsibilityHolders.map((holder) => (
          <div key={holder.id}>
            <div>{holder.name}</div>
            <Image
              width={45}
              height={45}
              priority
              className={styles.actant_img}
              alt={`actant image of ${holder.name}`}
              src={holder.image}
            />
          </div>
        ))}
      </main>
    </>
  );
};

export default DisplayRelationship;
