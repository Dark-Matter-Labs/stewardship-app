"use client";
import React from "react";
import CreateForm from "./createForm";
import Navigation from "../../../../component/Navigation";
import { useParams } from "next/navigation";

const CreateReport: React.FC = () => {
  const params = useParams();
  const { data } = params;
  let space: string;
  let id: string | undefined;
  let name: string | undefined;
  const myArray = String(data).split("-");
  space = myArray[0];
  id = myArray[1];
  name = myArray[2];

  return (
    <>
      <Navigation
        left="Back"
        title="Feedback"
        right="Log Out"
        myStyle={{}}
        session={{}}
        space={space}
      ></Navigation>
      <main className="addclause">
        <h1>Provide Feedback</h1>
        <CreateForm relId={id} sessionName={name} spaceId=""></CreateForm>
      </main>
    </>
  );
};

export default CreateReport;
