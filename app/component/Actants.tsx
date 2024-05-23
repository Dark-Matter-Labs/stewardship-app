import {
  getAllActants,
  getActantsByAgent,
  getAgentImageByName,
} from "@/sanity/sanity-utils";
import Actant from "./Actant";
import { Actant as ActantType } from "@/types/Actant";

export default async function Actants({
  showName,
  agent,
}: {
  showName: boolean;
  agent: string;
}) {
  let actants = null;
  let agentImg = null;
  if (agent) {
    actants = await getActantsByAgent(agent);
    // console.log("in profile:: filtering actants that " + agent + " cares.");

    agentImg = await getAgentImageByName(agent);
  } else {
    // console.log("in all actants page: ");
    actants = await getAllActants();
    // console.log(actants);
  }

  return (
    <>
      {actants.map((actant: ActantType) => (
        <Actant
          key={actant.name}
          showName={showName}
          name={actant.name ? actant.name : ""}
          imageSrc={actant.image ? actant.image + "" : "/rainbow-trout.jpg"}
          agentImageSrc={agentImg ? agentImg[0].image : ""}
        />
      ))}
    </>
  );
}
