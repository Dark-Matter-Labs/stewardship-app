import React from "react";
import { config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";
config.autoAddCss = false;
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThumbsUp } from "@fortawesome/free-solid-svg-icons";
import Image from "next/image";
const imageSrc_agent = "/calvin_profile.png";
const imageSrc_actant = "/rainbow-trout.jpg";
const Clause = ({
  caption = true,
  sign = false,
}: {
  caption: boolean;
  sign: boolean;
}) => {
  return (
    <div className="clause">
      <div className="clause_background">
        {sign && (
          <div className="relationship_link">
            <Image
              width={45}
              height={45}
              className="clause_agent_img"
              alt="fang"
              src={imageSrc_actant}
            />
            <Image
              width={45}
              height={45}
              className="clause_agent_img"
              alt="fang"
              src={imageSrc_agent}
            />
          </div>
        )}
      </div>
      {caption && (
        <div className="clause_caption">
          <div>Clause Name</div>
        </div>
      )}
    </div>
  );
};

export default Clause;
