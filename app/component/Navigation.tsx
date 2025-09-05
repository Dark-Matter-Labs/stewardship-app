"use client";
import React from "react";
import Link from "next/link";
import { signOut, useSession } from "next-auth/react";

export default function Navigation({
  title,
  left,
  myStyle,
  session,
  space,
}: {
  title: string;
  left: string;
  right: string;
  myStyle: Object;
  session: Object;
  space: string | string[];
}) {
  const { data: clientSession, status } = useSession();
  const currentSession = clientSession || session;
  
  let leftLink = "/" + space;
  if (left == "Home") {
    leftLink = "/" + space;
  } else if (left == "Profile") {
    leftLink = "/" + space + "/profile";
  }

  const handleSignOut = () => {
    // Redirect to dedicated sign out page
    window.location.href = "/signout";
  };

  return (
    <div className="navigation" style={myStyle}>
      <ul>
        <li className="">
          {left != "Profile" ? (
            <Link href={leftLink}>{left}</Link>
          ) : currentSession ? (
            <Link href={leftLink}>{left}</Link>
          ) : (
            <></>
          )}
        </li>
        <li className=" stretch">
          <div>{title}</div>
        </li>
        <li className="">
          {currentSession && (
            <button 
              id="submitButton" 
              onClick={handleSignOut}
              className="signOutButton"
              style={{ 
                background: "none", 
                border: "none", 
                cursor: "pointer",
                color: "inherit",
                fontSize: "inherit"
              }}
            >
              Sign out
            </button>
          )}
        </li>
      </ul>
    </div>
  );
}
