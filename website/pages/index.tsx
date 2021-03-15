import Head from 'next/head';
import { Button } from "@webchat/ui";

const Home = () => {
  return (
    <div>
      <Head>
        <title>WebChat</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Button>Button!</Button>
      <main>WebChat!</main>
    </div>
  );
};
export default Home;
