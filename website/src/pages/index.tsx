import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';
import { Layout } from '../modules/layout';

const Home = () => {
  const { t } = useTranslation('common');

  const test = new Array(50).fill(0);

  return (
    <Layout>
      {t('App name')}
      {test.map((v, i) => (
        <div key={i}>Test</div>
      ))}
      Test!
    </Layout>
  );
};
export default Home;

export const getStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale, ['common']))
  }
});
