"use client";

import React, { useCallback, useMemo, useEffect, useState } from "react";
import { VisSingleContainer, VisGraph } from "@unovis/react";
import { GraphForceLayoutSettings, GraphLayoutType } from "@unovis/ts";

import { getAllActants, getAllAgents } from "@/sanity/sanity-utils";
import { Actant as ActantType } from "@/types/Actant";
import { Agent as AgentType } from "@/types/Agent";
import { NodeDatum, LinkDatum } from "../data";

export default function ForceLayoutGraph(): JSX.Element {
  let [actants, setActants] = useState<ActantType[]>([]);
  let [agents, setAgents] = useState<AgentType[]>([]);
  let [nodes, setNodes] = useState<NodeDatum[]>([]);
  let [links, setLinks] = useState<LinkDatum[]>([]);

  useEffect(() => {
    async function fetchData() {
      let listOfActants = await getAllActants();
      setActants(listOfActants);

      let listOfAgents = await getAllAgents();
      setAgents(listOfAgents);
    }
    fetchData();
  }, []);

  useEffect(() => {
    let nodesCopy: NodeDatum[] = [];
    let linksCopy: LinkDatum[] = [];
    let result: AgentType = {
      id:'',
      name: '',
      email: '',
      motto: '',
      image: ''
    };

    agents.map((agent) => {
      nodesCopy.push(
        {
          id: agent.name,
          color: "#DA8383",
        });
      });

    actants.map((actant) => {
      nodesCopy.push(
        {
          id: actant.name,
          color: "#277da1",
        });

        if(actant.agents && agents.length > 0){
          actant.agents.map((link) => {
            result = agents.find(({ id }) => id === link._ref)!;
            linksCopy.push(
            {
              source: actant.name,
              target: result.name,
              chapter: ""
            }
            )
          })
        }

      });

    setNodes(nodesCopy);
    setLinks(linksCopy);
  },[actants, agents]);
  const forceLayoutSettings: GraphForceLayoutSettings = {
    forceXStrength: 0.1,
    forceYStrength: 0.4,
    charge: -700,
  };
  return (
    <VisSingleContainer data={{ nodes, links }} height={"60vh"}>
      <VisGraph<NodeDatum, LinkDatum>
        layoutType={GraphLayoutType.Force}
        forceLayoutSettings={useMemo(
          () => forceLayoutSettings,
          [forceLayoutSettings]
        )}
        linkLabel={useCallback((l: LinkDatum) => ({ text: l.chapter }), [])}
        nodeFill={useCallback((n: NodeDatum) => n.color, [])}
        nodeLabel={useCallback((n: { id: any }) => n.id, [])}
        nodeSize={40}
      />
    </VisSingleContainer>
  );
}
