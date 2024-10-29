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
        <h1>Recognise a New Relationship</h1>
        <p>
        A relationship represents promises made by actants to provide another with a condition needed to thrive.</p>
        <CreateForm></CreateForm>
      </main>
    </>
  );
};

export default Relationship;
