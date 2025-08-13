import { getReports, getReportsByAgent } from "@/sanity/sanity-utils";
import Report from "./Report";

export default async function Reports({
  caption,
  spaceId,
  spaceURL,
  sign,
  agent,
}: {
  caption: boolean;
  spaceId: string;
  spaceURL: string;
  sign: boolean;
  agent: string;
}) {
  let reports = null;
  if (agent) {
    reports = await getReportsByAgent(spaceId, agent);
  } else {
    reports = await getReports(spaceId);
  }

  return (
    <>
      {reports.map((report) => (
        <>
          <form
            key={report.id}
            action={`${spaceURL}/report/display/${report.id}`}
          >
            <button>
              <Report
                key={report.name}
                caption={caption}
                sign={sign}
                report={report}
              />
            </button>
          </form>
        </>
      ))}
    </>
  );
}
