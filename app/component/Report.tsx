import React from "react";
import { config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";
config.autoAddCss = false;
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThumbsUp } from "@fortawesome/free-solid-svg-icons";
import Image from "next/image";
const imageSrc = "/fang_profile.png";
const imageSrc2 = "/river-thames-evidence.jpg";
const Report = ({
  caption = true,
  sign = false,
}: {
  caption: boolean;
  sign: boolean;
}) => {
  return (
    <div className="report">
      <div
        className="evidence"
        style={{
          backgroundImage: `url('${imageSrc2}')`,
          backgroundSize: "cover",
        }}
      >
        {sign && (
          <Image
            width={45}
            height={45}
            className="agent_img"
            alt="fang"
            src={imageSrc}
          />
        )}
      </div>
      {caption && (
        <div className="report_caption">
          <div>Report Name</div>
          <div>
            <FontAwesomeIcon icon={faThumbsUp} /> 11
          </div>
        </div>
      )}
    </div>
  );
};

export default Report;
