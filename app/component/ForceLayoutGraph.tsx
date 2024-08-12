"use client";

import React, { useCallback, useMemo, useEffect, useState } from "react";
import { VisSingleContainer, VisGraph } from "@unovis/react";
import { GraphForceLayoutSettings, GraphLayoutType, Graph, GraphLink} from "@unovis/ts";
import { useRouter } from 'next/navigation'

import { getAllActants, getAllAgents, getAllClauses } from "@/sanity/sanity-utils";
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
  let [events, setEvents] = useState<[]>([]);

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
    let eventsCopy:[] = [];
    
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

        

      //   if(actant.agents && agents.length > 0){
      //     actant.agents.map((link) => {
      //       result = agents.find(({ id }) => id === link._ref)!;
      //       linksCopy.push(
      //       {
      //         source: actant.name,
      //         target: result.name,
      //         chapter: ""
      //       }
      //       )
      //     })
      //   }
      });

      clauses.map((clause) => {
        nodesCopy.push(
          {
            // @ts-ignore 
            id: clause.name,
            color: "#000000",
          });
        });

      clauses.map((clause) => {
        // @ts-ignore 
        clause.responsibilityHolder.map((respHold) => {
            resultAgent = agents.find(({ id }) => id === respHold._ref)!;
            // resultActant = actants.find(({ id }) => id === rightHold._ref)!;

            if(resultAgent){
              linksCopy.push(
                {
                  source: resultAgent.name,
                  // @ts-ignore 
                  target: clause.name,
                  chapter: ""
                }
              );
            }
            
          
        });
      });

      clauses.map((clause) => {
        // @ts-ignore 
        clause.rightHolder.map((rightHold) => {
           // resultAgent = agents.find(({ id }) => id === respHold._ref)!;
             resultActant = actants.find(({ id }) => id === rightHold._ref)!;

            if(resultActant){
              linksCopy.push(
                {
                  source: resultActant.name,
                  // @ts-ignore 
                  target: clause.name,
                  chapter: ""
                }
              );
            }
            
          
        });
      });



      // clauses.map((clause) => {
      //   eventsCopy.push(
      //     {
      //       cla
      //     }
      //   )
      // })
      // @ts-ignore 
       eventsCopy = {
        [Graph.selectors.link]: {
            click: (d: GraphLink) => {
              router.push('/relationship/display/6c3cde57-824f-4d68-8001-3bb0631f673b')
             }
        },
      }

      

    setNodes(nodesCopy);
    setLinks(linksCopy);
    setEvents(eventsCopy)
  },[actants, agents, clauses]);
  
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
        // @ts-ignore 
        events={events}
      />
    </VisSingleContainer>
  );
}
