import Head from 'next/head'
import {Test} from "@webchat/client-core";

const Home = () => {
  return (
    <div>
      <Head>
        <title>WebChat</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        WebChat

        <Test/>
      </main>
    </div>
  )
}
export default Home
