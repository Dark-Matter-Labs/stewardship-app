import Navigation from "@/app/component/Navigation";

import React from "react";
import CreateForm from "./createForm";

const page = () => {
  return (
    <>
      <Navigation
        left="Back"
        title="Actant"
        right="Log Out"
        myStyle={{}}
      ></Navigation>
      <main className="addactant">
        <h1>Recognise Actant</h1>
        <CreateForm></CreateForm>
      </main>
    </>
  );
};

export default page;
