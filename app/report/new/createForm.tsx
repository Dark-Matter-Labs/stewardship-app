"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Clause as ClauseType } from "@/types/Clause";
import {
  client,
  createReport,
  genRanHex,
  getClauses,
} from "@/sanity/sanity-utils";
import { ReportTypeCreation } from "@/types/ReportTypeCreation";
import router from "next/router";

export default function CreateForm({ id }: { id: string }) {
  const router = useRouter();
  let [clauses, setClauses] = useState<ClauseType[]>([]);
  let [selectedImageSrc, setSelectedImageSrc] = useState("no file chosen");

  console.log("the id CreateForm gets is: ", id);

  useEffect(() => {
    async function fetchData() {
      let listOfClauses = await getClauses();
      setClauses(listOfClauses);
    }
    fetchData();
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (e.currentTarget.reportImage.files[0] == null) {
      alert("please upload image");
      return;
    }

    // Retrieve name
    const name = e.currentTarget.reportName.value;
    console.log("report name: ", name);

    // Generate slug
    const slug = name.replace(/ /g, "-");

    // Retrieve report type
    const reportType = e.currentTarget.reportType.value;
    console.log("report type: ", reportType);

    // Retrieve clause
    const clauseId = e.currentTarget.clauseId.value;
    console.log("clause id: ", clauseId);

    // Retrieve content
    const reportContent = e.currentTarget.reportContentId.value;
    console.log("report content: ", reportContent);

    // Upload Image
    const image = await client.assets.upload(
      "image",
      e.currentTarget.reportImage.files[0],
    );

    // Prepare report
    const report: ReportTypeCreation = {
      _type: "report",
      name: name,
      slug: {
        _type: "slug",
        current: slug,
      },
      type: reportType,
      clause: {
        _type: "reference",
        _ref: clauseId,
      },
      image: {
        _type: "image",
        asset: {
          _type: "reference",
          _ref: image._id,
        },
      },
      content: reportContent,
      reporter: {
        _type: "reference",
        _ref: id,
      },
    };

    // Create report
    try {
      await createReport(report);
    } catch (e) {
      console.log("error: ", e);
    }

    alert("Feedback created successfully!")

    // Redirect to root
    router.push("/");
  };

  function readURL(e: React.FormEvent<HTMLInputElement>) {
    // display selected image's URL
    let filepath: string = e.currentTarget.value;
    let filename: string = filepath.split("\\").pop()!;

    if (filepath) {
      setSelectedImageSrc(filename);
    }
  }

  return (
    <div className="login">
      <form className="createReport" onSubmit={handleSubmit}>
        {/* add relationship link here */}
        <label>
          <b>Feedback Name</b>
        </label>
        <input
          className="input"
          placeholder="Feedback name"
          id="reportName"
          type="text"
          required
        ></input>
        <div className="dropdownGroup">
          <div className="dropdownHeader">
            <label>Feedback Type</label>
          </div>
          <select id="reportType" name="Type">
            <option value="sign">Sign</option>
            <option value="breach">Breach</option>
            <option value="fulfillment">Fulfillment</option>
            <option value="termination">Termination</option>
            <option value="review">Review</option>
          </select>
        </div>
        <div className="dropdownGroup">
          <div className="dropdownHeader">
            <label>Relationship</label>
          </div>
          <select id="clauseId" name="Clause">
            {clauses.map((clause: ClauseType) => (
              <option key={clause.id} value={clause.id}>
                {clause.name}
              </option>
            ))}
          </select>
        </div>
        <label>
          <b>Feedback Content</b>
        </label>
        <textarea
          className="input"
          placeholder="Feedback content"
          id="reportContentId"
          required
        ></textarea>
        <div>
          <label>
            <b>Feedback Evidence</b>
          </label>
        </div>
        <label htmlFor="reportImage" className="custom-file-upload">
          Photo Upload
        </label>
        <input
          type="file"
          id="reportImage"
          accept="image/png, image/jpeg"
          onChange={(e) => readURL(e)}
        />
        <div>{selectedImageSrc}</div>

        <button className="button primary">Create Feedback</button>
      </form>
    </div>
  );
}
