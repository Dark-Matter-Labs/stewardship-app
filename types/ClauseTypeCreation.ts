import { SanityAssetDocument, SanityImageAssetDocument } from "next-sanity";

export type ClauseTypeCreation = {
  _type: string;
  name: string;
  responsibilityHolder: [
    {
      _type: string;
      _ref: string;
      _key: string;
    }
  ];
  rightHolder: [
    {
      _type: string;
      _ref: string;
      _key: string;
    }
  ];
  rights: string;
  responsibilities: string;
};
