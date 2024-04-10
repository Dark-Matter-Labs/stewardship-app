import React from "react";
import { getActants } from "@/sanity/sanity-utils";
import Actant from "./Actant";

export default async function Actants({ showName }: { showName: boolean }) {
  const actants = await getActants();
  return (
    <>
      {actants.map((actant) => (
        <Actant
          key={actant.name}
          showName={showName}
          name={actant.name}
          imageSrc={actant.image}
        />
      ))}
    </>
  );
}
