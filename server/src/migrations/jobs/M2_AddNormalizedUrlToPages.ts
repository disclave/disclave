import { pagesDbCollection } from "@/database/pages";
import { Job } from "../Job";

export const M2_AddNormalizedUrlToPages: Job = {
  id: "2-AddNormalizedUrlToPages",

  run: async () => {
    console.info("Migrating pages normalized URLs.");

    const collection = await pagesDbCollection();
    const cursor = await collection.find({
      normalizedUrl: { $exists: false },
    });

    console.info(
      "Migrating pages normalized URLs - data loaded - starting updates"
    );

    let count = 0;
    await cursor.forEach(async (page) => {
      const normalizedUrl = `http://${decodeURI(page._id.websiteId)}${decodeURI(
        page._id.pageId
      )}`;
      console.info(
        `Pages normalized URLs migration - updating ${page._id.websiteId}/${page._id.pageId} with url ${normalizedUrl}`
      );
      await collection.updateOne(
        { _id: page._id },
        {
          $set: {
            normalizedUrl,
          },
        }
      );

      count++;
    });

    console.info(
      `Pages normalized URLs migration modified ${count} documents.`
    );
  },
};
