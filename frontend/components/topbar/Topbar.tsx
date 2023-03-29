import { useEffect, useState } from "react";

import { MdOutlineClear } from "react-icons/md";
import { BiSearchAlt } from "react-icons/bi";
import { GiThreeFriends } from "react-icons/gi";
import { FaRandom } from "react-icons/fa";

import axios from "../../axios/axios";
import Link from "next/link";

import LoginSignup from "../loginSignup/LoginSignup";
import { useSession } from "next-auth/react";

import Popover from "@mui/material/Popover";
import Typography from "@mui/material/Typography";
import React from "react";

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

type ranMovieType = {
  id: string;
};

const Topbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [moviedata, setmoviedata] = useState<moviedataType[]>([]);
  const [isLoading, setLoading] = useState(false);
  const [filteredData, setFilteredData] = useState<moviedataType[]>([]);
  const [wordEntered, setWordEntered] = useState("");
  const [ranMovie, setranMovie] = useState<ranMovieType>();

  const [burger_class, setBurgerClass] = useState("burger-bar unclicked");
  const [menu_class, setMenuClass] = useState("menu hidden");
  const [isMenuClicked, setIsMenuClicked] = useState(false);
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(
    null
  );

  const { data: session, status } = useSession();

  const updateMenu = () => {
    if (!isMenuClicked) {
      setBurgerClass("burger-bar clicked");
      setMenuClass("menu rounded-b-3xl visible");
    } else {
      setBurgerClass("burger-bar unclicked");
      setMenuClass("menu hidden ");
    }
    setIsMenuClicked(!isMenuClicked);
  };

  const getMoviesData = async () => {
    const res = await axios.get("/watch/");
    setmoviedata(res.data.movies);
    setLoading(false);
  };
  useEffect(() => {
    setLoading(true);
    getMoviesData();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    setranMovie(moviedata[Math.floor(Math.random() * moviedata.length)]);
  }, [moviedata]);

  const randomMovie = () => {
    if (moviedata) {
      setranMovie(moviedata[Math.floor(Math.random() * moviedata.length)]);
    }
  };

  const getSearchedData = async (qserach: string) => {
    const res = await axios.get(`/watch?search=${qserach}`);
    setFilteredData(res.data.movies);
  };

  useEffect(() => {
    if (wordEntered === "") {
      setFilteredData([]);
    } else {
      getSearchedData(wordEntered);
    }
  }, [wordEntered]);

  const handleFilter = (event: { target: { value: any } }) => {
    const searchWord = event.target.value;
    setWordEntered(searchWord);
    // const newFilter = moviedata.filter((value) => {
    //   return value.title.toLowerCase().includes(searchWord.toLowerCase());
    // });

    // if (searchWord === "") {
    //   setFilteredData([]);
    // } else {
    //   setFilteredData(newFilter);
    // }
  };

  const clearInput = () => {
    setFilteredData([]);
    setWordEntered("");
  };

  const handleClick = (event: any) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  if (isLoading) {
    return <p>Loading...</p>;
  }
  if (!moviedata) {
    return <p>No Data yet</p>;
  }

  return (
    <header className={`${isScrolled && "bg-[#141414] py-2 h-[80px]"}`}>
      <div className="fixed top-2 items-center space-x-2 ml-4 md:space-x-10 justify-between">
        <img
          src="./logo.gif"
          width={120}
          height={120}
          className="cursor-pointer object-contain"
        />
      </div>

      <div className="fixed right-14 top-4 hidden md:block">
        <div className="flex">
          <div className="search bg-[#141414] md:block border-2 border-[#292828] rounded-[4px] opacity-70 hover:opacity-100 mr-2  inline-block">
            <div className="searchInputs flex justify-center content-center ">
              <input
                type="text"
                placeholder="Search..."
                value={wordEntered}
                onChange={handleFilter}
                className="bg-[#141414]  border-0 h-10 text-lg p-4  focus:outline-none lg:focus:w-[400px] text-[#aaa] rounded-[12px]"
              />
              <div className="searchIcon px-3 self-center">
                {filteredData.length === 0 ? (
                  <BiSearchAlt className="text-3xl  hover:text-[#aaa]" />
                ) : (
                  <MdOutlineClear
                    className="text-3xl hover:cursor-pointer hover:text-[#ff0000]"
                    id="clearBtn"
                    onClick={clearInput}
                  />
                )}
              </div>
            </div>
            {filteredData.length != 0 && (
              <div className="max-h-[85vh] z-[102] overflow-y-hidden">
                {filteredData.slice(0, 15).map((value) => {
                  return (
                    <Link
                      href={{
                        pathname: ROUTE_POST_ID,
                        query: { seriesid: value.id },
                      }}
                    >
                      <div className=" bg-[#1c1c1c] border-t-2 border-[#3b3a3a] px-2 py-1 flex hover:bg-[#111010] ">
                        <div className="max-w-[20%] ">
                          <img
                            src={value.poster}
                            alt=""
                            className="max-w-[50px] max-h-[50px] ml-2"
                          />
                        </div>
                        <p className="text-[#aaa] hover:cursor-pointer hover:text-[#f50e0e] text-[18px] px-2 self-center w-full">
                          {value.title.length > 22
                            ? `${value.title.substring(0, 25)}...`
                            : value.title}
                        </p>
                      </div>
                    </Link>
                  );
                })}
              </div>
            )}
          </div>

          <div className="hidden md:block">
            <div className="flex">
              {status === "authenticated" ? (
                <Link href={"/watchtogether"}>
                  <div className="flex flex-col justify-center items-center cursor-pointer  hover:text-red-500  text-[#aaa]">
                    <GiThreeFriends className="text-2xl " />
                    <h6>Watch Together</h6>
                  </div>
                </Link>
              ) : (
                <>
                  <div
                    className="flex  flex-col justify-center items-center cursor-pointer  hover:text-red-500  text-[#aaa]"
                    onClick={handleClick}
                  >
                    <GiThreeFriends className="text-2xl " />
                    <h6>Watch Together</h6>
                  </div>
                  <Popover
                    id={id}
                    open={open}
                    anchorEl={anchorEl}
                    onClose={handleClose}
                    anchorOrigin={{
                      vertical: "bottom",
                      horizontal: "left",
                    }}
                    sx={{
                      // "&.MuiPopover-root": {
                      //   backgroundColor: "blue",
                      //   border: "1px solid black",
                      // },
                      "&.MuiPopover-paper": {
                        backgroundColor: "blue",
                        color: "blue",
                      },
                    }}
                  >
                    <Typography sx={{ p: 2 }}>Login to use</Typography>
                  </Popover>
                </>
              )}
              {/* <Link href={"/watchtogether"}>
                <div className="flex flex-col justify-center items-center cursor-pointer  hover:text-red-500 text-[#aaa]">
                  <GiThreeFriends className="text-2xl " />
                  <h6>Watch Together</h6>
                </div>
              </Link> */}
              <Link
                href={{
                  pathname: ROUTE_POST_ID,
                  query: {
                    seriesid: ranMovie?.id || "63386d67ebd08e7b5eb70c0b",
                  },
                }}
              >
                <div
                  onClick={randomMovie}
                  className="flex flex-col justify-center items-center ml-2 cursor-pointer  hover:text-red-500 text-[#aaa]"
                >
                  <FaRandom className="text-2xl  " />
                  <h6>Random</h6>
                </div>
              </Link>
              <div className="flex flex-col justify-center items-center ml-2 cursor-pointer  hover:text-red-500 text-[#aaa]">
                <LoginSignup />
                {status === "authenticated" ? (
                  <h6 className="text-red-500">
                    {session.user?.name || session.user?.email}
                  </h6>
                ) : (
                  <h6>Login</h6>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-end h-14 p-2 w-full md:hidden ">
        <div
          className="burger-menu cursor-pointer flex flex-col items-start justify-between h-full w-16"
          onClick={updateMenu}
        >
          <div className={burger_class}></div>
          <div className={burger_class}></div>
          <div className={burger_class}></div>
        </div>
        <div className={menu_class}>
          <ul className="flex flex-col justify-center items-center self-center w-full">
            <li className="md:ml-8 md:my-0 my-7 flex justify-center items-center border-b-2 border-[red]">
              <div className="search bg-[#141414] absolute top-[30%] opacity-100  rounded-[4px]   border-2 border-[#292828]">
                <div className="searchInputs flex justify-center content-center">
                  <input
                    type="text"
                    placeholder="Search..."
                    value={wordEntered}
                    onChange={handleFilter}
                    className="bg-[#141414]  border-0 h-10 text-lg p-4  focus:outline-none text-[#aaa] rounded-[12px]"
                  />
                  <div className="searchIcon px-3 self-center">
                    {filteredData.length === 0 ? (
                      <BiSearchAlt className="text-3xl  hover:text-[#aaa]" />
                    ) : (
                      <MdOutlineClear
                        className="text-3xl hover:cursor-pointer hover:text-[#ff0000]"
                        id="clearBtn"
                        onClick={clearInput}
                      />
                    )}
                  </div>
                </div>
                {filteredData.length != 0 && (
                  <div className="dataResult mt-1 max-h-[350px] overflow-hidden overflow-y-auto shadow-md rounded-b-[12px]">
                    {filteredData.slice(0, 15).map((value) => {
                      return (
                        <Link
                          href={{
                            pathname: ROUTE_POST_ID,
                            query: { seriesid: value.id },
                          }}
                        >
                          <div className=" bg-[#1c1c1c] border-t-2 border-[#3b3a3a] px-2 py-1 flex hover:bg-[#111010] ">
                            <div className="max-w-[20%] ">
                              <img
                                src={value.poster}
                                alt=""
                                className="max-w-[50px] max-h-[50px] ml-2"
                              />
                            </div>
                            <p className="text-[#aaa] hover:cursor-pointer hover:text-[#f50e0e] text-[18px] px-2 self-center w-full">
                              {value.title}
                            </p>
                          </div>
                        </Link>
                      );
                    })}
                  </div>
                )}
              </div>
            </li>
            <li className="md:ml-8 text-xl md:my-0 my-7 border-b-2 border-[red] w-[50%] mx-auto flex justify-center items-center">
              <Link href={"/watchtogether"}>
                <div className="flex  justify-center items-center cursor-pointer  hover:text-red-500 text-[#aaa]">
                  <GiThreeFriends className="text-2xl mr-3" />
                  <h6>Watch Together</h6>
                </div>
              </Link>
            </li>
            <li className="md:ml-8 text-xl md:my-0 my-7 border-b-2 border-[red] w-[50%] mx-auto flex justify-center items-center">
              <div className="flex justify-center items-center ml-2 cursor-pointer  hover:text-red-500 text-[#aaa]">
                <FaRandom className="text-2xl mr-3 " />
                <Link
                  href={{
                    pathname: ROUTE_POST_ID,
                    query: { seriesid: moviedata[0]?.id },
                  }}
                >
                  <h6>Random</h6>
                </Link>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </header>
  );
};
export default Topbar;
