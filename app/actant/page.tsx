// import { getServerSession } from "next-auth";
import React from "react";
// import { options } from "../api/auth/[...nextauth]/options";
import Navigation from "../component/Navigation";
import Actants from "../component/Actants";

const Actant = () => {
  //   const session = await getServerSession(options);
  return (
    <>
      <Navigation
        left="Back"
        title="Actant"
        right="Log Out"
        myStyle={{}}
      ></Navigation>
      <main className="actant">
        <h1>Actants in the network</h1>
        <div className="actants_scroller">
          <Actants showName={true} agent="" />
        </div>

        <form action="/actant/new">
          <button className="button primary">Recognise an Actant</button>
        </form>
      </main>
    </>
  );
};

export default Actant;
