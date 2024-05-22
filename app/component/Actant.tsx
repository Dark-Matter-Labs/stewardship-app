import styles from "./Actant.module.css";
import React from "react";
// const imageSrc = "/rainbow-trout.jpg";
import Image from "next/image";
const Actant = ({
  showName = true,
  name,
  imageSrc,
  agentImageSrc,
}: {
  showName: boolean;
  name: string;
  imageSrc: string;
  agentImageSrc: string;
}) => {
  return (
    <div className={styles.actant}>
      <span className="actant_wall_item">
        <Image
          width={45}
          height={45}
          priority
          className={styles.actant_img}
          alt={`actant image of ${name}`}
          src={imageSrc ? imageSrc : ""}
        />{" "}
        {agentImageSrc && (
          <Image
            width={45}
            height={45}
            className={styles.agent_img}
            alt={`agent image of ${name}`}
            src={agentImageSrc}
          />
        )}
        <div className="actant_caption">{showName && <div>{name}</div>}</div>
      </span>
    </div>
  );
};

export default Actant;
