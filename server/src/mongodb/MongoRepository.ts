import { ClientSession, withTransaction } from "./index";
import { injectable } from "inversify";

@injectable()
export abstract class MongoRepository {
  public async runTransaction(
    run: (session: ClientSession) => Promise<unknown>
  ): Promise<void> {
    await withTransaction(run);
  }
}
