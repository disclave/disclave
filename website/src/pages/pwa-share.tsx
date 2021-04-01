import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useRouter } from 'next/router';
import { websiteHref } from '@/pages/website/[website]';
import { isUrl } from '@disclave/client';

const PwaShare = () => {
  const router = useRouter();
  const title = router.query.title as string | undefined;
  const text = router.query.text as string | undefined;
  const url = router.query.url as string | undefined;
  console.log(title, text, url);

  let link: string | undefined;
  if (isUrl(url)) link = url;
  else if (isUrl(text)) link = text;
  else if (isUrl(title)) link = title;

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

export const getStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale, ['common', 'layout']))
  }
});
