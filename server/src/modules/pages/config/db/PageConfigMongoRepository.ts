import { injectable } from "inversify";
import { ClientSession, MongoRepository } from "@/connectors/mongodb";
import { pagesConfigsDbCollection } from "@/database/pages-configs";
import { DbPageConfig } from "@/database";
import { PageConfigEntity, PageConfigRepository } from ".";

@injectable()
export class PageConfigMongoRepository
  extends MongoRepository
  implements PageConfigRepository<ClientSession> {
  public async findPageConfig(
    normalizedUrl: string
  ): Promise<PageConfigEntity | null> {
    const collection = await pagesConfigsDbCollection();
    const doc = await collection.findOne({ _id: normalizedUrl });
    if (!doc) return null;
    return cursorDocToEntity(doc);
  }
}

function cursorDocToEntity(doc: DbPageConfig): PageConfigEntity {
  return {
    id: doc._id,
    preserveQueryParams: doc.preserveQueryParams,
  };
}
