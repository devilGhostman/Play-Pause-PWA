import React, { useState, useEffect, useRef } from "react";

import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import {
  ImVolumeHigh,
  ImVolumeMedium,
  ImVolumeLow,
  ImVolumeMute2,
  ImPlay3,
  ImPause2,
  ImBackward2,
  ImForward3,
  ImPrevious2,
  ImNext2,
} from "react-icons/im";
import { FaRandom } from "react-icons/fa";
import { ImLoop2 } from "react-icons/im";
import { MdHdrAuto } from "react-icons/md";

import { styled, Typography, Slider, Paper, Stack, Box } from "@mui/material";

import axios from "../../../axios/axios";

import SongCard from "../SongCard/SongCard";
import LoadingStyle from "../../loadingStyle/LoadingStyle";

// type songdataType = {
//   id: string;
//   title: string;
//   artist: string;
//   poster: string;
//   songPath2: string;
// songPath: string;
//   songType: string;
// };

const Div = styled("div")(({ theme }) => ({
  backgroundColor: "black",
  height: "25vh",
  width: "100vw",
  paddingTop: theme.spacing(6),
}));

const CustomPaper = styled(Paper)(({ theme }) => ({
  backgroundColor: "#2b2e30",
  marginLeft: theme.spacing(3),
  marginRight: theme.spacing(3),
  padding: theme.spacing(2),
}));

const PSlider = styled(Slider)(({ theme, ...props }) => ({
  color: "#960d0d",
  height: props.makeBold ? 10 : 4,
  "&:hover": {
    cursor: props.point ? "auto" : "pointer",
  },
  "& .MuiSlider-thumb": {
    width: "13px",
    height: "13px",
    display: props.thumbless ? "none" : "block",
  },
}));

const MainContainer = () => {
  const audioPlayer = useRef();
  const seekWidthRef = useRef();

  const [songdata, setsongdata] = useState([]);
  const [isLoading, setLoading] = useState(false);

  const [filteredData, setfilteredData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setitemsPerPage] = useState(6);

  const [index, setIndex] = useState(0);
  const [currentSong, setcurrentSong] = useState(
    "songs/1678730549892-The Weeknd - Blinding Lights.mp3"
  );

  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(30);
  const [mute, setMute] = useState(false);
  const [elapsed, setElapsed] = useState(0);
  const [duration, setDuration] = useState(0);
  const [loop, setloop] = useState(false);
  const [isloopActive, setisloopActive] = useState(false);
  const [autoplay, setautoPlay] = useState(false);
  const [isActiveautoplay, setisActiveautoplay] = useState(false);

  const getSongData = async () => {
    const res = await axios.get("/music/");
    setsongdata(res.data.musics);
    setfilteredData(res.data.musics);
    setTimeout(() => {
      setLoading(false);
    }, 3000);
  };
  useEffect(() => {
    setLoading(true);
    getSongData();
  }, []);

  const firstSong = songdata[0];
  useEffect(() => {
    setcurrentSong(firstSong?.songPath22);
  }, [firstSong]);

  useEffect(() => {
    if (audioPlayer) {
      audioPlayer.current.volume = volume / 100;
    }

    if (isPlaying) {
      setInterval(() => {
        const _duration = Math.floor(audioPlayer?.current?.duration);
        const _elapsed = Math.floor(audioPlayer?.current?.currentTime);

        setDuration(_duration);
        setElapsed(_elapsed);
      }, 100);
    }
  }, [volume, isPlaying]);

  const formatTime = (time) => {
    if (time && !isNaN(time)) {
      const minutes =
        Math.floor(time / 60) < 10
          ? `0${Math.floor(time / 60)}`
          : Math.floor(time / 60);
      const seconds =
        Math.floor(time % 60) < 10
          ? `0${Math.floor(time % 60)}`
          : Math.floor(time % 60);

      return `${minutes}:${seconds}`;
    }
    return "00:00";
  };

  const togglePlay = () => {
    if (!isPlaying) {
      audioPlayer.current.play();
    } else {
      audioPlayer.current.pause();
    }
    setIsPlaying((prev) => !prev);
  };

  const togglePause = () => {
    if (isPlaying) {
      audioPlayer.current.pause();
    }
    setIsPlaying((prev) => !prev);
  };

  const toggleForward = () => {
    audioPlayer.current.currentTime += 10;
  };

  const toggleBackward = () => {
    audioPlayer.current.currentTime -= 10;
  };

  const toggleNextSong = () => {
    if (index >= songdata.length - 1) {
      setIndex(0);
      setcurrentSong(songdata[0]?.songPath2);
    } else {
      setIndex((prev) => prev + 1);
      setcurrentSong(songdata[index + 1]?.songPath2);
    }
    setIsPlaying(true);
  };

  const togglePrevSong = () => {
    if (index <= 0) {
      setIndex(songdata.length - 1);
      setcurrentSong(songdata[songdata.length - 1]?.songPath2);
    } else {
      setIndex((prev) => prev - 1);
      setcurrentSong(songdata[index - 1]?.songPath2);
    }
    setIsPlaying(true);
  };

  const VolumeBtns = () => {
    return mute ? (
      <ImVolumeMute2
        className="text-[white] hover:text-[red] text-[24px]"
        onClick={() => setMute(!mute)}
      />
    ) : volume <= 20 ? (
      <ImVolumeLow
        className="text-[white] hover:text-[red] text-[24px]"
        onClick={() => setMute(!mute)}
      />
    ) : volume <= 75 ? (
      <ImVolumeMedium
        className="text-[white] hover:text-[red] text-[24px]"
        onClick={() => setMute(!mute)}
      />
    ) : (
      <ImVolumeHigh
        className="text-[white] hover:text-[red] text-[24px]"
        onClick={() => setMute(!mute)}
      />
    );
  };

  const toggleloop = () => {
    setloop(!loop);
    setisloopActive(!isloopActive);
  };

  const toggleRandom = () => {
    const rad = songdata[Math.floor(Math.random() * songdata.length)];
    const radIndex = songdata.findIndex((song) => song.id == rad.id);
    setIndex(radIndex);
    setcurrentSong(songdata[radIndex]?.songPath2);
    setIsPlaying(true);
  };

  const getSongById = (songId) => {
    console.log(songId);
    const radIndex = songdata.findIndex((song) => song.id == songId);
    setIndex(radIndex);
    console.log(radIndex);
    setcurrentSong(songdata[radIndex]?.songPath2);
    setautoPlay(true);
    setIsPlaying(true);
  };

  const seekDuration = (e) => {
    const width = seekWidthRef.current.clientWidth;
    const offset = e.nativeEvent.offsetX;

    const divprogress = (offset / width) * 100;
    console.log(divprogress);
    console.log(audioPlayer.current.duration);

    audioPlayer.current.currentTime =
      (divprogress / 100) * audioPlayer.current.duration;
  };

  const toggleAutoPlay = () => {
    if (isPlaying == false) {
      if (autoplay == false) {
        setautoPlay(true);
        setisActiveautoplay(true);
        setIsPlaying(true);
      } else {
        setautoPlay(false);
        setisActiveautoplay(false);
        setIsPlaying(true);
      }
    }

    if (isPlaying == true) {
      setautoPlay(!autoplay);
      autoplay ? setisActiveautoplay(false) : setisActiveautoplay(true);
    }
    console.log(autoplay);
  };

  const maxPageNumberLimit = Math.ceil(filteredData.length / itemsPerPage);
  const lastitemIndex = currentPage * itemsPerPage;
  const firstitemIndex = lastitemIndex - itemsPerPage;
  let currentitems = songdata.slice(firstitemIndex, lastitemIndex);
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

  const onprevClick = () => {
    if (currentPage == 1) {
      setCurrentPage(currentPage);
    } else {
      setCurrentPage(currentPage - 1);
    }
  };

  const listall = () => {
    setfilteredData(songdata);
    setCurrentPage(1);
  };

  const listhindisong = () => {
    setfilteredData(songdata.filter((song) => song.songType == "Hindi"));
    setCurrentPage(1);
  };

  const listenglishsong = () => {
    setfilteredData(songdata.filter((song) => song.songType == "English"));
    setCurrentPage(1);
  };

  if (isLoading) {
    return <LoadingStyle />;
  }

  if (!songdata) {
    return <p>No Data yet</p>;
  }

  if (!filteredData) {
    return <p>No Data yet</p>;
  }

  return (
    <>
      <div className=" bg-black w-[90%] max-w-[1338px]  mx-auto">
        <div className="flex  md:flex-row flex-col bg-black lg:w-[100%] md:w-full mx-auto mt-5 max-w-7xl ">
          <aside className="main flex-grow  px-[10px] min-w-[unset]">
            <section className="flex flex-col">
              <div className="flex justify-between md:items-center border-b-4 border-[red] pb-2 mb-4 flex-col sm:flex-row">
                <div className="m-0 p-0 font-semibold text-3xl text-white block">
                  COLLECTIONS
                </div>
                <div className="flex items-centre text-1xl w-full justify-between sm:justify-end ">
                  <span className="space-x-3">
                    <span className="tab" onClick={listall}>
                      All
                    </span>
                    <span className="tab" onClick={listhindisong}>
                      Hindi Song
                    </span>
                    <span className="tab" onClick={listenglishsong}>
                      English Song
                    </span>
                  </span>
                  <span className="flex space-x-2">
                    <span className="tab">
                      <IoIosArrowBack
                        className="text-[23px] self-center"
                        onClick={onprevClick}
                      />
                    </span>
                    <span className="tab">
                      <IoIosArrowForward
                        className="text-[23px] self-center"
                        onClick={onnextClick}
                      />
                    </span>
                  </span>
                </div>
              </div>

              <div className="space-b-4  w-[auto] grid  md:grid-cols-3 sm:grid-cols-3 grid-cols-2 grid-flow-row gap-1 md:gap-3 lg:pb-[7rem]">
                {currentitems.map((song) => {
                  const { id, title, artist, poster, songPath, songPath2 } =
                    song;
                  return (
                    <SongCard
                      onclick={getSongById}
                      setPause={togglePause}
                      id={id}
                      title={title}
                      artist={artist}
                      poster={poster}
                      songPath={songPath}
                      songPath2={songPath2}
                      key={id}
                    />
                  );
                })}
              </div>
            </section>
          </aside>
          <aside>
            <div className="mx-[30px] mt-[100px] hidden lg:block ">
              <div
                className="xl:h-[500px] xl:w-[400px] lg:h-[450px] lg:w-[350px] bg-[#161721] rounded-[20px] "
                // style={{ backgroundImage: `url(${songdata[index]?.poster})` }}
              >
                <div className="xl:w-[300px] xl:h-[330px] lg:h-[280px] lg:w-[280px] relative top-[-50px] xl:left-[50px] lg:left-[40px]  ">
                  <img
                    src={songdata[index]?.poster}
                    alt=""
                    className="h-[100%] w-[100%] rounded-[20px] object-cover posterimg"
                  />
                </div>
                <div className="relative top-[-15px]">
                  <h2 className="text-[30px] text-center text-[red] font-semibold">
                    {songdata[index]?.title}
                  </h2>
                  <h3 className="text-[20px] text-center font-normal mt-1">
                    {songdata[index]?.artist}
                  </h3>
                  <div>
                    <Stack
                      spacing={1}
                      direction="row"
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        margin: "0px 15px 0px 15px",
                      }}
                    >
                      <Typography sx={{ color: "white" }}>
                        {formatTime(elapsed)}
                      </Typography>
                      <PSlider value={elapsed} max={duration} thumbless />
                      <Typography sx={{ color: "white" }}>
                        {formatTime(duration - elapsed)}
                      </Typography>
                    </Stack>
                    <div className="flex justify-evenly mx-[10px]">
                      <Stack
                        direction="row"
                        spacing={1}
                        sx={{
                          display: "flex",
                          justifyContent: "flex-start",
                          width: "25%",
                          alignItems: "center",
                        }}
                      >
                        <VolumeBtns />

                        <PSlider
                          min={0}
                          max={100}
                          value={volume}
                          onChange={(e, v) => setVolume(v)}
                        />
                      </Stack>
                      <Stack
                        direction="row"
                        spacing={1}
                        sx={{
                          display: "flex",
                          width: "40%",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <ImPrevious2
                          className="text-[white] hover:text-[red] hover:cursor-pointer"
                          onClick={togglePrevSong}
                        />
                        <ImBackward2
                          className="text-[white] hover:text-[red] hover:cursor-pointer"
                          onClick={toggleBackward}
                        />

                        {!isPlaying ? (
                          <ImPlay3
                            fontSize={"large"}
                            className="text-[white] hover:text-[red] hover:cursor-pointer"
                            onClick={togglePlay}
                          />
                        ) : (
                          <ImPause2
                            fontSize={"large"}
                            className="text-[white] hover:text-[red] hover:cursor-pointer"
                            onClick={togglePlay}
                          />
                        )}

                        <ImForward3
                          className="text-[white] hover:text-[red] hover:cursor-pointer"
                          onClick={toggleForward}
                        />
                        <ImNext2
                          onClick={toggleNextSong}
                          className="text-[white] hover:text-[red] hover:cursor-pointer"
                        />
                      </Stack>
                      <Stack
                        sx={{
                          display: "flex",
                          justifyContent: "flex-end",
                          alignItems: "center",
                          flexDirection: "row",
                          width: "20%",
                        }}
                      >
                        <ImLoop2
                          onClick={toggleloop}
                          className={
                            isloopActive
                              ? "text-[red] mx-1 hover:cursor-pointer"
                              : "text-[white] hover:text-[red] mx-1 hover:cursor-pointer"
                          }
                        />
                        <FaRandom
                          onClick={toggleRandom}
                          className={
                            "text-[white] hover:text-[red] mx-1 hover:cursor-pointer"
                          }
                        />
                        <MdHdrAuto
                          onClick={toggleAutoPlay}
                          className={
                            isActiveautoplay
                              ? "text-[red] text-[20px] mx-0 hover:cursor-pointer"
                              : "text-[white] text-[20px] hover:text-[red] mx-1 hover:cursor-pointer"
                          }
                        />
                      </Stack>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </aside>
        </div>

        <div className="lg:hidden xl:hidden w-full pb-6 mb-16">
          <div className="mt-6 w-full p-3 bg-[#171822]">
            <audio
              // src={`http://localhost:5000/${currentSong}`}
              src={`${currentSong}`}
              ref={audioPlayer}
              muted={mute}
              autoPlay={autoplay}
              loop={loop}
              onEnded={toggleNextSong}
            />
            <div>
              <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                <Stack
                  direction="row"
                  spacing={1}
                  sx={{
                    display: "flex",
                    justifyContent: "flex-start",
                    width: "40%",
                    alignItems: "center",
                  }}
                >
                  <VolumeBtns />

                  <PSlider
                    min={0}
                    max={100}
                    value={volume}
                    onChange={(e, v) => setVolume(v)}
                  />
                </Stack>

                <Stack
                  direction="row"
                  spacing={1}
                  sx={{
                    display: "flex",
                    width: "40%",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <ImPrevious2
                    className="text-[white] hover:text-[red] hover:cursor-pointer"
                    onClick={togglePrevSong}
                  />
                  <ImBackward2
                    className="text-[white] hover:text-[red] hover:cursor-pointer"
                    onClick={toggleBackward}
                  />

                  {!isPlaying ? (
                    <ImPlay3
                      fontSize={"large"}
                      className="text-[white] hover:text-[red] hover:cursor-pointer"
                      onClick={togglePlay}
                    />
                  ) : (
                    <ImPause2
                      fontSize={"large"}
                      className="text-[white] hover:text-[red] hover:cursor-pointer"
                      onClick={togglePlay}
                    />
                  )}

                  <ImForward3
                    className="text-[white] hover:text-[red] hover:cursor-pointer"
                    onClick={toggleForward}
                  />
                  <ImNext2
                    onClick={toggleNextSong}
                    className="text-[white] hover:text-[red] hover:cursor-pointer"
                  />
                </Stack>

                <Stack
                  sx={{
                    display: "flex",
                    justifyContent: "flex-end",
                    alignItems: "center",
                    flexDirection: "row",
                    width: "40%",
                  }}
                >
                  <ImLoop2
                    onClick={toggleloop}
                    className={
                      isloopActive
                        ? "text-[red] text-[18px] mx-4 hover:cursor-pointer"
                        : "text-[white] text-[18px] hover:text-[red] mx-4 hover:cursor-pointer"
                    }
                  />
                  <FaRandom
                    onClick={toggleRandom}
                    className={
                      "text-[white] text-[18px] hover:text-[red] mx-1 hover:cursor-pointer"
                    }
                  />
                  <MdHdrAuto
                    onClick={toggleAutoPlay}
                    className={
                      isActiveautoplay
                        ? "text-[red] text-[18px] mx-4 hover:cursor-pointer"
                        : "text-[white] text-[18px] hover:text-[red] mx-4 hover:cursor-pointer"
                    }
                  />
                </Stack>
              </Box>
              <Stack
                spacing={1}
                direction="row"
                sx={{
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <Typography sx={{ color: "white" }}>
                  {formatTime(elapsed)}
                </Typography>
                <PSlider
                  value={elapsed}
                  max={duration}
                  onClick={seekDuration}
                  ref={seekWidthRef}
                  thumbless
                  makeBold
                />
                <Typography sx={{ color: "white" }}>
                  {formatTime(duration - elapsed)}
                </Typography>
              </Stack>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MainContainer;
