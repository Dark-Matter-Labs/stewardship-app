"use client";

import React from "react";
import { config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";
config.autoAddCss = false;
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThumbsUp } from "@fortawesome/free-solid-svg-icons";
import Image from "next/image";

import { Agent } from "@/types/Agent";
import { Actant } from "@/types/Actant";

const Clause = ({
  caption = true,
  sign = false,
  children,
  respHolders,
  rightHolders,
}: {
  caption: boolean;
  sign: boolean;
  children: React.ReactNode;
  respHolders: Array<Agent>;
  rightHolders: Array<Actant>;
}) => {
  return (
    <div className="clause">
      <div className="clause_background">
        {sign && (
          <div className="relationship_link">
            <div className="actants">
            {rightHolders.map((holder) => {
              if (holder.image) {
                return (
                  <Image
                    width={45}
                    key={holder.name}
                    height={45}
                    className="clause_actant_img"
                    alt=""
                    src={holder.image}
                  />
                );
              } else {
                return (
                  <Image
                    width={45}
                    key={holder.name}
                    height={45}
                    className="clause_actant_img"
                    alt=""
                    src={holder.imgLink}
                  />
                );
              }
            })}
            </div>

            <div className="agents">
            {respHolders.map((holder) => {
              if (holder.image) {
                return (
                  <Image
                    width={45}
                    key={holder.name}
                    height={45}
                    className="clause_agent_img"
                    alt=""
                    src={holder.image}
                  />
                );
              } else {
                return (
                  <Image
                    width={45}
                    key={holder.name}
                    height={45}
                    className="clause_agent_img"
                    alt=""
                    src={holder.imgLink}
                  />
                );
              }
            })}
            </div>
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
