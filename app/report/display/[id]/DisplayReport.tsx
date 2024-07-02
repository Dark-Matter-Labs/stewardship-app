"use client";
import styles from "./report.module.css";
import Navigation from "@/app/component/Navigation";
import React, { useEffect } from "react";
import { useParams } from "next/navigation";
import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  endorseReport,
  getReportbyId,
  isReporterMatching,
} from "@/sanity/sanity-utils";
import Image from "next/image";
import { Endorser } from "@/types/Endorser";

const DisplayReport = ({ sessionId }: { sessionId: string }) => {
  const router = useRouter();
  const params = useParams();
  const { id } = params;
  const [reportName, setReportName] = useState("");
  const [reportContent, setReportContent] = useState("");
  const [reportImage, setReportImage] = useState("/bg-placeholder.jpg");
  const [reporterImage, setReporterImage] = useState("/bg-placeholder.jpg");
  const [reporterName, setReporterName] = useState("");
  const [endorsers, setEndorsers] = useState<Endorser[]>();
  const [isReporterMatching, setIsReportermatching] = useState(false);
  const [isEndorserMatching, setIsEndorserMatching] = useState(false);

  useEffect(() => {
    async function fetchData() {
      const report = await getReportbyId(String(id));
      setReportName(report.name);
      setReportContent(report.content);
      setReportImage(report.image);
      setReporterImage(report.reporter.image);
      setReporterName(report.reporter.name);

      if (report.reporter.id === sessionId) setIsReportermatching(true);
      setEndorsers(report.endorsers);
      console.log("report: ", report);
      console.log("isReporterMatching", isReporterMatching);
    }
    fetchData();
  }, [id, sessionId, isReporterMatching]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // if (!endorsers) {
    //   // Be first endorser
    //   try {
    //     await endorseReport(String(id), sessionId);
    //   } catch (e) {
    //     alert(e);
    //   }
    // } else {
    //   // Insert your profile to the endorser's list
    // }

    try {
      await endorseReport(String(id), sessionId);
    } catch (e) {
      alert(e);
    }

    // Refresh
    window.location.reload();
  };

  return (
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
            <Image
              key={endorser.name}
              src={endorser.image}
              width={65}
              height={65}
              alt="endorser image"
            />
          );
        })}
      </div>
      {!isReporterMatching && (
        <form onSubmit={handleSubmit}>
          <button className="button primary">
            <span>Endorse</span>
          </button>
        </form>
      )}
    </main>
  );
};

export default DisplayReport;
