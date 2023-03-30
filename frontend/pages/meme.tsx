import React from "react";
import Topbar from "../components/topbar/Topbar";
import Header from "../components/bottomBar/BottomBar";
import MainContainer from "../components/Meme/MainContainer/MainContainer";
import Radio from "../components/Music/Radio/Radio";
import Footer from "../components/footer/Footer";

const meme = () => {
  return (
    <div className=" relative h-screen lg:h-[100vh]">
      <Header />
      <Topbar />

      <main className="pt-[5rem] bg-[black] pb-5">
        <Radio />
        <MainContainer />
      </main>
      <Footer />
    </div>
  );
};

export default meme;
