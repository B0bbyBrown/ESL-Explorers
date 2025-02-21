import type { NextPage } from "next";
import Head from "next/head";

const Contact: NextPage = () => {
  return (
    <>
      <Head>
        <title>Contact - ESL Explorers</title>
        <meta
          name="description"
          content="Get in touch with us for more information."
        />
      </Head>
      <div style={{ padding: "2rem" }}>
        <h1>Contact Us</h1>
        <p>
          If you have any questions or need support, please email us at
          support@eslexplorers.com.
        </p>
      </div>
    </>
  );
};

export default Contact;
