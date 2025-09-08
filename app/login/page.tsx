"use client";
import { useSession, signIn } from "next-auth/react";
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export default function LoginPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  // Get the callback URL from the URL parameters
  const callbackUrl = searchParams.get('callbackUrl') || '/';

  useEffect(() => {
    if (session) {
      // If already signed in, redirect to the callback URL or homepage
      router.push(callbackUrl);
    }
  }, [session, router, callbackUrl]);

  const handleProviderSignIn = async (provider: string) => {
    setIsLoading(true);
    try {
      await signIn(provider, { callbackUrl });
    } catch (error) {
      console.error("Provider sign in error:", error);
      setError("An error occurred during sign in. Please try again.");
      setIsLoading(false);
    }
  };

  if (status === "loading") {
    return (
      <div style={{ padding: "2rem", textAlign: "center" }}>
        <h1>Loading...</h1>
      </div>
    );
  }

  if (session) {
    return (
      <div style={{ padding: "2rem", textAlign: "center" }}>
        <h1>Already signed in</h1>
        <p>Redirecting...</p>
      </div>
    );
  }

  return (
    <div style={{ padding: "2rem", textAlign: "center" }}>
      <h1>Sign In</h1>
      <p>Please sign in to continue</p>
      
      {callbackUrl !== '/' && (
        <p style={{ fontSize: "0.9em", color: "#666", marginBottom: "1rem" }}>
          You will ll be redirected to: <code>{callbackUrl}</code>
        </p>
      )}
      
      {error && (
        <div style={{ color: "red", marginBottom: "1rem" }}>
          {error}
        </div>
      )}
      
      <div style={{ marginTop: "2rem" }}>
        <h3>Sign in with:</h3>
        <button
          onClick={() => handleProviderSignIn("github")}
          disabled={isLoading}
          style={{ 
            padding: "0.5rem 1rem", 
            backgroundColor: "#333", 
            color: "white", 
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
            margin: "0.5rem"
          }}
        >
          GitHub
        </button>
        <button
          onClick={() => handleProviderSignIn("google")}
          disabled={isLoading}
          style={{ 
            padding: "0.5rem 1rem", 
            backgroundColor: "#db4437", 
            color: "white", 
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
            margin: "0.5rem"
          }}
        >
          Google
        </button>
      </div>
    </div>
  );
}
