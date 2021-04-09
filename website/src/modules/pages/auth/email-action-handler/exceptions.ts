import { Exception } from '@/modules/errors';

export const EAHResetPasswordNotSupported = (message: string) =>
  new Exception(message, 'email-action-handler/reset-password-not-supported');
export const EAHRecoverEmailNotSupported = (message: string) =>
  new Exception(message, 'email-action-handler/recover-email-not-supported');

export const EAHInvalidMode = (message: string) =>
  new Exception(message, 'email-action-handler/invalid-mode');

export const EAHMissingActionCode = (message: string) =>
  new Exception(message, 'email-action-handler/missing-action-code');
