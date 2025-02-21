// pages/index.tsx
import type { NextPage } from "next";
import Head from "next/head";

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>ESL Explorers - Home</title>
        <meta name="description" content="Welcome to ESL Explorers." />
      </Head>
      <div>
        <h1>Hello, Welcome to ESL Explorers!</h1>
        <p>This is your landing page.</p>
      </div>
    </>
  );
};

export default Home;
