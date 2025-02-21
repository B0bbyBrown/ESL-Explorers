import type { NextPage } from "next";
import Head from "next/head";
const About: NextPage = () => {
  return (
    <>
      <Head>
        <title>About - ESL Explorers</title>
        <meta
          name="description"
          content="Learn more about ESL Explorers and our mission."
        />
      </Head>
      <div style={{ padding: "2rem" }}>
        <h1>About Us</h1>
        <p>
          ESL Explorers is dedicated to improving English skills through
          interactive lessons and expert guidance.
        </p>
      </div>
    </>
  );
};

export default About;
