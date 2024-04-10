"use client";
import React from "react";
import { useRouter } from "next/navigation";

const UsersPage = () => {
  const router = useRouter();
  function handleSubmit(e: { preventDefault: () => void }) {
    e.preventDefault();
    console.log("handleing submit");
    router.push("/");
  }
  return (
    <div className="login">
      <b>Create a Clause</b>
      <form onSubmit={handleSubmit}>
        <input
          className="input"
          placeholder="Relationship name"
          id="Relationship name"
          type="text"
        ></input>
        <input
          className="input"
          placeholder="Responsibility holder(s)"
          id="Responsibility holder"
          type="text"
        ></input>
        <input
          className="input"
          placeholder="Right Holder(s)"
          id="Right Holder"
          type="text"
        ></input>
        <input
          className="input"
          placeholder="Rights"
          id="Rights"
          type="text"
        ></input>
        <input
          className="input"
          placeholder="Responsibilities"
          id="Responsibilities"
          type="text"
        ></input>
        <button className="button primary">Create Relationship</button>
      </form>
    </div>
  );
};

export default UsersPage;
