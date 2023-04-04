import React from "react";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";

import { Rating } from "@mui/material";
import { red } from "@mui/material/colors";

import { GiTomato } from "react-icons/gi";

import LoadingStyle from "../../../components/loadingStyle/LoadingStyle";
import SimilarCategory from "../../../components/Movie/Cards/similarCategoryCard/SimilarCategory";
import Header from "../../../components/bottomBar/BottomBar";
import Topbar from "../../../components/topbar/Topbar";

import { useSession } from "next-auth/react";

type moviedataType = {
  studio: string;
  country: string;
  status: string;
  ytlink: string;
  id: string;
  title: string;
  description: string;
  poster: string;
  imdb_Rating: number;
  rotten_Rating: number;
  release_date: string;
  backdrop: string;
  runtime: string;
  language: string;
  genre: [];
  popularity: string;
  casts: [
    {
      characterName: string;
      dp: string;
      name: string;
    }
  ];
  adult: boolean;
};

const index = () => {
  const router = useRouter();
  const { seriesid } = router.query;
  const { data, status } = useSession();

  const [moviedata, setmoviedata] = useState<moviedataType>();
  const [isLoading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;
    if (router.isReady) {
      setLoading(true);
      fetch(`https://play-pause-api.vercel.app/api/watch/${seriesid}`, {
        signal,
      })
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          setmoviedata(data.movie);
          console.log(data.movie);
          setLoading(false);
        })
        .catch((err) => {
          if (err.name === "AbortError") {
          }
        });
    }

    return () => {
      controller.abort();
    };
  }, [router.isReady]);

  if (isLoading) {
    return <LoadingStyle />;
  }

  if (!moviedata) {
    return <p>No Data yet</p>;
  }

  return (
    <>
      {/* <Header /> */}
      <div
        className="banner"
        style={{ backgroundImage: `url(${moviedata.backdrop})` }}
      ></div>

      <div className=" main-container px-4 bg-[black] ">
        <div className="movie-content">
          <div className="movie-content__poster">
            <div
              className="movie-content__poster__img"
              style={{ backgroundImage: `url(${moviedata.poster})` }}
            ></div>
          </div>
          <div className="movie-content__info ">
            <h1 className="detail-title text-[red] font-semibold text-6xl uppercase">
              {moviedata.title}
            </h1>
            <div className="genres">
              {moviedata.genre.slice(0, 3).map((item) => {
                return (
                  <span className="genres__item text-[#aaa] font-semibold">
                    {item}
                  </span>
                );
              })}
            </div>
            <p className="detail-overview text-[#aaa] text-lg">
              {moviedata.description}
            </p>
            <div className="w-full lg:w-3/4">
              <div className="flex w-full md:w-3/4">
                <div className="text-[#dad8d8] text-lg font-semibold w-full flex justify-between items-center">
                  {"Rating : "}
                  <Rating defaultValue={4} max={10} precision={0.5} />
                </div>
              </div>
              <div className="flex w-full md:w-3/4  text-[#dad8d8] text-lg font-semibold">
                <div className="w-full  flex justify-between items-center">
                  IMDB :
                  <div>
                    <Rating
                      max={10}
                      precision={0.1}
                      value={moviedata.imdb_Rating}
                      readOnly={true}
                    />
                    {/* {moviedata.imdb_Rating} */}
                  </div>
                </div>
              </div>
              <div className="flex  w-full md:w-3/4 text-[#dad8d8] text-lg font-semibold">
                <h3 className="w-full flex justify-between items-center">
                  Rotten Tomato :
                  <div>
                    <Rating
                      max={10}
                      precision={0.5}
                      value={moviedata.rotten_Rating / 10}
                      readOnly={true}
                      icon={<GiTomato />}
                      sx={{ color: red[500] }}
                    />
                    {/* {moviedata.rotten_Rating}
                    {"%"} */}
                  </div>
                </h3>
              </div>
              <div className="w-full md:w-3/4 flex text-[#dad8d8] text-lg font-semibold">
                <div className="w-full pr-2 flex justify-between items-center">
                  <div>Release Date :</div>
                  {moviedata.release_date}
                </div>
              </div>
              <div className="w-full md:w-3/4 flex text-[#dad8d8] text-lg font-semibold">
                <div className="w-full pr-2 flex justify-between items-center">
                  <div>Language :</div>
                  {moviedata.language}
                </div>
              </div>
              <div className="w-full md:w-3/4 flex text-[#dad8d8] text-lg font-semibold">
                <div className="w-full pr-2 flex justify-between items-center">
                  <div>Runtime :</div>
                  {moviedata.runtime}
                  {" MIN"}
                </div>
              </div>
              <div className="w-full md:w-3/4 flex text-[#dad8d8] text-lg font-semibold">
                <div className="w-full pr-2 flex justify-between items-center">
                  <div>Studio :</div>
                  {moviedata.studio}
                </div>
              </div>
              <div className="w-full md:w-3/4 flex text-[#dad8d8] text-lg font-semibold">
                <div className="w-full pr-2 flex justify-between items-center">
                  <div>Country :</div>
                  {moviedata.country}
                </div>
              </div>
              <div className="w-full md:w-3/4 flex text-[#dad8d8] text-lg font-semibold">
                <div className="w-full pr-2 flex justify-between items-center">
                  <div>Status :</div>
                  {moviedata.status}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="main_cast_container mb-3 md:mx-[5%]">
          <div className="cast mb-3 cast-container px-[1rem] md:px-[2rem]">
            <div className="section__header">
              <h2 className=" tracking-normal border-b-4 border-[red] font-semibold text-3xl text-white block pb-[10px] mb-[20px]">
                CASTS
              </h2>
            </div>
            <div className="casts bg-[black]">
              {moviedata.casts.map((cast, i) => {
                return (
                  <div key={i} className="casts__item">
                    <div
                      className="casts__item__img rounded-[20px]"
                      style={{ backgroundImage: `url(${cast.dp})` }}
                    ></div>
                    <p className="casts__item__name">{cast.name}</p>
                    <p className="casts__item__name font-semibold">
                      as {cast.characterName}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
      <div className="test3 bg-[black]">
        <div className="main-container bg-[black] max-w-[1740px] mx-auto">
          <div className="sections mb-3 ">
            <h1 className=" tracking-normal border-b-4 border-[red] font-semibold text-3xl text-white block pb-[10px] mb-[20px] mx-[5%]">
              YOUTUBE TRAILER
            </h1>
            {/* <div className="video-responsive overflow-hidden relative h-0 pb-[56.25%] flex justify-center items-center h-14 bg-[black]">
              <iframe
                width="853"
                height="480"
                src={`https://www.youtube.com/embed/aWzlQ2N6qqg`}
                frameBorder="0"
                allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                title="Embedded youtube"
                className="top-10 h-[80%] w-5/6 absolute"
              />
            </div> */}

            <div className="relative w-[100%] pb-[56.25%] h-[0px]">
              <iframe
                className="absolute top-[0px] left-[5%] w-[90%] h-[80%]"
                width="800"
                height="642"
                src={`https://www.youtube.com/embed/${moviedata.ytlink}`}
                title={`${moviedata.title}`}
                allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                frameBorder="0"
              ></iframe>
            </div>
          </div>
          {/* {!data && ( */}
          <div className="mb-[5%]">
            <h1 className=" tracking-normal border-b-4 border-[red] font-semibold text-3xl text-white block pb-[10px] mb-[20px] mx-[5%]">
              WATCH MOVIE
            </h1>
            <div className=" mb-3 mx-[5%] ">
              <div className="relative w-[100%] pb-[56.25%] h-[0px] ">
                <video
                  // src={`http://localhost:5000/${moviedata.moviePath}`}
                  // src={`http://localhost:5000/movies/1670752346987-ved.mp4`}
                  src="https://dl.streamcloud.club/files/yts/720p/6393e826a573603799b4788b.mp4"
                  controls
                  className="absolute top-[0px] left-[0px] w-[100%] h-[100%] "
                  poster={moviedata.backdrop}
                />
              </div>
            </div>
          </div>
          {/* )} */}

          <div className="section mb-3">
            <div className="section__header mb-2">
              <h2 className=" tracking-normal border-b-4 border-[red] font-semibold text-3xl text-white block pb-[10px] mb-[20px] mx-[5%]">
                SIMILAR CATEGORY
              </h2>
              <SimilarCategory makereverse={true} />
            </div>
            <h1 className=" tracking-normal border-b-4 border-[red] font-semibold text-3xl text-white block pb-[10px] mb-[20px] mx-[5%]">
              TOP CHOICE
            </h1>
            <SimilarCategory makereverse={false} />
          </div>
        </div>
      </div>
    </>
  );
};

export default index;
