import { SSRConfig } from 'next-i18next';
import { IncomingMessage } from 'http';
import { getUserCookie } from '@disclave/server';
import { initServer } from '.';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

export interface DefaultProps extends SSRConfig {
  serverSideUid: string | null;
  iframe?: boolean;
  key?: string;
}

export const getDefaultProps = async (
  context: {
    req: IncomingMessage;
    locale: string;
  },
  translationNamespaces: string[],
  config?: {
    iframe?: boolean;
    key?: string;
  }
): Promise<DefaultProps> => {
  await initServer(false);
  const userCookie = getUserCookie(context.req);

  const translations = await serverSideTranslations(context.locale, translationNamespaces);

  return {
    serverSideUid: userCookie?.uid ?? null,
    iframe: config.iframe,
    key: config.key,
    ...translations
  };
};
