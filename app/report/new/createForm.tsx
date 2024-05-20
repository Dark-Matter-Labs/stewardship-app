"use client";
import React, { useEffect, useState } from "react";
import { Clause as ClauseType } from "@/types/Clause";
import { createReport, getClause } from "@/sanity/sanity-utils";
import { ReportTypeCreation } from "@/types/ReportTypeCreation";
const Form = () => {
  let [clauses, setClauses] = useState<ClauseType[]>([]);

  useEffect(() => {
    async function fetchData() {
      let listOfClauses = await getClause();
      setClauses(listOfClauses);
    }
    fetchData();
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Retrieve name
    const name = e.currentTarget.reportName.value;
    console.log("report name: ", name);

    // Retrieve report type
    const reportType = e.currentTarget.reportType.value;
    console.log("report type: ", reportType);

    // Prepare report
    const report: ReportTypeCreation = {
      _type: "report",
      name: name,
      type: reportType,
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
            <option value="Sign">Sign</option>
            <option value="Breach">Breach</option>
            <option value="Fulfillment">Fulfillment</option>
            <option value="Termination">Termination</option>
            <option value="Review">Review</option>
          </select>
        </div>
        <div className="dropdownGroup">
          <div className="dropdownHeader">
            <label>Select clause linked to the Report</label>
          </div>
          <select id="clause" name="Clause">
            {clauses.map((clause: ClauseType) => (
              <option key={clause.id} value={clause.id}>
                {clause.name}
              </option>
            ))}
          </select>
        </div>

        <button className="button primary">Create Report</button>
      </form>
    </div>
  );
};

export default Form;
