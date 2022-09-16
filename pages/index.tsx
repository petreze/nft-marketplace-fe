import { useWeb3React } from "@web3-react/core";
import Head from "next/head";
import Link from "next/link";
import Account from "../components/Account";
import MarketPlace from "../components/MarketPlace";
import MarketItem from "../components/MarketItem";
import MyItems from "../components/MyItems";
import { MARKET_PLACE_ADDRESS } from "../constants";
import useEagerConnect from "../hooks/useEagerConnect";
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";
import { Navbar, Nav, Button, Container } from 'react-bootstrap'





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
          <Account/>
        </nav>
        <nav>
        <MyItems marketPlaceAddress={MARKET_PLACE_ADDRESS} />
        </nav>
      </header>

      <main>
        {isConnected && (
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