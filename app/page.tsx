"use client";
import Navigation from "./component/Navigation";
import Report from "./component/Report";
import Clause from "./component/Clause";
import Actants from "./component/Actants";
import ForceLayoutGraph from "./component/ForceLayoutGraph";
import { ChakraProvider } from "@chakra-ui/react";
export default function Home() {
  return (
    <ChakraProvider>
      <Navigation
        left="Profile"
        title="Stewardship"
        right="Log Out"
        myStyle={{}}
      ></Navigation>
      <div className="theme_header graph-network">
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

          <button className="button primary">See More Recent Events</button>
        </section>
        <h1>This is what makes the current network</h1>
        <section>
          <h2>Actants in the network</h2>
          <div className="actants_scroller">
            <Actants showName={true} />
          </div>

          <button className="button primary">View Other Actants</button>
        </section>
        <section>
          <h2>Clauses in the network</h2>
          <div className="clauses_scroller">
            <Clause caption={true} sign={true}></Clause>
            <Clause caption={true} sign={true}></Clause>
            <Clause caption={true} sign={true}></Clause>
          </div>
          <button className="button primary">View Other Clauses</button>
          <button className="button primary">Create a New Clause</button>
        </section>
      </main>
    </ChakraProvider>
  );
}
