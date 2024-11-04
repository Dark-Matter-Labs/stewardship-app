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
  const [selectedRightHolders, setSelectedRightHolders] = useState<
    ActantType[]
  >([]);
  const [selectedRespHolders, setSelectedRespHolders] = useState<AgentType[]>(
    [],
  );
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

  const handleSelect = (option: ActantType) => {
    setSelectedRightHolders(
      (prev) =>
        prev.includes(option)
          ? prev.filter((item) => item !== option) // Remove if selected again
          : [...prev, option], // Add if not already selected
    );
  };

  const handleRespSelect = (option: AgentType) => {
    setSelectedRespHolders(
      (prev) =>
        prev.includes(option)
          ? prev.filter((item) => item !== option) // Remove if selected again
          : [...prev, option], // Add if not already selected
    );
  };

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
    selectedRespHolders;

    console.log(">>>resHolderOptions: ", resHolderOptions);

    const resHolderIds = Array.from(resHolderOptions).map(
      (option: any) => option.id,
    );
    console.log("responsibility holders: ", resHolderIds);

    // Retrieve responsibility holder (multiple selection)
    const rigHolderOptions = selectedRightHolders;

    console.log(">>>rigHolderOptions: ", rigHolderOptions);

    const rigHolderIds = Array.from(rigHolderOptions).map(
      (option: any) => option.id,
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

            <div className="dropdown-menu" id="rightHolder">
              {actants.map((actant: ActantType) => (
                <div key={actant.id}>
                  <label className="dropdown-item">
                    <input
                      type="checkbox"
                      id="rightHolder"
                      value={actant.name}
                      checked={selectedRightHolders.includes(actant)}
                      onChange={() => handleSelect(actant)}
                    />
                    {actant.name}
                  </label>
                </div>
              ))}
              {agents.map((agent: AgentType) => (
                <div key={agent.id}>
                  <label className="dropdown-item">
                    <input
                      type="checkbox"
                      id="rightHolder"
                      value={agent.name}
                      // @ts-ignore
                      checked={selectedRightHolders.includes(agent)}
                      // @ts-ignore
                      onChange={() => handleSelect(agent)}
                    />
                    {agent.name}
                  </label>
                </div>
              ))}
            </div>
          </div>

          <div className="relName">need these condition to thrive:</div>
          <input
            className="input"
            placeholder="Rights"
            id="rights"
            type="text"
            required
          ></input>

          <div className="dropdownGroup">
            <div className="dropdownHeader">
              <label>And these agents:</label>
            </div>

            <div className="dropdown-menu" id="responsibilityHolder">
              {agents.map((agent: AgentType) => (
                <div key={agent.id}>
                  <label className="dropdown-item">
                    <input
                      type="checkbox"
                      id="responsibilityHolder"
                      value={agent.name}
                      checked={selectedRespHolders.includes(agent)}
                      onChange={() => handleRespSelect(agent)}
                    />
                    {agent.name}
                  </label>
                </div>
              ))}
            </div>
          </div>

          <div className="relName">promise to care in these ways:</div>
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
