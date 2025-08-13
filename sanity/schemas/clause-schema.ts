const clause = {
  name: "clause",
  title: "Clauses",
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
      name: "responsibilityHolder",
      title: "Responsibility Holder(s)",
      type: "array",
      of: [
        {
          type: "reference",
          to: [{ type: "actant" }],
        },
      ],
    },
    {
      name: "rightHolder",
      title: "Right Holder(s)",
      type: "array",
      of: [
        {
          type: "reference",
          to: [{ type: "actant" }],
        },
      ],
    },
    {
      name: "createdBy",
      title: "Created By",
      type: "reference",
      to: [{ type: "agent" }],
    },
    {
      name: "rights",
      title: "Rights",
      type: "string",
    },
    {
      name: "responsibilities",
      title: "Responsibilities",
      type: "string",
    },
    // {
    //   name: "rights",
    //   title: "Rights",
    //   type: "array",
    //   of: [
    //     {
    //       type: "reference",
    //       to: [{ type: "right" }],
    //     },
    //   ],
    // },
    // {
    //   name: "responsibilities",
    //   title: "Responsibilities",
    //   type: "array",
    //   of: [
    //     {
    //       type: "reference",
    //       to: [{ type: "responsibility" }],
    //     },
    //   ],
    // },
  ],
};

export default clause;
