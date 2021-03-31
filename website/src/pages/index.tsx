import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { HomePage } from '@/modules/pages/home';

const Home = () => {
  return <HomePage />;
};
export default Home;

export const getStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale, ['common', 'home', 'layout']))
  }
});
