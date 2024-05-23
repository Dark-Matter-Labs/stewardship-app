"use client";

import {
  Dispatch,
  SetStateAction,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { useSession } from "next-auth/react";
import { Agent } from "@/types/Agent";
import { getAgent } from "@/sanity/sanity-utils";

const AgentContext = createContext<{
  agent: Agent | null;
  setAgent: Dispatch<SetStateAction<Agent | null>>;
}>({
  agent: null,
  setAgent: () => null,
});

export const AgentProvider = ({ children }: { children: React.ReactNode }) => {
  const { data: session } = useSession();
  const [agent, setAgent] = useState<Agent | null>(null);

  useEffect(() => {
    const userEmail = session?.user?.email;
    if (!userEmail) {
      return;
    }

    const fn = async () => {
      const sanityAgent = await getAgent(userEmail);
      setAgent(sanityAgent);
    };

    fn();
  }, [session]);

  return (
    <AgentContext.Provider value={{ agent, setAgent }}>
      {children}
    </AgentContext.Provider>
  );
};

export const useAgent = () => {
  return useContext(AgentContext);
};
