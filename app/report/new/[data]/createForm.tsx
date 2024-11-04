"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Clause as ClauseType } from "@/types/Clause";
import { Agent } from "@/types/Agent";
import {
  client,
  createReport,
  genRanHex,
  getAgentIdByName,
  getClauses,
} from "@/sanity/sanity-utils";
import { ReportTypeCreation } from "@/types/ReportTypeCreation";
import router from "next/router";

export default function CreateForm({
  relId,
  sessionName,
}: {
  relId: string;
  sessionName: string;
}) {
  const router = useRouter();
  console.log("hello");
  let [clauses, setClauses] = useState<ClauseType[]>([]);
  let [id, setId] = useState<String>();
  let [selectedImageSrc, setSelectedImageSrc] = useState("no file chosen");
  const [selectedClauseId, setSelectedClauseId] = useState<string | undefined>(
    relId,
  );

  console.log("the relId CreateForm' gets is: ", relId);
  console.log("the sessionName CreateForm' gets is: ", sessionName);

  useEffect(() => {
    async function fetchData() {
      let listOfClauses = await getClauses();
      setClauses(listOfClauses);
      let agentId = await getAgentIdByName(sessionName);
      setId(agentId);
      setSelectedClauseId(relId);
    }
    fetchData();
    console.log("updated");
  }, [relId, sessionName]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    console.log("the clause selcted is: ", selectedClauseId);
    console.log("the sessionId before submitting is: ", id);

    if (e.currentTarget.reportImage.files[0] == null) {
      alert("please upload image");
      return;
    }

    // Retrieve name
    const name = e.currentTarget.reportName.value;
    console.log("report name: ", name);

    // Generate slug
    const slug = name.replace(/ /g, "-");

    // Retrieve report type
    const reportType = e.currentTarget.reportType.value;
    console.log("report type: ", reportType);

    // // Retrieve clause
    // const clauseId = e.currentTarget.clauseId.value;
    // console.log("clause id: ", clauseId);

    // Retrieve content
    const reportContent = e.currentTarget.reportContentId.value;
    console.log("report content: ", reportContent);

    // Upload Image
    const image = await client.assets.upload(
      "image",
      e.currentTarget.reportImage.files[0],
    );

    // Prepare report
    const report: ReportTypeCreation = {
      _type: "report",
      name: name,
      slug: {
        _type: "slug",
        current: slug,
      },
      type: reportType,
      clause: {
        _type: "reference",
        _ref: String(selectedClauseId),
      },
      image: {
        _type: "image",
        asset: {
          _type: "reference",
          _ref: image._id,
        },
      },
      content: reportContent,
      reporter: {
        _type: "reference",
        _ref: String(id),
      },
    };

    // Create report
    try {
      await createReport(report);
    } catch (e) {
      console.log("error: ", e);
    }

    // Redirect to root
    router.push("/");
  };

  function readURL(e: React.FormEvent<HTMLInputElement>) {
    // display selected image's URL
    let filepath: string = e.currentTarget.value;
    let filename: string = filepath.split("\\").pop()!;

    if (filepath) {
      setSelectedImageSrc(filename);
    }
  }

  return (
    <div className="login">
      <form className="createReport" onSubmit={handleSubmit}>
        <label>
          <b>Feedback Name</b>
        </label>
        <input
          className="input"
          placeholder="Feedback name"
          id="reportName"
          type="text"
          required
        ></input>
        <div className="dropdownGroup">
          <div className="dropdownHeader">
            <label>Feedback Type</label>
          </div>
          <select id="reportType" name="Type">
            <option value="sign">Sign</option>
            <option value="breach">Promise broken</option>
            <option value="fulfillment">Promise fulfilled</option>
            <option value="termination">Promise Termination</option>
            <option value="review">Amendment</option>
          </select>
        </div>
        <div className="dropdownGroup">
          <div className="dropdownHeader">
            <label>Clause</label>
          </div>
          <select
            id="clauseId"
            name="Clause"
            value={selectedClauseId}
            onChange={(e) => setSelectedClauseId(e.target.value)}
          >
            {clauses.map((clause: ClauseType) => (
              <option key={clause.id} value={clause.id}>
                {clause.name}
              </option>
            ))}
          </select>
        </div>
        <label>
          <b>Report Content</b>
        </label>
        <textarea
          className="input"
          placeholder="Report content"
          id="reportContentId"
          required
        ></textarea>
        <div>
          <label>
            <b>Report Evidence</b>
          </label>
        </div>
        <label htmlFor="reportImage" className="custom-file-upload">
          Photo Upload
        </label>
        <input
          type="file"
          id="reportImage"
          accept="image/png, image/jpeg"
          onChange={(e) => readURL(e)}
        />
        <div>{selectedImageSrc}</div>

        <button className="button primary">Create Report</button>
      </form>
    </div>
  );
}
