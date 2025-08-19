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
  const { space, id } = params;
  const [relName, setRelName] = useState("");
  const [rights, setRights] = useState("");
  const [responsibilities, setResponsibilities] = useState("");

  useEffect(() => {
    async function fetchData() {
      const relationship = await getRelatinoshipbyId(String(id));
      setRelName(relationship.name);
      setRights(relationship.rights);
      setResponsibilities(relationship.responsibilities);
    }
    fetchData();
  }, [id]);

  async function handleSummit(e: React.FormEvent) {
    e.preventDefault();

    updateRelationship(String(id), relName, rights, responsibilities);
    // call redirect
    router.push("/" + space);
  }

  return (
    <>
      <Navigation
        left="Back"
        title="Relationship"
        right="Log Out"
        session={{}}
        myStyle={{}}
        space={space}
      ></Navigation>
      <main className="updateRelationship login">
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

          <label>
            <b>Rights</b>
          </label>
          <input
            className="input"
            placeholder="Rights"
            id="rights"
            type="text"
            value={rights}
            onChange={(e) => setRights(e.target.value)}
            required
          ></input>

          <label>
            <b>Responsibilities</b>
          </label>
          <input
            className="input"
            placeholder="Responsibilities"
            id="responsibilities"
            type="text"
            value={responsibilities}
            onChange={(e) => setResponsibilities(e.target.value)}
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
