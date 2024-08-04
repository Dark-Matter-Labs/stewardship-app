"use client";
import React from "react";
import CreateForm from "./createForm";
import Navigation from "../../../component/Navigation";
import { getServerSession } from "next-auth/next";
import { options } from "../../../api/auth/[...nextauth]/options";
import { getAgent, getAgentIdbyName } from "@/sanity/sanity-utils";
import { useParams } from "next/navigation";
import { Agent } from "@/types/Agent";
let sessionName = "name";
let sessionEmail = "email@email.com";

const CreateReport: React.FC = () => {
  const params = useParams();
  const { data } = params;
  let id: string | undefined;
  let name: string | undefined;
  const myArray = String(data).split("-");
  id = myArray[0];
  name = myArray[1];

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
        <CreateForm relId={id} sessionName={sessionName}></CreateForm>
      </main>
    </>
  );
};

export default CreateReport;
