import React from "react";
import CreateForm from "./createForm";
import Navigation from "../../component/Navigation";

const CreateReport = async () => {
  return (
    <>
      <Navigation
        left="Back"
        title="Report"
        right="Log Out"
        myStyle={{}}
      ></Navigation>
      <main className="addclause">
        <h1>Create Report</h1>
        <CreateForm></CreateForm>
      </main>
    </>
  );
};

export default CreateReport;
