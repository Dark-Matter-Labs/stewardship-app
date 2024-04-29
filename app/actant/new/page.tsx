import { createActant } from "@/sanity/sanity-utils";
import { ActantTypeCreation } from "@/types/ActantTypeCreation";

import React from "react";

const page = () => {
  const actant: ActantTypeCreation = {
    _type: "actant",
    name: "Heloo",
    slug: {
      _type: "slug",
      current: "hello",
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
