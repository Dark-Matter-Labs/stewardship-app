const space = {
  name: "space",
  title: "Space/workshop",
  type: "document",
  fields: [
    {
      name: "name",
      title: "Space/workshop Name",
      type: "string",
    },
    {
      title: "URL",
      name: "slug",
      type: "slug",
      options: {
        source: "name",
        inUnique: "true",
        slugify: (input: any) =>
          input
            .toLowerCase()
            .replace(/[^a-zA-Z0-9 ]/g, "")
            .replace(/\s+/g, "-")
            .slice(0, 200),
      },
    },
  ],
};

export default space;
