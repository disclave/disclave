import Head from 'next/head';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';

const Home = () => {
  const { t } = useTranslation('common');

  return (
    <div>
      <Head>
        <title>WebChat</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>{t('App name')}</main>
    </div>
  );
};
export default Home;

export const getStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale, ['common']))
  }
});
