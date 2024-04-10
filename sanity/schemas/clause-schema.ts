const clause = {
  name: "clause",
  title: "Clauses",
  type: "document",
  fields: [
    {
      name: "name",
      title: "Name",
      type: "string",
    },
    {
      name: "respoinsibilityHolder",
      title: "Responsibility Holder(s)",
      type: "array",
      of: [
        {
          type: "reference",
          to: [{ type: "agent" }, { type: "actant" }],
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
          to: [{ type: "actant" }, { type: "agent" }],
        },
      ],
    },
    {
      name: "rights",
      title: "Rights",
      type: "array",
      of: [
        {
          type: "reference",
          to: [{ type: "right" }],
        },
      ],
    },
    {
      name: "respoinsibilities",
      title: "Respoinsibilities",
      type: "array",
      of: [
        {
          type: "reference",
          to: [{ type: "responsibility" }],
        },
      ],
    },
  ],
};

export default clause;
