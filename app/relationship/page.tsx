// import { getServerSession } from "next-auth";
import React from "react";
// import { options } from "../api/auth/[...nextauth]/options";
import Navigation from "../component/Navigation";

import Clause from "../component/Clause";
import { getClauses } from "@/sanity/sanity-utils";

const Relationship = async () => {
  //   const session = await getServerSession(options);
  const clauses = await getClauses();
  return (
    <>
      <Navigation
        left="Back"
        title="Relationship"
        right="Log Out"
        myStyle={{}}
      ></Navigation>
      <main className="relationship">
        <h1>All Relationships</h1>
        <div className="clauses_wall">
          {clauses.map((clause) => {
            return (
              <div key={clause.name} className="clauses_wall_item">
                <Clause
                  caption={true}
                  sign={true}
                  resImgUrl={
                    clause.responsibilityHolder.image
                      ? clause.responsibilityHolder.image
                      : ""
                  }
                  rigImgUrl={
                    clause.rightHolder.image ? clause.rightHolder.image : ""
                  }
                >
                  {`${clause.name} `}
                </Clause>
              </div>
            );
          })}
        </div>
        <form action="/relationship/update">
          <button className="button primary">
            Update or Remove a relationship
          </button>
        </form>
      </main>
    </>
  );
};

export default Relationship;
