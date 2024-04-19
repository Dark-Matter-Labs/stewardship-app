import { getReports } from "@/sanity/sanity-utils";
import ReportEl from "./ReportEl";

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
        <ReportEl
          key={report.name}
          caption={caption}
          sign={sign}
          report={report}
        />
      ))}
    </>
  );
}
