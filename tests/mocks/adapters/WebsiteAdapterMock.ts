import {IWebsiteAdapter, IWebsiteInfo} from "../../../src/adapters/website";

export class WebsiteAdapterMock implements IWebsiteAdapter {
  constructor(private url: string) {
  }

  async getCurrentWebsiteInfo(): Promise<IWebsiteInfo> {
    return {
      url: new URL(this.url)
    };
  }
}
