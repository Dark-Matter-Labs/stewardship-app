"use client";
import React, { useEffect, useState } from "react";
import Navigation from "../../component/Navigation";
import Report from "../../component/Report";
import { getSpace, getReports } from "@/sanity/sanity-utils";
import { Report as ReportType } from "@/types/Report";

const DisplayReport = ({ params }: any) => {
  const space = params.space;

  const [reports, setListOfReports] = useState<ReportType[]>([]);

  useEffect(() => {
    async function fetchData() {
      const spaceDetails = await getSpace(space);
      const allReports = await getReports(spaceDetails[0].id);
      setListOfReports(allReports);
    }
    fetchData();
  }, []);

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
      <main className="relationship">
        <h1>All Feedbacks</h1>
        <div className="reports_wall ">
          {reports.map((report) => {
            return (
              <form
                className="in_all_report"
                key={report.id}
                action={`/${space}/report/display/${report.id}`}
              >
                <button>
                  <div key={report.name}>
                    <Report
                      key={report.name}
                      caption={true}
                      sign={true}
                      report={report}
                    />
                  </div>
                </button>
              </form>
            );
          })}
        </div>
        <form action={`report/update`}>
          <button className="button primary">
            Update or Remove a feedback
          </button>
        </form>
      </main>
    </>
  );
};

export default DisplayReport;
