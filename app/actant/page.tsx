// import { getServerSession } from "next-auth";
import React from "react";
// import { options } from "../api/auth/[...nextauth]/options";
import Navigation from "../component/Navigation";
import Actants from "../component/Actants";
import CreateForm from "./new/createForm";

const Actant = () => {
  // const [name, setName] = React.useState("name");
  //   const session = await getServerSession(options);

  return (
    <>
      <Navigation
        left="Back"
        title="Actant"
        right="Log Out"
        myStyle={{}}
      ></Navigation>
      <main className="allactant">
        <h1>Actants in the network!</h1>
        <div className="actants_wall">
          <Actants showName={true} agent="" />
        </div>
        <form action="/actant/new">
          <button className="button primary">Recognise a New Actant</button>
        </form>
        <form action="/actant/update">
          <button className="button primary">Update or Remove an Actant</button>
        </form>
      </main>
    </>
  );
};

export default Actant;
