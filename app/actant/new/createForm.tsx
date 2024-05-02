"use client";
import { ActantTypeCreation } from "@/types/ActantTypeCreation";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { createActant } from "@/sanity/sanity-utils";
const filePath = "image-c118fafe1f9a7245ae6fac3a734aa27a023f0810-612x612-jpg";

export default function CreateForm() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSummit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    const actant: ActantTypeCreation = {
      _type: "actant",
      name: name,
      slug: {
        _type: "slug",
        current: name,
      },
      image: {
        _type: "image",
        asset: {
          _type: "reference",
          _ref: filePath,
        },
      },
    };

    createActant(actant)
      .then(() => {
        alert("Recognised " + name + " in the network.");
        setIsLoading(false);
      })
      .catch((err) => console.log("error: ", err));

    router.push("/");
  };

  return (
    <form className="w-1/2" onSubmit={handleSummit}>
      <label>
        <span>Actant Name:</span>
        <input
          className="input"
          required
          type="text"
          onChange={(e) => setName(e.target.value)}
          value={name}
        ></input>
      </label>
      <button className="button primary" disabled={isLoading}>
        {isLoading && <span> Adding... </span>}
        {!isLoading && <span> Add Actant</span>}
      </button>
    </form>
  );
}
