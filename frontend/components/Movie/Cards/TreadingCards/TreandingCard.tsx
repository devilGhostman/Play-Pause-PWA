import { useEffect, useRef, useState } from "react";

import { IoMdArrowDropleft, IoMdArrowDropright } from "react-icons/io";

import Tcard from "./Tcard";

import axios, { CancelTokenSource } from "axios";

type moviedataType = {
  id: string;
  title: string;
  description: string;
  poster: string;
  imdb_Rating: string;
  release_date: string;
  backdrop: string;
  runtime: string;
  language: string;
  genre: string;
  popularity: string;
  adult: boolean;
};

const TreandingCard = () => {
  const rowRef = useRef<HTMLDivElement>(null);
  const [isMoved, setIsMoved] = useState(false);

  const handleClick = (direction: string) => {
    setIsMoved(true);
    if (rowRef.current) {
      const { scrollLeft, clientWidth } = rowRef.current;

      const scrollTo =
        direction === "left"
          ? scrollLeft - clientWidth
          : scrollLeft + clientWidth;
      rowRef.current.scrollTo({ left: scrollTo, behavior: "smooth" });
    }
  };

  const [moviedata, setmoviedata] = useState<moviedataType[]>([]);
  const [isLoading, setLoading] = useState(false);

  const getMoviesData = async (cancelToken: CancelTokenSource) => {
    await axios
      .get("https://play-pause-api.vercel.app/api/watch?popular=true", {
        cancelToken: cancelToken.token,
      })
      .then((res) => {
        setmoviedata(res.data.movies);
      })
      .catch((e) => {
        if (axios.isCancel(e)) {
        }
      });
    setTimeout(() => {}, 2000);
    setLoading(false);
  };
  useEffect(() => {
    const cancelToken = axios.CancelToken.source();
    setLoading(true);
    getMoviesData(cancelToken);

    return () => {
      cancelToken.cancel();
    };
  }, []);
  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (!moviedata) {
    return <p>No Data yet</p>;
  }

  return (
    <div className="w-full bg-[black] mt-[10rem] sm:mt-[4rem] md:mt-0  md:pt-20 lg:pt-4">
      <div className="movie__list ml-auto mr-auto pt-2 pb-6 px-2 bg-black">
        <div>
          <h2 className="tracking-normal border-b-4 border-[red] pb-4 mx-12 font-semibold text-3xl text-white block">
            POPULAR
          </h2>
        </div>
        <div className="list__cards">
          <div className="group relative md:-ml-2 overflow-x-auto">
            <IoMdArrowDropleft
              className={`absolute top-0 bottom-0 left-0 z-40 m-auto h-[100%] w-12 bg-[#000000b1]  cursor-pointer opacity-0 transition hover:text-[red] hover:bg-[#000000d8] group-hover:opacity-100 ${
                !isMoved && "hidden"
              }`}
              onClick={() => handleClick("left")}
            />
            <div
              className="flex items-center space-x-0.5 overflow-x-hidden  md:space-x-2.5 md:p-2 "
              ref={rowRef}
            >
              {moviedata.slice(0, 9).map((movie) => (
                <Tcard
                  key={movie.id}
                  img={movie.poster}
                  rating={movie.imdb_Rating}
                  popularity={movie.popularity}
                  description={movie.description}
                  title={movie.title}
                  runtime={movie.runtime}
                  id={movie.id}
                />
              ))}
            </div>

            <IoMdArrowDropright
              className="absolute top-0 bottom-0 right-0 z-40 m-auto h-[100%] bg-[#000000b1] w-12 cursor-pointer opacity-0  transition hover:text-[red] hover:bg-[#000000d8] group-hover:opacity-100"
              onClick={() => handleClick("right")}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TreandingCard;
