import { useState, useEffect } from "react";

import axios from "../../../../axios/axios";

import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import Catalogcard from "./CollectionCard";
import PopuCard from "../popularCard/PopuCard";
import LoadingStyle from "../../../loadingStyle/LoadingStyle";

type moviedataType = {
  id: string;
  title: string;
  description: string;
  poster: string;
  poster2: string;
  imdb_Rating: string;
  release_date: string;
  backdrop: string;
  runtime: string;
  language: string;
  isWebseries: boolean;
  genre: string;
  adult: boolean;
};

const MainContainer = () => {
  const [moviedata, setmoviedata] = useState<moviedataType[]>([]);
  const [isLoading, setisLoading] = useState(false);
  const [filteredData, setfilteredData] = useState<moviedataType[]>([]);

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setitemsPerPage] = useState(12);

  const getMoviesData = async () => {
    const res = await axios.get("/watch/");
    setmoviedata(res.data.movies);
    setfilteredData(res.data.movies);
    setTimeout(() => {
      setisLoading(false);
    }, 3000);
  };
  useEffect(() => {
    setisLoading(true);
    getMoviesData();
  }, []);
  if (isLoading) {
    return <LoadingStyle />;
  }

  if (!moviedata) {
    return <p>No Data yet</p>;
  }

  if (!filteredData) {
    return <p>No Data yet</p>;
  }
  const listall = () => {
    setfilteredData(moviedata);
    setCurrentPage(1);
  };

  const listmovies = () => {
    setfilteredData(moviedata.filter((movie) => movie.isWebseries === false));
    setCurrentPage(1);
  };

  const listwebseries = () => {
    setfilteredData(moviedata.filter((movie) => movie.isWebseries === true));
    setCurrentPage(1);
  };

  const maxPageNumberLimit = Math.ceil(filteredData.length / itemsPerPage);
  const lastitemIndex = currentPage * itemsPerPage;
  const firstitemIndex = lastitemIndex - itemsPerPage;
  let currentitems = moviedata.slice(firstitemIndex, lastitemIndex);
  if (filteredData) {
    currentitems = filteredData.slice(firstitemIndex, lastitemIndex);
  }

  const onnextClick = () => {
    if (currentPage + 1 > maxPageNumberLimit) {
      setCurrentPage(currentPage);
    } else {
      setCurrentPage(currentPage + 1);
    }
  };

  const onprevclick = () => {
    if (currentPage == 1) {
      setCurrentPage(currentPage);
    } else {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div className="flex md:mx-[50px]  md:flex-row flex-col bg-black">
      <aside className="main flex-grow px-[10px] min-w-[unset]">
        <section className="flex flex-col">
          <div className="flex justify-between items-start md:items-center flex-col sm:flex-row pb-4 mb-4 w-full border-b-4 border-[red]">
            <div className="m-0 p-0 font-semibold text-3xl text-white ">
              COLLECTIONS
            </div>
            <div className="flex items-centre text-1xl w-full justify-between sm:justify-end ">
              <span className="space-x-3">
                <span className="tab  " onClick={listall}>
                  All
                </span>
                <span className="tab " onClick={listmovies}>
                  Movies
                </span>
                <span className="tab " onClick={listwebseries}>
                  WebSeries
                </span>
              </span>
              <span className="flex space-x-2 ">
                <span className="tab ">
                  <IoIosArrowBack
                    className="text-[23px] self-center"
                    onClick={onprevclick}
                  />
                </span>
                <span className="tab ">
                  <IoIosArrowForward
                    className="text-[23px] self-center"
                    onClick={onnextClick}
                  />
                </span>
              </span>
            </div>
          </div>
          <div className="flex flex-wrap w-[full] justify-center items-center md:justify-start">
            {currentitems.map((movie) => (
              <Catalogcard
                id={movie.id}
                img1={movie.poster}
                img2={movie.poster2}
                title={movie.title}
                release_date={movie.release_date}
                rating={movie.imdb_Rating}
                description={movie.description}
                key={movie.id}
              />
            ))}
          </div>
        </section>
      </aside>
      <aside className="sidebar min-w-[120px] flex-shrink-0 px-[20px]">
        <section className="">
          <div className="flex justify-between items-center ">
            <div className="m-0 p-0 font-semibold text-3xl text-white pb-4 mb-4 w-full border-b-4 border-[red]">
              FEATURED
            </div>
          </div>
          <div>
            <div className="table-content">
              <div className="topveiw">
                <PopuCard />
              </div>
            </div>
          </div>
        </section>
      </aside>
    </div>
  );
};

export default MainContainer;
