"use client";
import React from "react";
import { useParams, useRouter } from "next/navigation";
import {
  getRelationshipIdbySlug,
  removeRelationship,
} from "@/sanity/sanity-utils";

const Page = () => {
  const router = useRouter();
  const params = useParams();
  const { space, slug } = params;

  console.log("params: ", params);

  //prepare document id

  // call update api, providing document id and new name
  removeRelationship(slug)
    .then(() => {
      alert("removing " + slug);
      router.push("/" + space);
    })
    .catch(({ statusCode, statusMessage }) => {
      alert("status code: " + statusCode + " message: " + statusMessage);
      router.push("/" + space);
    });

  return <div>remove: {slug}</div>;
};
export default Page;
