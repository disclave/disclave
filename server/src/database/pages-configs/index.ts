import { db } from "@/connectors/mongodb";
import { pagesConfigsCollection } from "../collections";
import { DbPageConfig } from "../models";

export const pagesConfigsDbCollection = async () => {
  return (await db()).collection<DbPageConfig>(pagesConfigsCollection);
};
