import {
  PageDetailsData,
  PageDetailsEntity,
  PageMetaEntity,
  PageRepository,
  UrlMeta,
} from "@/modules/pages/db";
import { injectable } from "inversify";
import {
  ClientSession,
  MongoRepository,
  timestampNow,
} from "@/connectors/mongodb";
import { getProjection, pagesDbCollection } from "@/database/pages";
import { DbPageDetails } from "@/database";
import { UserId } from "@/modules/auth";
import { UrlId } from "@/modules/pages";

@injectable()
export class PageMongoRepository
  extends MongoRepository
  implements PageRepository<ClientSession> {
  public async findPageMeta(urlId: UrlId): Promise<PageMetaEntity | null> {
    const collection = await pagesDbCollection();
    const doc = await collection.findOne(
      {
        "_id.websiteId": urlId.websiteId,
        "_id.pageId": urlId.pageId,
      },
      {
        projection: {
          meta: {
            logo: 1,
            title: 1,
          },
        },
      }
    );
    if (!doc) return null;
    return cursorDocToMetaEntity(doc);
  }

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
      {
        matchingUrls: { $elemMatch: { $in: matchingUrls } },
      },
      {
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
        },
        $set: {
          meta: data
            ? {
                logo: data.logo,
                title: data.title,
              }
            : null,
        },
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
}

function cursorDocToEntity(doc: DbPageDetails): PageDetailsEntity {
  return {
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
  };
}

function cursorDocToMetaEntity(doc: DbPageDetails): PageMetaEntity | null {
  if (!doc.meta) return null;
  return {
    logo: doc.meta.logo,
    title: doc.meta.title,
  };
}
