"use client";
import { ActantTypeCreation } from "@/types/ActantTypeCreation";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { client, createActant, genRanHex } from "@/sanity/sanity-utils";

export default function CreateForm({ id }: { id: string }) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  let [selectedImageSrc, setSelectedImageSrc] = useState("no file chosen");

  console.log("the id CreateForm gets is: ", id);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    // Retrive name
    const name = e.currentTarget.actantName.value;
    const slug = e.currentTarget.actantName.value.replace(/ /g, "-");

    // Upload Image
    const image = await client.assets.upload(
      "image",
      e.currentTarget.actantImage.files[0]
    );

    // Prepare actant
    const actant: ActantTypeCreation = {
      _type: "actant",
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
      agents: [
        {
          _type: "reference",
          _ref: id,
          _key: genRanHex(12),
        },
      ],
    };

    // Create actant
    try {
      await createActant(actant);
      setIsLoading(false);
    } catch (e) {
      console.log("error: ", e);
    }

    // Redirect to root
    router.push("/");
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

      <button className="button primary" disabled={isLoading}>
        {isLoading && <span> Adding... </span>}
        {!isLoading && <span> Add Actant</span>}
      </button>
    </form>
  );
}
