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
  unendorseReport,
} from "@/sanity/sanity-utils";
import Image from "next/image";
import { Endorser } from "@/types/Endorser";

const DisplayReport = ({ sessionId }: { sessionId: string }) => {
  const router = useRouter();
  const params = useParams();
  const { id } = params;
  const [reportName, setReportName] = useState("");
  const [reportContent, setReportContent] = useState("");
  const [reportType, setReportType] = useState("");
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
      setReportType(report.type);
      setReporterImage(report.reporter.image);
      setReporterName(report.reporter.name);

      if (report.reporter.id === sessionId) setIsReportermatching(true);
      setEndorsers(report.endorsers);
      console.log("report: ", report);
      console.log("isReporterMatching", isReporterMatching);
    }
    fetchData();
  }, [id, sessionId, isReporterMatching]);

  useEffect(() => {
    const endorserExists = endorsers?.some(
      (endorser) => endorser.id === sessionId,
    );
    setIsEndorserMatching(endorserExists ? true : false);
  }, [endorsers, sessionId]);

  const handleEndorseSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      await endorseReport(String(id), sessionId);
    } catch (e) {
      alert(e);
    }

    // Refresh
    window.location.reload();
  };

  const handleUnendorseSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      // alert(`${id}, ${sessionId}`);
      await unendorseReport(String(id), sessionId);
    } catch (e) {
      alert(e);
    }

    // Refresh
    window.location.reload();
  };

  return (
    <main className="updateReport login">
      <h1>Feedback: {reportName}</h1>
      <div className={styles.block}></div>
      <Image src={reportImage} width={450} height={145} alt="report image" />
      <div className={styles.block}>
        <strong>Feedback Type</strong>
        <div>{reportType}</div>
      </div>
      <div className={styles.block}>
        <strong>Feedback Content</strong>
        <div>{reportContent}</div>
      </div>
      <div className={styles.reporter}>
        <strong>Feedback Provider</strong>
        <Image
          src={reporterImage}
          width={65}
          height={65}
          alt="reporter image"
        />
        <div>{reporterName}</div>
      </div>
      <div className={styles.endorser}>
        <strong>This has been vouched for by:</strong>
        {endorsers?.map((endorser) => {
          return (
            <Image
              key={endorser.id}
              src={endorser.image}
              width={65}
              height={65}
              alt="endorser image"
            />
          );
        })}
      </div>
      {!isReporterMatching && !isEndorserMatching && (
        <form onSubmit={handleEndorseSubmit}>
          <button className="button primary">
            <span>Vouch</span>
          </button>
        </form>
      )}
      {isEndorserMatching && (
        <form onSubmit={handleUnendorseSubmit}>
          <button className="button warning">
            <span>Unvouch</span>
          </button>
        </form>
      )}
    </main>
  );
};

export default DisplayReport;
