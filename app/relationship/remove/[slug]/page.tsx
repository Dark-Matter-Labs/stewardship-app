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
  const { slug } = params;

  //prepare document id
  getRelationshipIdbySlug(String(slug)).then(function (id) {
    console.log("relationship id: ", id);
    const did = id; // get document id

    // call update api, providing document id and new name
    removeRelationship(did)
      .then(() => {
        alert("removing " + slug + did);
        router.push("/");
      })
      .catch(({ statusCode, statusMessage }) => {
        alert("status code: " + statusCode + " message: " + statusMessage);
        router.push("/");
      });
  });
  return <div>remove: {slug}</div>;
};
export default Page;
