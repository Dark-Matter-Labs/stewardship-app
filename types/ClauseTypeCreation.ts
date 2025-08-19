import { SanityAssetDocument, SanityImageAssetDocument } from "next-sanity";
import { Agent } from "./Agent";

type ResponsibilityHolder = {
  _type: string;
  _ref: string;
  _key: string;
};
type RightHolder = {
  _type: string;
  _ref: string;
  _key: string;
};

export type ClauseTypeCreation = {
  _type: string;
  name: string;
  slug: object;
  space: {
    _type: string;
    _ref: string;
  };
  // rightHolder: {
  responsibilityHolder: ResponsibilityHolder[];
  rightHolder: RightHolder[];
  rights: string;
  responsibilities: string;
  createdBy: Object;
};
