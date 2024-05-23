import React from "react";
import Navigation from "../component/Navigation";
import Report from "../component/Report";
import { getReports } from "@/sanity/sanity-utils";

const DisplayReport = async () => {
  const reports = await getReports();
  return (
    <>
      <Navigation
        left="Back"
        title="Reports"
        right="Log Out"
        myStyle={{}}
      ></Navigation>
      <main className="relationship">
        <h1>All Reports</h1>
        <div className="reports_wall ">
          {reports.map((report) => {
            return (
              <div key={report.name} className="in_all_report">
                <Report
                  key={report.name}
                  caption={true}
                  sign={true}
                  report={report}
                />
              </div>
            );
          })}
        </div>
        <form action="/report/update">
          <button className="button primary">Update or Remove a report</button>
        </form>
      </main>
    </>
  );
};

export default DisplayReport;
