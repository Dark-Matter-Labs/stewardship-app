"use client";
import React from "react";
import { useRouter } from "next/navigation";
import Navigation from "../component/Navigation";

const UsersPage = () => {
  const router = useRouter();
  function handleSubmit(e: { preventDefault: () => void }) {
    e.preventDefault();
    console.log("handleing submit");
    router.push("/");
  }
  return (
    <>
      <Navigation
        title="Log In"
        myStyle={{
          color: "black",
          backgroundColor: "white",
          marginTop: "2rem",
        }}
      ></Navigation>
      <main>
        <div className="login">
          <form onSubmit={handleSubmit}>
            <input
              className="input"
              placeholder="account"
              id="account"
              type="text"
            ></input>
            <input
              className="input"
              placeholder="password"
              id="password"
              type="password"
            ></input>
            <button className="button primary">Log In</button>
          </form>
        </div>
      </main>
    </>
  );
};

export default UsersPage;
