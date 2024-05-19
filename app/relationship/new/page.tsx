import React from "react";
import CreateForm from "./createForm";
import Navigation from "../../component/Navigation";

const Relationship = async () => {
  return (
    <>
      <Navigation
        left="Back"
        title="Clauses"
        right="Log Out"
        myStyle={{}}
      ></Navigation>
      <main className="addclause">
        <h1>Recognise Relationship</h1>
        <CreateForm></CreateForm>
      </main>
    </>
  );
};

export default Relationship;
