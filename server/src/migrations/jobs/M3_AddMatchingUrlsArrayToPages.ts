import { pagesDbCollection } from "@/database/pages";
import { Job } from "../Job";

export const M3_AddMatchingUrlsArrayToPages: Job = {
  id: "3-AddMatchingUrlsArrayToPages",

  run: async () => {
    console.info("Migrating pages matching URLs.");

    const collection = await pagesDbCollection();
    const cursor = await collection.find({
      matchingUrls: { $exists: false },
    });

    console.info(
      "Migrating pages matching URLs - data loaded - starting updates"
    );

    let count = 0;
    await cursor.forEach(async (page) => {
      const normalizedUrl = page.normalizedUrl;
      console.info(
        `Pages matching URLs migration - updating ${page._id.websiteId}/${page._id.pageId} with url ${normalizedUrl}`
      );
      await collection.updateOne(
        { _id: page._id },
        {
          $set: {
            matchingUrls: [normalizedUrl],
          },
        }
      );

      count++;
    });

    console.info(`Pages matching URLs migration modified ${count} documents.`);
  },
};
