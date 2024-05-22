"use client";
import React, { useEffect, useState } from "react";
import { Clause as ClauseType } from "@/types/Clause";
import {
  client,
  createReport,
  genRanHex,
  getClauses,
} from "@/sanity/sanity-utils";
import { ReportTypeCreation } from "@/types/ReportTypeCreation";
export default function CreateForm({ id }: { id: string }) {
  let [clauses, setClauses] = useState<ClauseType[]>([]);

  console.log("the id CreateForm gets is: ", id);

  useEffect(() => {
    async function fetchData() {
      let listOfClauses = await getClauses();
      setClauses(listOfClauses);
    }
    fetchData();
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Retrieve name
    const name = e.currentTarget.reportName.value;
    console.log("report name: ", name);

    // Generate slug
    const slug = name.replace(/ /g, "-");

    // Retrieve report type
    const reportType = e.currentTarget.reportType.value;
    console.log("report type: ", reportType);

    // Retrieve clause
    const clauseId = e.currentTarget.clauseId.value;
    console.log("clause id: ", clauseId);

    // Retrieve content
    const reportContent = e.currentTarget.reportContentId.value;
    console.log("report content: ", reportContent);

    // Upload Image
    const image = await client.assets.upload(
      "image",
      e.currentTarget.reportImage.files[0]
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
        _ref: clauseId,
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
        _ref: id,
      },
    };

    // Create report
    try {
      await createReport(report);
    } catch (e) {
      console.log("error: ", e);
    }
  };

  return (
    <div className="login">
      <form className="createReport" onSubmit={handleSubmit}>
        <label>
          <b>Report Name</b>
        </label>
        <input
          className="input"
          placeholder="Report name"
          id="reportName"
          type="text"
        ></input>
        <div className="dropdownGroup">
          <div className="dropdownHeader">
            <label>Report Type</label>
          </div>
          <select id="reportType" name="Type">
            <option value="sign">Sign</option>
            <option value="breach">Breach</option>
            <option value="fulfillment">Fulfillment</option>
            <option value="termination">Termination</option>
            <option value="review">Review</option>
          </select>
        </div>
        <div className="dropdownGroup">
          <div className="dropdownHeader">
            <label>Clause</label>
          </div>
          <select id="clauseId" name="Clause">
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
        ></textarea>
        <div>
          <label>
            <b>Report Evidence</b>
          </label>
        </div>
        <label htmlFor="reportImage" className="custom-file-upload">
          Photo Upload
        </label>
        <input type="file" id="reportImage" accept="image/png, image/jpeg" />
        <button className="button primary">Create Report</button>
      </form>
    </div>
  );
}
