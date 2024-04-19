"use client";
import React from "react";
import { useRouter } from "next/navigation";
import Navigation from "../component/Navigation";
import { getAgents } from "@/sanity/sanity-utils";

async function fetchAgents() {
  const agents = await getAgents();

  agents.map((agent) => {
    console.log(agent.name);
  });
  return agents;
}

function Login() {
  const router = useRouter();
  const [account, setAccount] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [valid, setValid] = React.useState(false);

  React.useEffect(() => {
    async function runEffect() {
      const response = await getAgents();
      response.map((agent: { name: string }) => {
        console.log(agent.name + "," + account);
        if (agent.name && agent.name === account) {
          setValid(true);
          console.log("valid!");
        }
      });
      return response;
    }
    runEffect();
  }, [account]);

  function handleSubmit(e: { preventDefault: () => void }) {
    e.preventDefault();

    console.log("handling submit: " + valid);
    if (valid) {
      router.push("/");
      console.log("valid");
    } else {
      router.push("/login");
      console.log("invalid");
    }
  }
  return (
    <>
      <Navigation
        title="Log In"
        left=""
        right=""
        myStyle={{
          color: "black",
          backgroundColor: "white",
          marginTop: "2rem",
        }}
      />
      <main>
        <div className="login">
          <form onSubmit={handleSubmit}>
            <input
              className="input"
              name="account"
              placeholder="account"
              id="account"
              type="text"
              value={account}
              onChange={(event) => {
                setAccount(event.target.value);
              }}
            ></input>
            <input
              name="password"
              className="input"
              placeholder="password"
              id="password"
              type="password"
              value={password}
              onChange={(event) => {
                setPassword(event.target.value);
              }}
            ></input>
            <button className="button primary">Log In</button>
          </form>
        </div>
      </main>
    </>
  );
}

export default Login;
