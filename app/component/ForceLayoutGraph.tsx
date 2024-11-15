"use client";

import React, { useCallback, useEffect, useState, useMemo } from "react";
import { VisSingleContainer, VisGraph } from "@unovis/react";
import {
  GraphForceLayoutSettings,
  GraphLayoutType,
  Graph
} from "@unovis/ts";
import { useRouter } from "next/navigation";

import {
  getAllActants,
  getAllAgents,
  getAllClauses,
  getClauseID,
  getActantID,
} from "@/sanity/sanity-utils";
import { Actant as ActantType } from "@/types/Actant";
import { Agent as AgentType } from "@/types/Agent";
import { NodeDatum, LinkDatum } from "../data";

export default function ForceLayoutGraph(): JSX.Element {
  const router = useRouter();
  let [actants, setActants] = useState<ActantType[]>([]);
  let [agents, setAgents] = useState<AgentType[]>([]);
  let [nodes, setNodes] = useState<NodeDatum[]>([]);
  let [links, setLinks] = useState<LinkDatum[]>([]);
  let [clauses, setClauses] = useState<[]>([]);

  useEffect(() => {
    async function fetchData() {
      let listOfActants = await getAllActants();
      setActants(listOfActants);

      let listOfAgents = await getAllAgents();
      setAgents(listOfAgents);

      let listOfClauses = await getAllClauses();
      // @ts-ignore
      setClauses(listOfClauses);
    }
    fetchData();
  }, []);

  useEffect(() => {
    let nodesCopy: NodeDatum[] = [];
    let linksCopy: LinkDatum[] = [];

    let result: AgentType = {
      id: "",
      name: "",
      email: "",
      motto: "",
      image: "",
      imgLink: ""
    };

    clauses.map((clause) => {
      nodesCopy.push({
        // @ts-ignore
        id: clause.name,
        color: "#000000",
        group: 3,
      });
    });

    actants.map((actant) => {
      nodesCopy.push({
        id: actant.name,
        color: "#277da1",
        group: 2,
      });
    });

    agents.toReversed().map((agent) => {
      nodesCopy.push({
        id: agent.name,
        color: "#DA8383",
        group: 1,
      });
    });

    actants.map((actant) => {
      if (actant.agents && agents.length > 0) {
        actant.agents.map((link) => {
          result = agents.find(({ id }) => id === link._ref)!;
          linksCopy.push({
            source: result.name,
            target: actant.name,
            chapter: "",
            color: "#a2bbb7",
            style: "dashed",
          });
        });
      }
    });

    clauses.map((clause) => {
      // @ts-ignore
      clause.responsibilityHolder.map((holder) => {
        linksCopy.push({
          // @ts-ignore
          source: clause.name,
          // @ts-ignore
          target: holder.name,
          chapter: "",
          color: "#e4adad",
          style: "solid",
        });
      });
      // @ts-ignore
      clause.rightHolder.map((holder) => {
        linksCopy.push({
          // @ts-ignore
          source: clause.name,
          // @ts-ignore
          target: holder.name,
          chapter: "",
          color: "#e4adad",
          style: "solid",
        });
      });
    });

    // @ts-ignore

    setNodes(nodesCopy);
    setLinks(linksCopy);
  }, [actants, agents, clauses]);

  const forceLayoutSettings: GraphForceLayoutSettings = {
    forceXStrength: 0.1,
    forceYStrength: 0.4,
    charge: -1200,
    linkDistance: 100,
    linkStrength: 0.45
  };

  const layoutNodeGroup = (d: NodeDatum) => d.group;

  const events = {
    [Graph.selectors.node]: {
      click: async (d: NodeDatum) => {
        if (d.group == 3) {
          const id = await getClauseID(d.id);
          router.push("/relationship/display/" + id[0].id);
        } else if (d.group == 2) {
          const id = await getActantID(d.id);
          router.push("/actant/display/" + id[0].id);
        }
      },
    },
  };

  return (
    <>
    <VisSingleContainer data={{ nodes, links }} height={"70vh"}>
      <VisGraph<NodeDatum, LinkDatum>
        forceLayoutSettings={useMemo(() => forceLayoutSettings, [])}
        // @ts-ignore
        layoutNodeGroup={layoutNodeGroup}
        layoutType="concentric"
        linkLabel={useCallback((l: LinkDatum) => ({ text: l.chapter }), [])}
        nodeFill={useCallback((n: NodeDatum) => n.color, [])}
        nodeLabel={useCallback((n: { id: any }) => n.id, [])}
        nodeLabelTrim={false}
        nodeSize={40}
        // @ts-ignore
        events={events}
        linkStroke={useCallback((l: LinkDatum) => l.color, [])}
        // @ts-ignore
        linkStyle={useCallback((l: LinkDatum) => l.style, [])}
        linkArrow={true}
      />
    </VisSingleContainer>
    <div className="legend">
      <div className="legend_item"><span className="dot-clause"></span><span>- Realtionship</span></div>
      <div className="legend_item"><span className="dot-actant"></span><span>- Actant</span></div>
      <div className="legend_item"><span className="dot-agent"></span><span>- Agent</span></div>
</div>
    </>
  );
}
