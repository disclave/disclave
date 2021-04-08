import { useRouter } from "next/router";
import { applyActionCode } from "@disclave/client"
import { useEffect } from "react";

const EmailActionHandler = () => {
  const router = useRouter();
  var mode = router.query.mode as string;
  var actionCode = router.query.oobCode as string;
  var continueUrl = router.query.continueUrl as string | undefined;

  const processAction = async () => {
    switch (mode) {
      case 'resetPassword': throw 'Reset password not supported yet.';
      case 'recoverEmail': throw 'Recover email not supported yet.';
      case 'verifyEmail':
        await verifyEmail();
        break;  
      default:
        throw "Invalid mode."
    }
  }

  const verifyEmail = async () => {
    // TODO: handle errors
    await applyActionCode(actionCode)
    await redirect();
  }

  const redirect = async () => {
    // TODO: verify without redirect
    if (!continueUrl) return;
    await router.push(continueUrl);
  }

  useEffect(() => {
    if (!mode) return;
    processAction();
  }, [mode])

  // TODO: update layout
  return <div>Loading...</div>
}
export default EmailActionHandler;