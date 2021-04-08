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
    // TODO: verify without redirect - porbably display some text to user
    if (!continueUrl) return;
    await router.push(continueUrl);
  }

  useEffect(() => {
    if (!mode) return;
    processAction();
  }, [mode])

  // TODO: add translation
  return (
    <div className="w-full">
      <div className="mx-auto w-max border rounded mt-6 p-4">
        Loading, please wait...
      </div>
    </div>
  )
}
export default EmailActionHandler;