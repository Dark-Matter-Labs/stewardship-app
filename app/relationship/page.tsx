// import { getServerSession } from "next-auth";
import React from "react";
// import { options } from "../api/auth/[...nextauth]/options";
import Navigation from "../component/Navigation";

import Clause from "../component/Clause";
import { getClauses } from "@/sanity/sanity-utils";

const Relationship = async () => {
  //   const session = await getServerSession(options);
  const clauses = await getClauses();
  console.log(clauses);
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
              <form
                key={clause.id}
                action={`/relationship/display/${clause.id}`}
                className="clauses_wall_item"
              >
                <button>
                  <div>
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
                </button>
              </form>
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
