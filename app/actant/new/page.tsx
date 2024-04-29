import { createActant } from "@/sanity/sanity-utils";
import { Actant } from "@/types/Actant";
import React from "react";

const page = () => {
  const actant: Actant = {
    _type: "actant",
    name: "Buggyy",
    slug: {
      _type: "slug",
      current: "buggyy",
    },
    image: {
      _type: "image",
    },
  };

  createActant(actant)
    .then(console.log)
    .catch((err) => console.log("error: ", err));

  return <div>create actant: </div>;
};

export default page;
