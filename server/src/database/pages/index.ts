import { db } from "@/connectors/mongodb";
import { pagesCollection } from "../collections";
import { DbPageDetails } from "../models";

export const pagesDbCollection = async () => {
  return (await db()).collection<DbPageDetails>(pagesCollection);
};
