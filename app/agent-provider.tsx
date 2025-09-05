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
  isLoading: boolean;
  error: string | null;
}>({
  agent: null,
  setAgent: () => null,
  isLoading: false,
  error: null,
});

export const AgentProvider = ({ children }: { children: React.ReactNode }) => {
  const { data: session, status } = useSession();
  const [agent, setAgent] = useState<Agent | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const userEmail = session?.user?.email;
    if (!userEmail || status === "loading") {
      return;
    }

    const fetchAgent = async () => {
      setIsLoading(true);
      setError(null);
      
      try {
        const sanityAgent = await getAgent(userEmail);
        setAgent(sanityAgent);
      } catch (err) {
        console.error("Error fetching agent:", err);
        setError("Failed to load agent data");
        setAgent(null);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAgent();
  }, [session, status]);

  return (
    <AgentContext.Provider value={{ agent, setAgent, isLoading, error }}>
      {children}
    </AgentContext.Provider>
  );
};

export const useAgent = () => {
  return useContext(AgentContext);
};
