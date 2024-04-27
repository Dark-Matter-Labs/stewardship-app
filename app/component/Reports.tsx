import { getReports, getReportsByAgent } from "@/sanity/sanity-utils";
import Report from "./Report";

export default async function Reports({
  caption,
  sign,
  agent,
}: {
  caption: boolean;
  sign: boolean;
  agent: string;
}) {
  let reports = null;
  if (agent) {
    reports = await getReportsByAgent(agent);
  } else {
    reports = await getReports();
  }

  return (
    <>
      {reports.map((report) => (
        <Report
          key={report.name}
          caption={caption}
          sign={sign}
          report={report}
        />
      ))}
    </>
  );
}
