import { useState, useEffect } from "react";

import { FaStar } from "react-icons/fa";
import { AiFillEye } from "react-icons/ai";

import axios from "../../../../axios/axios";
import Link from "next/link";

const ROUTE_POST_ID = "watch/[seriesid]";

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

const PopuCard = () => {
  const [moviedata, setmoviedata] = useState<moviedataType[]>([]);
  const [isLoading, setLoading] = useState(false);

  const getMoviesData = async () => {
    const res = await axios.get("/watch?rating=true");
    setmoviedata(res.data.movies);
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  };
  useEffect(() => {
    setLoading(true);
    getMoviesData();
  }, []);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (!moviedata) {
    return <p>No Data yet</p>;
  }

  return (
    <ul className="m-0 p-0 list-none space-y-2">
      {moviedata.slice(0, 10).map((movie, i) => {
        return (
          <Link
            href={{
              pathname: ROUTE_POST_ID,
              query: { seriesid: movie.id },
            }}
          >
            <li
              key={i}
              className="flex items-center md:w-[350px] px-2 bg-[#28282B] border-x-2 border-red-500 cursor-pointer hover:bg-[black] hover:border-[white] group"
            >
              <div className="max-w-[20%] min-w-[12%] text-base pl-1 pr-2">
                <span className="text-[3rem] max-h-full min-w-[20%] items-center flex mb-2 group-hover:text-red-500">
                  {i + 1}
                </span>
              </div>
              <div className="max-w-[20%]">
                <img
                  src={movie.poster}
                  alt=""
                  className="max-w-[50px] max-h-[50px] ml-2"
                />
              </div>
              <div className="flex flex-col w-[95%]  items-start justify-between ml-4">
                <span className="text-[1.3rem] max-w-full group-hover:text-red-500">
                  {movie.title.length > 17
                    ? `${movie.title.substring(0, 20)} ...`
                    : movie.title}
                </span>
                <div className="flex w-[60%] justify-between items-center">
                  <div className="flex justify-center items-center">
                    <span className="ml-1 text-[1rem]">
                      {movie.imdb_Rating}
                    </span>
                    <span className=" ml-1 text-[1rem] pl-1">
                      <FaStar className="text-[yellow]" />
                    </span>
                  </div>
                  <div className="flex justify-center items-center ">
                    <span className=" ml-1 text-[1rem]">
                      {movie.popularity}
                    </span>
                    <span className=" ml-1 text-[1.2rem] pl-1 pr-3">
                      <AiFillEye className="text-[red]" />
                    </span>
                  </div>
                </div>
              </div>
            </li>
          </Link>
        );
      })}
    </ul>
  );
};

export default PopuCard;
