import React, { useState, useEffect } from "react";
// import axios from "../../../axios/axios";
import axios, { CancelTokenSource } from "axios";
import LoadingStyle from "../../loadingStyle/LoadingStyle";
import MemeCard from "../memeCard/MemeCard";

type memedataType = {
  id: string;
  imgPath: string;
  videoPath: string;
  imgSize: string;
  title: string;
};

const MainContainer = () => {
  const [memedata, setmemedata] = useState<memedataType[]>([]);
  const [loadmoreData, setloadmoreData] = useState<memedataType[]>([]);
  const [loadMore, setloadMore] = useState(false);
  const [index, setindex] = useState(0);
  const [isLoading, setisLoading] = useState(false);

  const getMemeData = async (cancelToken: CancelTokenSource) => {
    await axios
      .get("https://play-pause-api.vercel.app/api/meme/", {
        cancelToken: cancelToken.token,
      })
      .then((res) => {
        setmemedata(res.data.memes);
        console.log(res.data.meme);
        setloadmoreData(res.data.memes.slice(0, 10));
      })
      .catch((err) => {
        if (axios.isCancel(err)) {
          console.log("canclled");
        }
      });
    setTimeout(() => {
      setisLoading(false);
    }, 4200);
  };

  useEffect(() => {
    const cancelToken = axios.CancelToken.source();
    setisLoading(true);
    getMemeData(cancelToken);
    return () => {
      cancelToken.cancel();
    };
  }, []);

  const fetchmoredata = () => {
    if (loadmoreData.length >= memedata.length) {
      return;
    }

    let newitems: memedataType[] = [];
    let i = index + 1;
    const n = index + 5;
    for (i; i <= n; i++) {
      newitems.push(memedata[i]);
      setindex(i);
    }
    // console.log(index);
    setloadmoreData([...loadmoreData, ...newitems]);
    setTimeout(() => {
      setloadMore(false);
    }, 900);
  };

  useEffect(() => {
    fetchmoredata();
  }, [loadMore]);

  const onScroll = () => {
    const scrollTop = document.documentElement.scrollTop;
    const scrollHeight = document.documentElement.scrollHeight;
    const clientHeight = document.documentElement.clientHeight;

    if (scrollTop + clientHeight >= scrollHeight) {
      setloadMore(true);
      fetchmoredata();
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (isLoading) {
    return <LoadingStyle />;
  }
  if (!memedata) {
    return <p>No Data yet</p>;
  }

  // console.log(memedata.length);
  // console.log(index);
  // console.log(loadmoreData);

  return (
    <>
      <div className="m-0 p-0 font-semibold text-3xl text-white pb-4 my-4 border-b-4 border-[red] uppercase w-[90%] max-w-[1338px]  mx-auto">
        Enjoy your time here
      </div>
      <div className="h-auto grid mt-8 justify-center flex-1 bg-[black] max-w-[1500px] mx-auto memeContainer">
        {memedata.slice(0, memedata.length).map((meme, index) => (
          <MemeCard
            key={index}
            id={meme.id}
            imgPath={meme.imgPath}
            imgSize={meme.imgSize}
            title={meme.title}
            videoPath={meme.videoPath}
          />
        ))}
      </div>
    </>
  );
};

export default MainContainer;
