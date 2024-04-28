// import { getServerSession } from "next-auth";
import React from "react";
// import { options } from "../api/auth/[...nextauth]/options";
import Navigation from "../component/Navigation";

import Clause from "../component/Clause";
import { getClause } from "@/sanity/sanity-utils";

const Relationship = async () => {
  //   const session = await getServerSession(options);
  const clauses = await getClause();
  return (
    <>
      <Navigation
        left="Back"
        title="Stewardship"
        right="Log Out"
        myStyle={{}}
      ></Navigation>
      <main className="relationship">
        <h1>Clauses in the network</h1>
        <div className="clauses_wall">
          {clauses.map((clause) => {
            return (
              <div key={clause.name} className="clauses_wall_item">
                <Clause
                  caption={true}
                  sign={true}
                  resImgUrl={clause.responsibilityHolder.image}
                  rigImgUrl={clause.rightHolder.image}
                >
                  {`${clause.name} `}
                </Clause>
              </div>
            );
          })}
        </div>
      </main>
    </>
  );
};

export default Relationship;
