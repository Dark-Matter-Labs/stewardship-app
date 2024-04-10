import React from "react";
// const imageSrc = "/rainbow-trout.jpg";
import Image from "next/image";
const Actant = ({
  showName = true,
  name,
  imageSrc,
}: {
  showName: boolean;
  name: string;
  imageSrc: string;
}) => {
  return (
    <div className="actant">
      <Image
        width={45}
        height={45}
        className="actant_img"
        alt="rainbow trout"
        src={imageSrc}
      />
      {showName && <div>{name}</div>}
    </div>
  );
};

export default Actant;
