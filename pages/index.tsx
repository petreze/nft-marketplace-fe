import { useWeb3React } from "@web3-react/core";
import Head from "next/head";
import Link from "next/link";
import Account from "../components/Account";
import NativeCurrencyBalance from "../components/NativeCurrencyBalance";
import MarketPlace from "../components/MarketPlace";
import MarketItem from "../components/MarketItem";
import { MARKET_PLACE_ADDRESS } from "../constants";
import useEagerConnect from "../hooks/useEagerConnect";
import fs from "fs";


function Home() {
  const { account, library } = useWeb3React();

  const triedToEagerConnect = useEagerConnect();

  const isConnected = typeof account === "string" && !!library;

  return (
    <div>
      <Head>
        <title>NFT</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <header>
        <nav>
          <h2>
            <Link href="/">
              <a>NFT Marketplace</a>
            </Link>
          </h2>
          <Account triedToEagerConnect={triedToEagerConnect} />
        </nav>
      </header>

      <main>
        {true && (
          <section>
            <MarketPlace contractAddress={MARKET_PLACE_ADDRESS} />
          </section>
        )}
      </main>

      <style jsx>{`
        nav {
          display: flex;
          justify-content: space-between;
        }

        main {
          text-align: center;
        }
      `}</style>
    </div>
  );
}

export default Home;
