import { ClientSession, withTransaction } from "./index";

export abstract class MongoRepository {
  public async runTransaction(
    run: (session: ClientSession) => Promise<unknown>
  ): Promise<void> {
    await withTransaction(run);
  }
}
