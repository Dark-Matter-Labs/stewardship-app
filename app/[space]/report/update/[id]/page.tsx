"use client";
import Navigation from "@/app/component/Navigation";
import React, { useEffect } from "react";
import { useParams } from "next/navigation";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { getReportbyId, updateReport } from "@/sanity/sanity-utils";

const UpdateReport = () => {
  const router = useRouter();
  const params = useParams();
  const { space, id } = params;
  const [reportName, setReportName] = useState("");
  const [reportContent, setReportContent] = useState("");

  useEffect(() => {
    async function fetchData() {
      const report = await getReportbyId(String(id));
      setReportName(report.name);
      setReportContent(report.content);
    }
    fetchData();
  }, [id]);

  async function handleSummit(e: React.FormEvent) {
    e.preventDefault();

    updateReport(String(id), reportName, reportContent);
    // call redirect
    router.push("/");
  }

  return (
    <>
      <Navigation
        left="Back"
        title="Report"
        right="Log Out"
        myStyle={{}}
        session={{}}
        space={space}
      ></Navigation>
      <main className="updateReport login ">
        <h1>Update Report</h1>
        <form className="w-1/2" onSubmit={handleSummit}>
          <label>
            <b>Report Name</b>
          </label>
          <input
            className="input"
            placeholder="Report name"
            id="reportName"
            type="text"
            value={reportName}
            onChange={(e) => setReportName(e.target.value)}
            required
          ></input>
          <label>
            <b>Report Content</b>
          </label>
          <textarea
            className="input"
            placeholder="Report content"
            id="reportContentId"
            value={reportContent}
            onChange={(e) => setReportContent(e.target.value)}
            required
          ></textarea>
          <button className="button primary">
            <span> Update Report </span>
          </button>
        </form>
      </main>
    </>
  );
};

export default UpdateReport;
