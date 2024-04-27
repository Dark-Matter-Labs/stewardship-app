import { getActants, getActantsByAgent } from "@/sanity/sanity-utils";
import Actant from "./Actant";

export default async function Actants({
  showName,
  agent,
}: {
  showName: boolean;
  agent: string;
}) {
  let actants = null;
  if (agent) {
    actants = await getActantsByAgent(agent);
    console.log("searching actant that " + agent + " cares.");
  } else {
    actants = await getActants();
  }

  return (
    <>
      {actants.map((actant) => (
        <Actant
          key={actant.name}
          showName={showName}
          name={actant.name ? actant.name : ""}
          imageSrc={actant.image ? actant.image : ""}
        />
      ))}
    </>
  );
}
