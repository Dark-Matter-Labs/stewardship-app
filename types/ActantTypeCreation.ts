import { SanityAssetDocument, SanityImageAssetDocument } from "next-sanity";

export type ActantTypeCreation = {
  _type: string;
  name: string;
  slug: {
    _type: string;
    current: string;
  };
  image: {
    _type: string;
    asset: {
      _type: string;
      _ref: string;
    };
  };
  agents: [
    {
      _type: string;
      _ref: string;
      _key: string;
    },
  ];
};
