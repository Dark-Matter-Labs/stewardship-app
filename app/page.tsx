"use client";
import { useRouter } from "next/navigation";
import Navigation from "./component/Navigation";
import Actant from "./component/Actant";
import Report from "./component/Report";
import { ChakraProvider } from "@chakra-ui/react";
import Image from "next/image";
import Clause from "./component/Clause";
const imageSrc = "/graphnetwork.png";
import ForceLayoutGraph from "./component/ForceLayoutGraph";

export default function Home() {
  const router = useRouter();
  function handleSubmit(e: { preventDefault: () => void }) {
    e.preventDefault();
    console.log("handleing submit");
    router.push("/clause/new");
  }
  function toAllClauses(e: { preventDefault: () => void }) {
    e.preventDefault();
    console.log("handleing submit");
    router.push("/clause/all");
  }
  return (
    <ChakraProvider>
      <Navigation
        left="Profile"
        title="Stewardship"
        right="Log Out"
        myStyle={{}}
      ></Navigation>
      <div className="theme_header graph-network">
        {/* <Image alt="graph-network" src={imageSrc} width={500} height={500} /> */}
        <ForceLayoutGraph></ForceLayoutGraph>
      </div>
      <main className="feed">
        <h1>Hi Calvin, this is what’s happening today.</h1>
        <section>
          <h2>Reports highlighted</h2>
          <div className="reports_scroller">
            <Report caption={true} sign={true}></Report>
            <Report caption={true} sign={true}></Report>
            <Report caption={true} sign={true}></Report>
            <Report caption={true} sign={true}></Report>
          </div>
        </section>
        <section>
          <h2>Reports requiring some feedback</h2>
          <div className="reports_scroller">
            <Report caption={true} sign={true}></Report>
          </div>
          <form onSubmit={handleSubmit}>
            <button className="button primary">See More Recent Events</button>
          </form>
        </section>
        <h1>This is what makes the current network</h1>
        <section>
          <h2>Actants in the network</h2>
          <div className="actants_scroller">
            <Actant name={true}></Actant>
            <Actant name={true}></Actant>
            <Actant name={true}></Actant>
          </div>
          <form onSubmit={handleSubmit}>
            <button className="button primary">View Other Actants</button>
          </form>
        </section>
        <section>
          <h2>Clauses in the network</h2>
          <div className="clauses_scroller">
            <Clause caption={true} sign={true}></Clause>
            <Clause caption={true} sign={true}></Clause>
            <Clause caption={true} sign={true}></Clause>
          </div>
          <form onSubmit={toAllClauses}>
            <button className="button primary">View Other Clauses</button>
          </form>
          <form onSubmit={handleSubmit}>
            <button className="button primary">Create a New Clause</button>
          </form>
        </section>
      </main>
    </ChakraProvider>
  );
}
