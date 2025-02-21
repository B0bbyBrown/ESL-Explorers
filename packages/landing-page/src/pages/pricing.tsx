import type { NextPage } from "next";
import Head from "next/head";
import PricingTable from "../components/PricingTable";

const Pricing: NextPage = () => {
  return (
    <>
      <Head>
        <title>Pricing - ESL Explorers</title>
        <meta
          name="description"
          content="Choose the best plan to improve your English skills."
        />
      </Head>
      <div style={{ padding: "2rem" }}>
        <h1>Our Pricing Plans</h1>
        <PricingTable />
      </div>
    </>
  );
};

export default Pricing;
