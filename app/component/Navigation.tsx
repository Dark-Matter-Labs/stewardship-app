// "use client";
import React from "react";
import Link from "next/link";

export default function Navigation({
  title,
  left,
  right,
  myStyle,
}: {
  title: string;
  left: string;
  right: string;
  myStyle: Object;
}) {
  let leftLink = "/";
  let rightLink = "/";
  if (left == "Home") {
    leftLink = "/";
  } else if (left == "Profile") {
    leftLink = "/profile";
  }
  if (right == "Log Out") {
    rightLink = "/login";
  }
  return (
    <div className="navigation" style={myStyle}>
      <ul>
        <li className="">
          <Link href={leftLink}>{left}</Link>
        </li>
        <li className=" stretch">
          <div>{title}</div>
        </li>
        <li className="">
          <Link href={rightLink}>{right}</Link>
        </li>
      </ul>
    </div>
  );
}
