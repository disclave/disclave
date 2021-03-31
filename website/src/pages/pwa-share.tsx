import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useRouter } from 'next/router';
import { websiteHref } from '@/pages/website/[website]';

const PwaShare = () => {
  const router = useRouter();
  // const name = router.query.name;
  // const description = router.query.description;
  const link = router.query.link;

  if (link && typeof link === 'string') {
    const href = websiteHref(link);
    router.push(href);
  }

  return <div>Loading...</div>;
};
export default PwaShare;

export const getStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale, ['common', 'layout']))
  }
});
