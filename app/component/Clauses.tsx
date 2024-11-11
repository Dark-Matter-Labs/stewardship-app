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

  return (
    <>
      {clauses.map((clause) => {
        return (
          <form key={clause.id} action={`/relationship/display/${clause.id}`}>
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
