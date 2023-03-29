import React from "react";
import Header from "../components/bottomBar/BottomBar";
import TrendingSong from "../components/Music/Trending/Trending";
import MainContainer from "../components/Music/MainContainer/MainContainer";
import Radio from "../components/Music/Radio/Radio";
import Topbar from "../components/topbar/Topbar";

const Music = () => {
  return (
    <>
      <Header />
      <Topbar />
      <main className="pt-[5rem] bg-black">
        <Radio />
        <TrendingSong />
        <MainContainer />
      </main>
    </>
  );
};

<></>;
export default Music;
