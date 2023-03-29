import type { NextPage } from "next";
import Head from "next/head";
import Banner from "../components/Movie/banner/Banner";
import Listcard from "../components/Movie/Cards/collectionCard/MainContainer";
import TreandingCard from "../components/Movie/Cards/TreadingCards/TreandingCard";
import Header from "../components/bottomBar/BottomBar";
import Topbar from "../components/topbar/Topbar";
import MustWatch from "../components/Movie/MustWatch/MustWatch";

const Home = () => {
  return (
    <div className=" relative h-screen bg-gradient-to-b from-gray-900/10 to-[#010511] lg:h-[100vh]">
      <Head>
        <title>Play And Pause</title>
        <link rel="icon" href="/favicon.ico" />
        <link rel="manifest" href="/manifest.json" />
      </Head>

      <Header />
      <Topbar />
      <Banner />
      <main className="bg-[black] max-w-[full] pt-[3rem] md:pt-0">
        <TreandingCard />
        <MustWatch />
        <Listcard />
      </main>
    </div>
  );
};

export default Home;
