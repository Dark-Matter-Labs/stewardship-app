"use client";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function AuthErrorPage() {
  const router = useRouter();

  return (
    <div style={{ padding: "2rem", textAlign: "center" }}>
      <h1>Authentication Error</h1>
      <p>There was an error during the authentication process.</p>
      
      <div style={{ marginTop: "2rem" }}>
        <p>This usually happens when:</p>
        <ul style={{ textAlign: "left", maxWidth: "500px", margin: "0 auto" }}>
          <li>OAuth providers (Google/GitHub) are not properly configured</li>
          <li>You denied access to the application</li>
          <li>Environment variables are missing</li>
        </ul>
      </div>

      <div style={{ marginTop: "2rem" }}>
        <Link 
          href="/login"
          style={{ 
            padding: "0.5rem 1rem", 
            backgroundColor: "#0070f3", 
            color: "white", 
            textDecoration: "none",
            borderRadius: "4px",
            margin: "0.5rem"
          }}
        >
          Try Again
        </Link>
        <Link 
          href="/"
          style={{ 
            padding: "0.5rem 1rem", 
            backgroundColor: "#6c757d", 
            color: "white", 
            textDecoration: "none",
            borderRadius: "4px",
            margin: "0.5rem"
          }}
        >
          Go Home
        </Link>
      </div>
    </div>
  );
}
