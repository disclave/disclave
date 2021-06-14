import { PageConfig } from "./models";

export type { PageConfig };

export abstract class PageConfigService {
  abstract getPageConfig(normalizedUrl: string): Promise<PageConfig | null>;
}
