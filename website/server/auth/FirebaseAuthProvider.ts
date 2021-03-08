import {AuthProvider, DecodedIdToken} from "./index";
import {auth} from "../firebase";
import {injectable} from "inversify";

@injectable()
export class FirebaseAuthProvider implements AuthProvider {
  async verifyIdToken(idToken: string, checkIfRevoked: boolean): Promise<DecodedIdToken> {
    const token = await auth.verifyIdToken(idToken, checkIfRevoked)

    return {
      uid: token.uid
    }
  }

}