const report = {
  name: "report",
  title: "Reports",
  type: "document",
  fields: [
    {
      name: "name",
      title: "Name",
      type: "string",
    },
    {
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "name" },
    },
    {
      name: "type",
      title: "Type",
      type: "string",
      initialValue: "Sign",
      options: {
        list: [
          { title: "Sign", value: "sign" },
          { title: "Breach", value: "breach" },
          { title: "Fulfillment", value: "fulfillment" },
          { title: "Terminaion", value: "termination" },
          { title: "Review", value: "review" },
        ],
      },
    },
    {
      name: "clause",
      title: "Clause",
      type: "reference",
      to: [{ type: "clause" }],
    },
    {
      name: "content",
      title: "Content",
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
    {
      name: "reporter",
      title: "Reporter",
      type: "reference",
      to: [{ type: "agent" }],
    },
    {
      name: "endorsers",
      title: "Endorsers",
      type: "array",
      of: [
        {
          type: "reference",
          to: [{ type: "agent" }],
        },
      ],
    },
  ],
};

export default report;
