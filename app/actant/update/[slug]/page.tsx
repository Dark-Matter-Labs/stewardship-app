"use client";
import Navigation from "@/app/component/Navigation";
import React from "react";
import { useParams } from "next/navigation";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { getActantIdbySlug, updateActant } from "@/sanity/sanity-utils";

const Post = () => {
  const router = useRouter();
  const params = useParams();
  const { slug } = params;
  const [name, setName] = useState(slug);

  const handleSummit = async (e: React.FormEvent) => {
    e.preventDefault();

    // prepare updated actant content
    // get Actant Id
    getActantIdbySlug(String(slug)).then(function (id) {
      console.log(id);
      const did = id; // get document id

      // call update api, providing document id and new name
      updateActant(did, String(name)).then(() => {
        alert("updated to " + name);
      });
    });
    // call redirect
    router.push("/actant");
  };
  return (
    <>
      <Navigation
        left="Back"
        title="Actant"
        right="Log Out"
        myStyle={{}}
      ></Navigation>
      <main className="allactant">
        <h1>Update Actant {slug}</h1>
        <form className="w-1/2" onSubmit={handleSummit}>
          <label>
            <span>Actant Name:</span>
            <input
              className="input"
              required
              type="text"
              onChange={(e) => setName(e.target.value)}
              value={name}
            ></input>
          </label>
          <button className="button primary">
            <span> Update to {name} </span>
          </button>
        </form>
      </main>
    </>
  );
};

export default Post;
