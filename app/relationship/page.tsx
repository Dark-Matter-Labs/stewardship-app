"use client";
// import { getServerSession } from "next-auth";
import React, { useEffect, useState } from "react";
// import { options } from "../api/auth/[...nextauth]/options";
import Navigation from "../component/Navigation";

import Clause from "../component/Clause";
import { getClauses } from "@/sanity/sanity-utils";
import { Clause as ClauseType } from "@/types/Clause";

const Relationship = () => {
  //   const session = await getServerSession(options);
  const [clauses, setClauses] = useState<ClauseType[]>([]);

  useEffect(() => {
    async function fetchData() {
      const allRelationships = await getClauses();
      setClauses(allRelationships);
    }
    fetchData();
  }, []);
  // const clauses = await getClauses();

  return (
    <>
      <Navigation
        left="Back"
        title="Relationship"
        right="Log Out"
        myStyle={{}}
        session={{}}
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
                      respHolders={clause.responsibilityHolder}
                      rightHolders={clause.rightHolder}
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
