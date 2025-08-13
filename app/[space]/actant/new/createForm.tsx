"use client";
import { ActantTypeCreation } from "@/types/ActantTypeCreation";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { Agent as AgentType } from "@/types/Agent";
import {
  client,
  createActant,
  genRanHex,
  getAllAgents,
} from "@/sanity/sanity-utils";

export default function CreateForm({
  id,
  spaceId,
  space,
}: {
  id: string;
  spaceId: string;
  space: string;
}) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  let [agents, setAgents] = useState<AgentType[]>([]);
  const [selectedAgents, setSelectedAgents] = useState<AgentType[]>([]);
  let [selectedImageSrc, setSelectedImageSrc] = useState("no file chosen");

  console.log("the id CreateForm gets is: ", id);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (e.currentTarget.actantImage.files[0] == null) {
      alert("please upload image");
      return;
    }

    setIsLoading(true);

    // @ts-ignore
    const agentRefs = [];

    selectedAgents.map((agent) => {
      // @ts-ignore
      agentRefs.push({
        _type: "reference",
        _ref: agent.id,
        _key: genRanHex(12),
      });
    });

    // Retrive name
    const name = e.currentTarget.actantName.value;
    const slug = e.currentTarget.actantName.value.replace(/ /g, "-");

    // Upload Image
    const image = await client.assets.upload(
      "image",
      e.currentTarget.actantImage.files[0],
    );

    // Prepare actant
    const actant: ActantTypeCreation = {
      _type: "actant",
      space: {
        _type: "reference",
        _ref: spaceId,
      },
      name: name,
      slug: {
        _type: "slug",
        current: slug,
      },
      image: {
        _type: "image",
        asset: {
          _type: "reference",
          _ref: image._id,
        },
      },
      // @ts-ignore
      agents: agentRefs,
    };

    // // Create actant
    try {
      await createActant(actant);
      setIsLoading(false);
    } catch (e) {
      console.log("error: ", e);
    }

    alert("Actant created successfully!");

    // Redirect to root
    router.push("/" + space);
  };

  useEffect(() => {
    async function fetchData() {
      let listOfAgents = await getAllAgents(spaceId);
      setAgents(listOfAgents);
    }
    fetchData();
  }, []);

  const handleSelect = (option: AgentType) => {
    setSelectedAgents(
      (prev) =>
        prev.includes(option)
          ? prev.filter((item) => item !== option) // Remove if selected again
          : [...prev, option], // Add if not already selected
    );
  };

  useEffect(() => {
    console.log("useEffect, id", id);
  }, [id]);

  function readURL(e: React.FormEvent<HTMLInputElement>) {
    // display selected image's URL
    let filepath: string = e.currentTarget.value;
    let filename: string = filepath.split("\\").pop()!;

    if (filepath) {
      setSelectedImageSrc(filename);
    }
  }

  return (
    <form
      className="w-1/2"
      encType="multipart/form-data"
      onSubmit={handleSubmit}
    >
      <label>
        <span>Actant Name:</span>
        <input type="text" id="actantName" className="input" required />
        <label htmlFor="actantImage" className="custom-file-upload">
          Upload Photo
        </label>

        <input
          type="file"
          id="actantImage"
          accept="image/png, image/jpeg"
          onChange={(e) => readURL(e)}
        />
        <div>{selectedImageSrc}</div>
      </label>

      <div className="dropdownGroup">
        <div className="dropdownHeader">
          <label>Select agents as stewards:</label>
        </div>

        <div className="dropdown-menu">
          {agents.map((actant: AgentType) => (
            <div key={actant.id}>
              <label className="dropdown-item">
                <input
                  type="checkbox"
                  value={actant.name}
                  checked={selectedAgents.includes(actant)}
                  onChange={() => handleSelect(actant)}
                />
                {actant.name}
              </label>
            </div>
          ))}
        </div>
      </div>

      <button className="button primary" disabled={isLoading}>
        {isLoading && <span> Adding... </span>}
        {!isLoading && <span> Add Actant</span>}
      </button>
    </form>
  );
}
