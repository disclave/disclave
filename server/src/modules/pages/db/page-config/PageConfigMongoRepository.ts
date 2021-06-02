import { PageConfigEntity, PageConfigRepository } from "@/modules/pages/db";
import { injectable } from "inversify";
import { MongoRepository } from "@/connectors/mongodb";
import { ClientSession } from "@/connectors/mongodb";
import { pagesConfigsDbCollection } from "@/database/pages-configs";
import { DbPageConfig } from "@/database";

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

const cursorDocToEntity = (doc: DbPageConfig): PageConfigEntity => ({
  id: doc._id,
  preserveQueryParams: doc.preserveQueryParams,
});
