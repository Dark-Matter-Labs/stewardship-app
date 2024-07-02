"use client";
import styles from "./report.module.css";
import Navigation from "@/app/component/Navigation";
import React, { useEffect } from "react";
import { useParams } from "next/navigation";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { getReportbyId, updateReport } from "@/sanity/sanity-utils";
import Image from "next/image";
import { Endorser } from "@/types/Endorser";

const DisplayReport = () => {
  const router = useRouter();
  const params = useParams();
  const { id } = params;
  const [reportName, setReportName] = useState("");
  const [reportContent, setReportContent] = useState("");
  const [reportImage, setReportImage] = useState("/bg-placeholder.jpg");
  const [reporterImage, setReporterImage] = useState("/bg-placeholder.jpg");
  const [reporterName, setReporterName] = useState("");
  const [endorsers, setEndorsers] = useState<Endorser[]>();

  useEffect(() => {
    async function fetchData() {
      const report = await getReportbyId(String(id));
      setReportName(report.name);
      setReportContent(report.content);
      setReportImage(report.image);
      setReporterImage(report.reporter.image);
      setReporterName(report.reporter.name);
      setEndorsers(report.endorsers);
      console.log("report: ", report);
    }
    fetchData();
  }, [id]);

  return (
    <>
      <Navigation
        left="Back"
        title="Report"
        right="Log Out"
        myStyle={{}}
      ></Navigation>
      <main className="updateReport login">
        <h1>Display Report</h1>

        <div className={styles.block}>
          <strong>Report Name</strong>
          <div>{reportName}</div>
        </div>

        <Image src={reportImage} width={450} height={145} alt="report image" />
        <div className={styles.block}>
          <strong>Report Content</strong>
          <div>{reportContent}</div>
        </div>

        <div className={styles.reporter}>
          <strong>Reporter</strong>
          <Image
            src={reporterImage}
            width={65}
            height={65}
            alt="reporter image"
          />
          <div>{reporterName}</div>
        </div>

        <div className={styles.endorser}>
          <strong>Endorsers</strong>
          {endorsers?.map((endorser) => {
            return (
              <>
                <Image
                  key={endorser.name}
                  src={endorser.image}
                  width={65}
                  height={65}
                  alt="endorser image"
                />
              </>
            );
          })}
        </div>
        <button className="button primary">
          <span>Endorse</span>
        </button>
      </main>
    </>
  );
};

export default DisplayReport;
