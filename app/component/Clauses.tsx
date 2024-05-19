import { getClause } from "@/sanity/sanity-utils";
import Clause from "./Clause";

export default async function Clauses({
  caption,
  sign,
}: {
  caption: boolean;
  sign: boolean;
}) {
  const clauses = await getClause();

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
