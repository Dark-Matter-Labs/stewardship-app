"use client";
import React from "react";
import { useParams, useRouter } from "next/navigation";
import { getReportIdbySlug, removeReport } from "@/sanity/sanity-utils";

const Page = () => {
  const router = useRouter();
  const params = useParams();
  const { slug } = params;

  //prepare document id
  getReportIdbySlug(String(slug)).then(function (id) {
    console.log(id);
    const did = id; // get document id

    // call update api, providing document id and new name
    removeReport(did)
      .then(() => {
        alert("removing " + slug + did);
        router.push("/report");
      })
      .catch(console.log);
  });

  return <div>remove: {slug}</div>;
};
export default Page;
