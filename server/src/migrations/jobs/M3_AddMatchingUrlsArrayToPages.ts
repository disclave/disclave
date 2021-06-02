import { pagesDbCollection } from "@/database/pages";
import { Job } from "../Job";

export const M3_AddMatchingUrlsArrayToPages: Job = {
  id: "3-AddMatchingUrlsArrayToPages",

  run: async () => {
    console.info("Migrating pages matching URLs.");

    const collection = await pagesDbCollection();
    const result = await collection.updateMany(
      {
        matchingUrls: { $exists: false },
      },
      {
        $push: {
          matchingUrls: "$normalizedUrl",
        },
      }
    );

    console.info(
      `Pages matching URLs migration modified ${result.modifiedCount} documents.`
    );
  },
};
