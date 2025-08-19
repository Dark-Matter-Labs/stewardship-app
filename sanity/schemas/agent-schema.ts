import { SlugSourceFn } from "sanity";

const handleSlugSource: SlugSourceFn = async (doc) => {
  return doc.name + " " + doc.identity;
};

const agent = {
  name: "agent",
  title: "Agents",
  type: "document",
  fields: [
    {
      name: "space",
      type: "reference",
      validation: (Rule: any) => Rule.required(),
      to: [{ type: "space" }],
    },
    {
      name: "name",
      title: "Name",
      type: "string",
    },
    {
      name: "email",
      title: "Email",
      type: "string",
    },
    {
      name: "identity",
      title: "Identity",
      type: "string",
    },
    {
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: handleSlugSource,
      },
    },
    {
      name: "motto",
      title: "Motto",
      type: "string",
    },
    {
      name: "imgLink",
      title: "Ext Image Link",
      type: "string",
    },
    {
      name: "image",
      title: "Image",
      type: "image",
      options: { hotspot: true },
      fields: [
        {
          name: "alt",
          title: "Alt",
          type: "string",
        },
      ],
    },
  ],
};

export default agent;
