import Tab = chrome.tabs.Tab;
import {IWebsiteAdapter, IWebsiteInfo} from "@webchat/core"

export class ChromeAdapter implements IWebsiteAdapter {

  private getActiveTab(): Promise<Tab> {
    // TODO: remove Promise and use await on query after @types/chrome update https://github.com/DefinitelyTyped/DefinitelyTyped/issues/51327
    return new Promise((resolve) => {
      chrome.tabs.query({ active: true, currentWindow: true }, (result) => {
        resolve(result[0]);
      });
    });
  }

  async getCurrentWebsiteInfo(): Promise<IWebsiteInfo> {
    const activeTab = await this.getActiveTab();

    return {
      url: new URL(activeTab.url!)
    };
  }

}
