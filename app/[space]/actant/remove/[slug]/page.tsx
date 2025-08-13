"use client";
import React from "react";
import { useParams, useRouter } from "next/navigation";
import { getActantIdbySlug, removeActant } from "@/sanity/sanity-utils";

const Page = () => {
  const router = useRouter();
  const params = useParams();
  const { space, slug } = params;

  //prepare document id
  getActantIdbySlug(String(slug)).then(function (id) {
    console.log(id);
    const did = id; // get document id

    // call update api, providing document id and new name
    removeActant(did)
      .then(() => {
        alert("removing " + slug);
        router.push("/" + space + "/actant");
      })
      .catch(console.log);
  });

  return <div>remove: {slug}</div>;
};
export default Page;
