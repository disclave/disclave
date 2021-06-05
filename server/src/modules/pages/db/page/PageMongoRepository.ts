import {
  PageDetailsData,
  PageDetailsEntity,
  PageRepository,
  UrlMeta,
} from "@/modules/pages/db";
import { injectable } from "inversify";
import { MongoRepository, timestampNow } from "@/connectors/mongodb";
import { ClientSession } from "@/connectors/mongodb";
import { getProjection, pagesDbCollection } from "@/database/pages";
import { DbPageDetails } from "@/database";
import { UserId } from "@/modules/auth";

@injectable()
export class PageMongoRepository
  extends MongoRepository
  implements PageRepository<ClientSession> {
  public async findPageDetails(
    normalizedUrl: string,
    uid: UserId | null
  ): Promise<PageDetailsEntity | null> {
    const collection = await pagesDbCollection();
    const doc = await collection.findOne(
      {
        matchingUrls: normalizedUrl,
      },
      {
        projection: getProjection(uid),
      }
    );
    if (!doc) return null;
    return cursorDocToEntity(doc);
  }

  public async createOrUpdatePageDetails(
    urlMeta: UrlMeta,
    alternativeUrl: string | null,
    data: PageDetailsData | null,
    uid: UserId | null
  ): Promise<PageDetailsEntity> {
    const matchingUrls = [urlMeta.normalized];
    if (alternativeUrl != null) matchingUrls.push(alternativeUrl);

    const collection = await pagesDbCollection();
    const result = await collection.findOneAndUpdate(
      // TODO: change to search by normalized url
      // case, when value for canonical url already exists, but with a different ids,
      {
        _id: {
          pageId: urlMeta.pageId,
          websiteId: urlMeta.websiteId,
        },
      },
      {
        // TODO: compare with old methods and maybe update
        $setOnInsert: {
          _id: {
            pageId: urlMeta.pageId,
            websiteId: urlMeta.websiteId,
          },
          normalizedUrl: urlMeta.normalized,
          votesUp: [],
          votesDown: [],
          votesSum: 0,
          timestamp: timestampNow(),
          meta: data
            ? {
                logo: data.logo,
                title: data.title,
              }
            : null,
        },
        // $set: {
        //   meta: {
        //     logo: data.logo,
        //     title: data.title,
        //   },
        // },
        $addToSet: {
          matchingUrls: { $each: matchingUrls },
        },
      },
      {
        upsert: true,
        returnOriginal: false,
        projection: getProjection(uid),
      }
    );
    return cursorDocToEntity(result.value);
  }

  // public async findOrCreatePageDetails(
  //   url: UrlMeta,
  //   uid: UserId | null
  // ): Promise<PageDetailsEntity> {
  //   const collection = await pagesDbCollection();
  //   const result = await collection.findOneAndUpdate(
  //     urlMetaToIdFilter(url),
  //     {
  //       $setOnInsert: toDbPageDetails(url, null),
  //     },
  //     {
  //       upsert: true,
  //       returnOriginal: false,
  //       projection: getProjection(uid),
  //     }
  //   );
  //   return cursorDocToEntity(result.value);
  // }

  // public async updatePageDetails(
  //   url: UrlMeta,
  //   data: PageDetailsData,
  //   uid: UserId | null
  // ) {
  //   const collection = await pagesDbCollection();
  //   const result = await collection.findOneAndUpdate(
  //     urlMetaToIdFilter(url),
  //     {
  //       $setOnInsert: toPartialDbPageDetails(url),
  //       $set: {
  //         meta: metaToDbPageDetailsMeta(data),
  //       },
  //     },
  //     {
  //       upsert: true,
  //       returnOriginal: false,
  //       projection: getProjection(uid),
  //     }
  //   );
  //   return cursorDocToEntity(result.value);
  // }
}

// const urlMetaToIdFilter = (url: UrlMeta) => ({
//   _id: {
//     pageId: url.pageId,
//     websiteId: url.websiteId,
//   },
// });

const toPartialDbPageDetails = (url: UrlMeta) => ({
  _id: {
    pageId: url.pageId,
    websiteId: url.websiteId,
  },
  normalizedUrl: url.normalized,
  matchingUrls: [url.normalized],
  votesUp: [],
  votesDown: [],
  votesSum: 0,
  timestamp: timestampNow(),
});

// const toDbPageDetails = (
//   url: UrlMeta,
//   data: PageDetailsData | null
// ): DbPageDetails => ({
//   ...toPartialDbPageDetails(url),
//   meta: metaToDbPageDetailsMeta(data),
// });

// const metaToDbPageDetailsMeta = (data: PageDetailsData | null) => {
//   if (!data) return null;
//   return {
//     logo: data.logo,
//     title: data.title,
//   };
// };

const cursorDocToEntity = (doc: DbPageDetails): PageDetailsEntity => ({
  pageId: doc._id.pageId,
  websiteId: doc._id.websiteId,
  url: doc.normalizedUrl,
  votes: {
    sum: doc.votesSum,
    votedUp: doc.votesUp?.length > 0,
    votedDown: doc.votesDown?.length > 0,
  },
  meta: doc.meta
    ? {
        logo: doc.meta.logo,
        title: doc.meta.title,
      }
    : null,
});
