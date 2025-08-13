import { SanityAssetDocument, SanityImageAssetDocument } from "next-sanity";

export type ReportTypeCreation = {
  _type: string;
  space: {
    _type: string;
    _ref: string;
  };
  _id?: string;
  name: string;
  slug: {
    _type: string;
    current: string;
  };
  type: string;
  clause: {
    _type: string;
    _ref: string;
  };
  content: string;
  image: {
    _type: string;
    asset: {
      _type: string;
      _ref: string;
    };
  };
  reporter: {
    _type: string;
    _ref: string;
  };
};
