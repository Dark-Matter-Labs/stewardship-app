"use client";

import React, { useCallback, useMemo, useEffect, useState } from "react";
import { VisSingleContainer, VisGraph } from "@unovis/react";
import { GraphForceLayoutSettings, GraphLayoutType, Graph, GraphLink} from "@unovis/ts";
import { useRouter } from 'next/navigation'

import { getAllActants, getAllAgents, getAllClauses, getClauseID} from "@/sanity/sanity-utils";
import { Actant as ActantType } from "@/types/Actant";
import { Agent as AgentType } from "@/types/Agent";
import { NodeDatum, LinkDatum } from "../data";

export default function ForceLayoutGraph(): JSX.Element {
  const router = useRouter()
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
      id:'',
      name: '',
      email: '',
      motto: '',
      image: ''
    };

    let resultAgent: AgentType = {
      id:'',
      name: '',
      email: '',
      motto: '',
      image: ''
    };

    let resultActant: ActantType = {
      id: '',
      name: '',
      slug: '',
      image: '',
      agents: []
    };

    clauses.map((clause) => {
      nodesCopy.push(
        {
          // @ts-ignore 
          id: clause.name,
          color: "#000000",
          group: 3
        });
      });

      actants.map((actant) => {
        nodesCopy.push(
          {
            id: actant.name,
            color: "#277da1",
               group: 2
          });
        });

    agents.map((agent) => {
      nodesCopy.push(
        {
          id: agent.name,
          color: "#DA8383",
          group: 1
        });
      });

    actants.map((actant) => {

        if(actant.agents && agents.length > 0){
          actant.agents.map((link) => {
            result = agents.find(({ id }) => id === link._ref)!;
            linksCopy.push(
            {
              source: result.name,
              target: actant.name,
              chapter: "",
              color: '#a2bbb7',
              style: 'dashed'
            }
            )
          })
        }
      });


      clauses.map((clause) => {
        // @ts-ignore 
        clause.rightHolder.map((rightHold) => {
           // resultAgent = agents.find(({ id }) => id === respHold._ref)!;
            resultActant = actants.find(({ id }) => id === rightHold._ref)!;

            if(resultActant){
              linksCopy.push(
                {
                   // @ts-ignore 
                  source: clause.name,
                  // @ts-ignore 
                  target: resultActant.name,
                  chapter: "",
                  color: '#e4adad',
                  style: 'solid'
                }
              );
            }
            
          
        });
      });

      // @ts-ignore 


    setNodes(nodesCopy);
    setLinks(linksCopy);
  },[actants, agents, clauses]);
  
  // const forceLayoutSettings: GraphForceLayoutSettings = {
  //   forceXStrength: 0.1,
  //   forceYStrength: 0.4,
  //   charge: -700,
  // };

  const layoutNodeGroup = (d: NodeDatum) => d.group;

  const events = {
    [Graph.selectors.node]: {
        click: async (d: NodeDatum) => {

            if (d.group == 3) {
              const id = await getClauseID(d.id);
              router.push('/relationship/display/'+id[0].id)
            }
         }
    },
  }

  return (
    <VisSingleContainer data={{ nodes, links }} height={"60vh"}>
      <VisGraph<NodeDatum, LinkDatum>
        layoutType="concentric"
         // @ts-ignore 
        layoutNodeGroup={layoutNodeGroup}
        linkLabel={useCallback((l: LinkDatum) => ({ text: l.chapter }), [])}
        nodeFill={useCallback((n: NodeDatum) => n.color, [])}
        nodeLabel={useCallback((n: { id: any }) => n.id, [])}
        nodeSize={40}
        // @ts-ignore 
        events={events}
        linkStroke={useCallback((l: LinkDatum) => l.color, [])}
         // @ts-ignore 
        linkStyle={useCallback((l: LinkDatum) => l.style, [])}
        linkArrow={true}
      />
    </VisSingleContainer>
  );
}
