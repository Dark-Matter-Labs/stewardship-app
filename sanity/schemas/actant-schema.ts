const actant = {
  name: "actant",
  title: "Actants",
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
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "name" },
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
    {
      title: "Agents",
      name: "agents",
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

export default actant;
