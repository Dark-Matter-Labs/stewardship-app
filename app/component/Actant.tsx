import styles from "./Actant.module.css";
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
    <div className={styles.actant}>
      <Image
        width={45}
        height={45}
        className={styles.actant_img}
        alt={`actant image of ${name}`}
        src={imageSrc}
      />
      {showName && <div>{name}</div>}
    </div>
  );
};

export default Actant;
