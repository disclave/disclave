import { getPageService } from "../../index";
import { commentsDbCollection } from "@/database/comments";
import { Job } from "../Job";

export const M4_AddUrlMetaToComments: Job = {
  id: "4-AddUrlMetaToComments",

  run: async () => {
    console.info("Migrating comments URL meta.");

    const collection = await commentsDbCollection();
    const cursor = await collection.find({
      "url.meta": { $exists: false },
    });

    console.info(
      "Migrating comments URL meta - data loaded - starting updates"
    );

    const pageService = getPageService();

    let count = 0;
    await cursor.forEach(async (comment) => {
      const urlId = {
        websiteId: comment.url.websiteId,
        pageId: comment.url.pageId,
      };
      const meta = await pageService.getSavedPageMeta(urlId);

      console.info(
        `Comments URL meta migration - updating ${
          comment._id
        }, urlId ${JSON.stringify(urlId)}, with meta ${
          meta ? JSON.stringify(meta) : "null"
        }`
      );

      await collection.updateOne(
        { _id: comment._id },
        {
          $set: {
            "url.meta": meta
              ? {
                  logo: meta.logo ?? null,
                  title: meta.title ?? null,
                }
              : null,
          },
        }
      );

      count++;
    });

    console.info(`Comments URL meta migration migration modified ${count} documents.`);
  },
};
