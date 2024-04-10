import React from "react";
const imageSrc = "/rainbow-trout.jpg";
import Image from "next/image";
const Actant = ({ name = true }: { name: boolean }) => {
  return (
    <div className="actant">
      <Image
        width={45}
        height={45}
        className="actant_img"
        alt="rainbow trout"
        src={imageSrc}
      />
      {name && <div>Name</div>}
    </div>
  );
};

export default Actant;
