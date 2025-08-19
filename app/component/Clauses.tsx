import { getClauses, getClausesByAgent } from "@/sanity/sanity-utils";
import Clause from "./Clause";

export default async function Clauses({
  caption,
  sign,
  agent,
  space,
  spaceId,
}: {
  caption: boolean;
  sign: boolean;
  agent: string;
  space: string;
  spaceId: string;
}) {
  let clauses = null;
  if (agent) {
    clauses = await getClausesByAgent(agent);
  } else {
    clauses = await getClauses(spaceId);
  }

  return (
    <>
      {clauses.map((clause) => {
        return (
          <form
            key={clause.id}
            action={`/${space}/relationship/display/${clause.id}`}
          >
            <button>
              <Clause
                key={clause.name}
                caption={caption}
                sign={sign}
                respHolders={clause.responsibilityHolder}
                rightHolders={clause.rightHolder}
              >
                {`${clause.name} `}
              </Clause>
            </button>
          </form>
        );
      })}
    </>
  );
}
