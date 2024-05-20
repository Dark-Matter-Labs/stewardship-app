import React from "react";
import { config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";
config.autoAddCss = false;
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThumbsUp } from "@fortawesome/free-solid-svg-icons";
import Image from "next/image";
import { Report as ReportType } from "@/types/Report";
let imageSrcProfile = "/fang_profile.png";
let imageSrcEvidence = "/river-thames-evidence.jpg";

const Report = ({
  caption = true,
  sign = false,
  report,
}: {
  caption: boolean;
  sign: boolean;
  report: ReportType;
}) => {
  imageSrcProfile = report?.reporter?.image || "";
  imageSrcEvidence = report?.image || "";

  return (
    <div className="report">
      <div
        className="evidence"
        style={{
          backgroundImage: `url('${imageSrcEvidence}')`,
          backgroundSize: "cover",
        }}
      >
        {sign && (
          <Image
            width={45}
            height={45}
            className="agent_img"
            alt="fang"
            src={imageSrcProfile}
          />
        )}
      </div>
      {caption && (
        <div className="report_caption">
          <div>{report?.name}</div>
          <div>
            <FontAwesomeIcon icon={faThumbsUp} /> 11
          </div>
        </div>
      )}
    </div>
  );
};

export default Report;
