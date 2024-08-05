"use client";
import styles from "../../../component/Actant.module.css";
import styles_r from "../../relationship.module.css";
import Image from "next/image";
import Navigation from "@/app/component/Navigation";
import React, { useEffect } from "react";
import { useParams } from "next/navigation";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { getRelatinoshipbyId } from "@/sanity/sanity-utils";
import { Actant } from "@/types/Actant";
import { Agent } from "@/types/Agent";
import Link from "next/link";

type DisplayRelationshipProps = {
  name: string;
};

const DisplayRelationship: React.FC<DisplayRelationshipProps> = ({ name }) => {
  const router = useRouter();
  const params = useParams();
  const { id } = params;
  const [relName, setRelName] = useState("");
  const [rightHolders, setRightHolders] = useState<Actant[]>([]);
  const [resbonsibilityHolders, setResbonsibilityHolders] = useState<Agent[]>(
    []
  );
  const [rights, setRights] = useState("");
  const [responsibilities, setResponsibilities] = useState("");

  useEffect(() => {
    async function fetchData() {
      const relationship = await getRelatinoshipbyId(String(id));
      // console.log("relationship: ", relationship);
      setRelName(relationship.name);
      setRightHolders(relationship.rightHolder);
      setResbonsibilityHolders(relationship.responsibilityHolder);
      setRights(relationship.rights);
      setResponsibilities(relationship.responsibilities);
    }
    fetchData();
  }, [id]);
  // console.log("rightHolders: ", rightHolders);
  return (
    <>
      <Navigation
        left="Back"
        title="Relationship"
        right="Log Out"
        myStyle={{}}
      ></Navigation>
      <main className="updateRelationship login">
        <div key="name" className={styles_r.block}>
          <strong className={styles_r.label}>Relationship Name </strong>
          <h1>{relName}</h1>
        </div>

        <div key="rholder" className={styles_r.block}>
          <strong className={styles_r.label}>Rights Holder </strong>
          {rightHolders.map((holder, index) => (
            <div key={index}>
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
        </div>

        <div className={styles_r.block}>
          <strong className={styles_r.label}>Resbonsibility Holder </strong>
          {resbonsibilityHolders.map((holder, index) => (
            <div key={index}>
              <div>{holder.name}</div>
              <Image
                width={45}
                height={45}
                priority
                className={styles.actant_img}
                alt={`actant image of ${holder.name}`}
                src={holder.image}
              />
              {name == holder.name && (
                <form action={`/report/new/${id}-${name}`}>
                  <button className="button primary">Create Report</button>
                </form>
              )}
            </div>
          ))}
        </div>
        <div className={styles_r.block}>
          <strong className={styles_r.label}>Rights</strong>
          <div>{rights}</div>
        </div>
        <div className={styles_r.block}>
          <strong>Responsibilities</strong>
          <div>{responsibilities}</div>
        </div>
      </main>
    </>
  );
};

export default DisplayRelationship;
