import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useRouter } from 'next/router';
import { websiteHref } from '@/pages/website/[website]';
import { isUrl, stringToUrl } from '@disclave/client';
import { GetStaticProps } from 'next';

const PwaShare: React.VFC = () => {
  const router = useRouter();
  const title = router.query.title as string | undefined;
  const text = router.query.text as string | undefined;
  const url = router.query.url as string | undefined;

  let link: string | undefined;
  if (url && isUrl(url)) link = stringToUrl(url);
  else if (text && isUrl(text)) link = stringToUrl(text);
  else if (title && isUrl(title)) link = stringToUrl(title);

  if (!!link) {
    const href = websiteHref(link);
    router.push(href);
  } else {
    return <div>Missing or invalid URL</div>;
  }

  // TODO: use Layout and translations
  return <div>Loading...</div>;
};
export default PwaShare;

export const getStaticProps: GetStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale!, ['common', 'layout']))
  }
});
