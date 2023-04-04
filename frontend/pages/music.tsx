import React from "react";
import Header from "../components/bottomBar/BottomBar";
import TrendingSong from "../components/Music/Trending/Trending";
import MainContainer from "../components/Music/MainContainer/MainContainer";
import Radio from "../components/Music/Radio/Radio";
import Topbar from "../components/topbar/Topbar";
import Footer from "../components/footer/Footer";

const Music = () => {
  return (
    <>
      {/* <Header /> */}
      <Topbar />
      <main className="pt-[5rem] bg-black pb-2">
        <Radio />
        <TrendingSong />
        <MainContainer />
      </main>
      <Footer />
    </>
  );
};

<></>;
export default Music;
