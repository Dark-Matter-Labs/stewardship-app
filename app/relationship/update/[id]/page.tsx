"use client";
import Navigation from "@/app/component/Navigation";
import React, { useEffect } from "react";
import { useParams } from "next/navigation";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { getRelatinoshipbyId, updateRelationship } from "@/sanity/sanity-utils";

const UpdateRelationship = () => {
  const router = useRouter();
  const params = useParams();
  const { id } = params;
  const [relName, setRelName] = useState("");

  useEffect(() => {
    async function fetchData() {
      const relationship = await getRelatinoshipbyId(String(id));
      setRelName(relationship.name);
    }
    fetchData();
  }, [id]);

  async function handleSummit(e: React.FormEvent) {
    e.preventDefault();

    updateRelationship(String(id), relName);
    // call redirect
    router.push("/");
  }

  return (
    <>
      <Navigation
        left="Back"
        title="Relationship"
        right="Log Out"
        myStyle={{}}
      ></Navigation>
      <main className="updateRelationship">
        <h1>Update Relationship</h1>
        <form className="w-1/2" onSubmit={handleSummit}>
          <label>
            <b>Relationship Name</b>
          </label>
          <input
            className="input"
            placeholder="Relationship name"
            id="relName"
            type="text"
            value={relName}
            onChange={(e) => setRelName(e.target.value)}
            required
          ></input>

          <button className="button primary">
            <span> Update Relationship</span>
          </button>
        </form>
      </main>
    </>
  );
};

export default UpdateRelationship;
