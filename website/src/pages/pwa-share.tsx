import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useRouter } from 'next/router';
import { websiteHref } from '@/pages/website/[website]';

const PwaShare = () => {
  const router = useRouter();
  const link = router.query.link;

  // TODO: handle errors
  if (link && typeof link === 'string') {
    const href = websiteHref(link);
    router.push(href);
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
