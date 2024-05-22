import { getClauses, getClausesByAgent } from "@/sanity/sanity-utils";
import Clause from "./Clause";

export default async function Clauses({
  caption,
  sign,
  agent,
}: {
  caption: boolean;
  sign: boolean;
  agent: string;
}) {
  let clauses = null;
  if (agent) {
    clauses = await getClausesByAgent(agent);
  } else {
    clauses = await getClauses();
  }

  // console.log(clauses[0].respoinsibilityHolder[0].name);
  return (
    <>
      {clauses.map((clause) => {
        return (
          <Clause
            key={clause.name}
            caption={caption}
            sign={sign}
            resImgUrl={
              clause.responsibilityHolder?.image
                ? clause.responsibilityHolder.image
                : ""
            }
            rigImgUrl={
              clause.rightHolder?.image ? clause.rightHolder.image : ""
            }
          >
            {`${clause.name} `}
          </Clause>
        );
      })}
    </>
  );
}
