import React from "react";
import { config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";
config.autoAddCss = false;
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThumbsUp } from "@fortawesome/free-solid-svg-icons";
import Image from "next/image";

const Clause = ({
  caption = true,
  sign = false,
  resImgUrl,
  rigImgUrl,
  children,
}: {
  caption: boolean;
  sign: boolean;
  resImgUrl: string;
  rigImgUrl: string;
  children: React.ReactNode;
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
              src={rigImgUrl}
            />

            <Image
              width={45}
              height={45}
              className="clause_agent_img"
              alt="fang"
              src={resImgUrl}
            />
          </div>
        )}
      </div>
      {caption && (
        <div className="clause_caption">
          <div>{children}</div>
        </div>
      )}
    </div>
  );
};

export default Clause;
