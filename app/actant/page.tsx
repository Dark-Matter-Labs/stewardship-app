// import { getServerSession } from "next-auth";
import React from "react";
// import { options } from "../api/auth/[...nextauth]/options";
import Navigation from "../component/Navigation";

const Actant = () => {
  //   const session = await getServerSession(options);
  return (
    <>
      <>
        <Navigation
          left="Back"
          title="Actant"
          right="Log Out"
          myStyle={{}}
        ></Navigation>
      </>
    </>
  );
};

export default Actant;
