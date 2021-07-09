import { GetServerSideProps } from 'next';
import React from 'react';
import { HomePage } from '@/modules/layout/home';
import { PageUrl } from '@/PageUrl';
import { getHomeSSP, HomeProps } from '@/modules/server/home';

export const homeHref: PageUrl = () => '/';

export const getServerSideProps: GetServerSideProps<HomeProps> = async ({ req, locale }) => {
  const props = await getHomeSSP(req, locale!, ['common', 'home', 'layout']);
  return {
    props
  };
};

const Home: React.VFC<HomeProps> = (props) => {
  return (
    <HomePage
      blog={props.blog}
      topComments={props.topComments}
      topCommentedPages={props.topCommentedPages}
      topRatedPages={props.topRatedPages}
      latestComments={props.latestComments}
    />
  );
};
export default Home;
