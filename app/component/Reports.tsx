import { getReports } from "@/sanity/sanity-utils";
import Report from "./Report";

export default async function Reports({
  caption,
  sign,
}: {
  caption: boolean;
  sign: boolean;
}) {
  const reports = await getReports();

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
