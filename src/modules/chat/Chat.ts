import {IApiAdapter} from "../../adapters/api";
import {Message} from "./Message";

export class Chat {

  constructor(private api: IApiAdapter) {
  }

  public getMessages(): Array<Message> {
    // TODO:
    return [
      {
        text: 'test message'
      }
    ];
  }

  public async addMessage(text: string) {
    // TODO:
  }
}
