"use client";
import {
  createClause,
  genRanHex,
  getAllActants,
  getAllAgents,
  getAllResponsibilities,
  getAllRights,
} from "@/sanity/sanity-utils";
import { ClauseTypeCreation } from "@/types/ClauseTypeCreation";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Agent as AgentType } from "@/types/Agent";
import { Actant as ActantType } from "@/types/Actant";
import { Right as RightType } from "@/types/Right";
import { Responsibility as ResponsibilityType } from "@/types/Responsibility";

export default function CreateForm() {
  const router = useRouter();
  let [agents, setAgents] = useState<AgentType[]>([]);
  let [actants, setActants] = useState<ActantType[]>([]);
  // let [rights, setRights] = useState<RightType[]>([]);
  // let [responsibilities, setResponsibilities] = useState<ResponsibilityType[]>(
  //   []
  // );

  useEffect(() => {
    async function fetchData() {
      let listOfAgents = await getAllAgents();
      setAgents(listOfAgents);

      let listOfActants = await getAllActants();
      setActants(listOfActants);

      // let listOfRights = await getAllRights();
      // setRights(listOfRights);

      // let listOfResponsibilities = await getAllResponsibilities();
      // setResponsibilities(listOfResponsibilities);
    }
    fetchData();
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Retrieve name
    const name = e.currentTarget.relationshipName.value;
    console.log("relationship name: ", name);

    // Retrieve responsibility holder
    const resHolderId = e.currentTarget.responsibilityHolder.value;
    console.log("responsibility holder: ", resHolderId);

    // Retrieve responsibility holder (multiple selection)
    const resHolderOptions =
      e.currentTarget.responsibilityHolder.selectedOptions;

    console.log(">>>resHolderOptions: ", resHolderOptions);
    alert(resHolderOptions);
    const resHolderIds = Array.from(resHolderOptions).map(
      (option: any) => option.value
    );
    console.log("responsibility holders: ", resHolderIds);

    // Retrieve right holder
    const rigHolderId = e.currentTarget.rightHolder.value;
    console.log("right holder: ", resHolderId);

    // Retrieve responsibility holder (multiple selection)
    const rigHolderOptions = e.currentTarget.rightHolder.selectedOptions;

    console.log(">>>rigHolderOptions: ", rigHolderOptions);

    const rigHolderIds = Array.from(rigHolderOptions).map(
      (option: any) => option.value
    );
    console.log("right holders: ", rigHolderIds);
    // Retrieve  right
    const rights = e.currentTarget.rights.value;
    console.log("rights: ", rights);

    // Retrieve  responsibility
    const responsibilities = e.currentTarget.responsibilities.value;
    console.log("responsibilities: ", responsibilities);

    // Prepare clause
    const clause: ClauseTypeCreation = {
      _type: "clause",
      name: name,
      // responsibilityHolder: [
      //   {
      //     _type: "reference",
      //     _ref: resHolderId,
      //     _key: genRanHex(12),
      //   },
      // ],
      responsibilityHolder: resHolderIds.map((resId) => ({
        _type: "reference",
        _ref: resId,
        _key: genRanHex(12),
      })),

      // rightHolder: [
      //   {
      //     _type: "reference",
      //     _ref: rigHolderId,
      //     _key: genRanHex(12),
      //   },
      // ],
      rightHolder: rigHolderIds.map((rigId) => ({
        _type: "reference",
        _ref: rigId,
        _key: genRanHex(12),
      })),

      rights: rights,
      responsibilities: responsibilities,
      // rights: [
      //   {
      //     _type: "reference",
      //     _ref: rightId,
      //     _key: genRanHex(12),
      //   },
      // ],
      // responsibilities: [
      //   {
      //     _type: "reference",
      //     _ref: responsibilityId,
      //     _key: genRanHex(12),
      //   },
      // ],
    };

    console.log({ clause });

    // Create clause
    try {
      await createClause(clause);
    } catch (e) {
      console.log("error: ", e);
    }

    // Redirect to root
    router.push("/");
  };
  return (
    <>
      <div className="login">
        <form onSubmit={handleSubmit}>
          <div className="relName">Relationship Name</div>
          <input
            className="input"
            placeholder="Relationship name"
            id="relationshipName"
            type="text"
            required
          ></input>

          <div className="dropdownGroup">
            <div className="dropdownHeader">
              <label>These agents:</label>
            </div>

            <select id="rightHolder" name="Right holder" multiple={true}>
              {actants.map((actant: ActantType) => (
                <option key={actant.id} value={actant.id}>
                  {actant.name}
                </option>
              ))}
              {agents.map((agent: AgentType) => (
                <option key={agent.id} value={agent.id}>
                  {agent.name}
                </option>
              ))}
            </select>
          </div>

          <div className="relName">...need this condition to thrive:</div>
          <input
            className="input"
            placeholder="Rights"
            id="rights"
            type="text"
            required
          ></input>

<div className="dropdownGroup">
            <div className="dropdownHeader">
              <label>These agents:</label>
            </div>

            <select
              id="responsibilityHolder"
              name="Responsibility holder"
              multiple={true}
            >
              {agents.map((agent: AgentType) => (
                <option key={agent.id} value={agent.id}>
                  {agent.name}
                </option>
              ))}
            </select>
          </div>

          <div className="relName">...promise to care in these ways:</div>
          <input
            className="input"
            placeholder="Responsibilities"
            id="responsibilities"
            type="text"
            required
          ></input>

          {/* <div className="dropdownGroup">
            <div className="dropdownHeader">
              <label>Right</label>
            </div>

            <select id="right" name="Right">
              {rights.map((right: RightType) => (
                <option key={right.id} value={right.id}>
                  {right.name}
                </option>
              ))}
            </select>
          </div>

          <div className="dropdownGroup">
            <div className="dropdownHeader">
              <label>Responsibility</label>
            </div>

            <select id="responsibility" name="Responsibility">
              {responsibilities.map((responsibility: RightType) => (
                <option key={responsibility.id} value={responsibility.id}>
                  {responsibility.name}
                </option>
              ))}
            </select>
          </div> */}

          <button className="button primary">Create Relationship</button>
        </form>
      </div>
    </>
  );
}
