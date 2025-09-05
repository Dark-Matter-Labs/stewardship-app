"use client";
import { useEffect } from "react";
import { signOut } from "next-auth/react";

export default function SignOutPage() {
  useEffect(() => {
    // Immediately sign out when this page loads
    signOut({ 
      redirect: true,
      callbackUrl: "/"
    });
  }, []);

  return (
    <div style={{ padding: "2rem", textAlign: "center" }}>
      <h1>Signing out...</h1>
      <p>Please wait while we sign you out.</p>
    </div>
  );
}
