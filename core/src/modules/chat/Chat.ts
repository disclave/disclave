import {IApiAdapter} from "../api";
import {Message} from "./Message";

export class Chat {

  constructor(private api: IApiAdapter) {
  }

  public async getMessages(): Promise<Array<Message>> {
    // TODO:
    return [
      {
        text: 'test message text'
      }
    ];
  }

  public async addMessage(text: string) {
    // TODO:
  }
}
