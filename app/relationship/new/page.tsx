// import { getServerSession } from "next-auth";
import React from "react";
// import { options } from "../api/auth/[...nextauth]/options";
import Navigation from "../../component/Navigation";

const Relationship = () => {
  //   const session = await getServerSession(options);
  return (
    <>
      <>
        <Navigation
          left="Back"
          title="New Stewardship"
          right="Log Out"
          myStyle={{}}
        ></Navigation>
      </>
    </>
  );
};

export default Relationship;
