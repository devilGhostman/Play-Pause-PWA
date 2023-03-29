import React from "react";
import { useState, useEffect, useRef } from "react";

import { BsFillPauseFill, BsFillPlayFill } from "react-icons/bs";
import {
  ImVolumeHigh,
  ImVolumeMedium,
  ImVolumeLow,
  ImVolumeMute2,
} from "react-icons/im";

import axios from "../../../axios/axios";

import { styled, Slider, Stack } from "@mui/material";
import { RiHeadphoneFill } from "react-icons/ri";

import LoadingStyle from "../../loadingStyle/LoadingStyle";

const PSlider = styled(Slider)(({ theme, ...props }) => ({
  color: "#960d0d",
  height: 10,
  "&:hover": {
    cursor: props.point ? "auto" : "pointer",
  },
  "& .MuiSlider-thumb": {
    width: "15px",
    height: "15px",
    display: props.thumbless ? "none" : "block",
  },
}));

// type songdataType = {
//   id: string;
//   title: string;
//   artist: string;
//   poster: string;
//   songPath: string;
// };

const Radio = () => {
  const audioPlayer = useRef(null);

  const [songdata, setsongdata] = useState([]);
  const [isLoading, setLoading] = useState(false);

  const [index, setIndex] = useState(0);
  const [currentSong, setcurrentSong] = useState(
    "songs/1668617623592-Kordhell Killers From The Northside.mp3"
  );

  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(30);
  const [mute, setMute] = useState(true);
  const [isActive, setIsActive] = useState(false);

  const getSongData = async () => {
    const res = await axios.get("/music/");
    setsongdata(res.data.musics);
    setTimeout(() => {
      setLoading(false);
    }, 4000);
  };
  useEffect(() => {
    setLoading(true);
    getSongData();
  }, []);

  const firstSong = songdata[0];
  useEffect(() => {
    setcurrentSong(firstSong?.songPath);
  }, [firstSong]);

  useEffect(() => {
    if (audioPlayer.current !== null) {
      audioPlayer.current.volume = volume / 100;
    }
  }, [volume, isPlaying]);

  const togglePlay = () => {
    if (!isPlaying) {
      audioPlayer.current?.play();
    }
    setIsPlaying(true);
    setMute(false);
  };

  const togglePause = () => {
    if (isPlaying) {
      setMute(true);
      setIsPlaying(false);
    }
    // setIsPlaying((prev) => !prev);
  };

  const VolumeBtns = () => {
    return mute ? (
      <ImVolumeMedium
        className="text-[white] hover:text-[red] text-[25px]"
        // onClick={() => setMute(!mute)}
      />
    ) : volume <= 20 ? (
      <ImVolumeLow
        className="text-[white] hover:text-[red] text-[25px]"
        onClick={() => setMute(!mute)}
      />
    ) : volume <= 75 ? (
      <ImVolumeMedium
        className="text-[white] hover:text-[red] text-[25px]"
        // onClick={() => setMute(!mute)}
      />
    ) : (
      <ImVolumeHigh
        className="text-[white] hover:text-[red] text-[25px]"
        // onClick={() => setMute(!mute)}
      />
    );
  };

  const toggleNextSong = () => {
    if (index >= songdata.length - 1) {
      setIndex(0);
      setcurrentSong(songdata[0]?.songPath);
    } else {
      setIndex((prev) => prev + 1);
      setcurrentSong(songdata[index + 1]?.songPath);
    }
    setIsPlaying(true);
  };

  const handleVolclass = () => {
    setIsActive((current) => !current);
  };

  if (isLoading) {
    return <LoadingStyle />;
  }

  if (!songdata) {
    return <p>No Data yet</p>;
  }
  return (
    // <div className="w-[90%] max-w-[1288px] mx-auto">

    //   <h1 className="tracking-normal border-b-2 border-[red] font-semibold text-3xl text-white block">
    //     RADIO
    //   </h1>
    //   <audio
    //     src={`http://localhost:5000/${currentSong}`}
    //     ref={audioPlayer}
    //     muted={mute}
    //     autoPlay
    //     onEnded={toggleNextSong}
    //   />
    //   <div className="w-[100%] h-[300px] min-h-[250px] mt-4 relative radioBackground playing">
    //     <div className="relative mx-4 mt-4 pt-4 b-[50px] flex flex-row items-center md:justify-around justify-between">
    //       <Stack
    //         direction="row"
    //         spacing={1}
    //         sx={{
    //           display: "flex",
    //           justifyContent: "flex-start",
    //           width: "20%",
    //           alignItems: "center",
    //         }}
    //       >
    //         <VolumeBtns />

    //         <PSlider
    //           min={0}
    //           max={100}
    //           value={volume}
    //           onChange={(e, v) => setVolume(v)}
    //         />
    //       </Stack>
    //       <Stack
    //         sx={{
    //           display: "flex",
    //           justifyContent: "flex-end",
    //           alignItems: "center",
    //           flexDirection: "row",
    //           width: "40%",
    //         }}
    //       >
    //         <h1 className="font-semibold md:text-3xl text-[2xl] text-white block">
    //           {songdata[index]?.title}
    //         </h1>
    //       </Stack>
    //     </div>
    //     <div className="relative w-full mx-auto top-[25%] text-center flex justify-center content-center cursor-pointer z-5 songBackground">
    //       {isPlaying ? (
    //         <>
    //           <BsFillPauseFill
    //             className="text-[red] text-6xl"
    //             onClick={togglePause}
    //           />
    //         </>
    //       ) : (
    //         <BsFillPlayFill
    //           className="text-[red] text-6xl ml-[1px]"
    //           onClick={togglePlay}
    //         />
    //       )}
    //     </div>
    //     <div className="relative w-full z-[-1] top-[-33%] mx-auto flex justify-center content-center">
    //       {isPlaying && (
    //         <>
    //           <img
    //             src="./songplaying.gif"
    //             width={300}
    //             height={300}
    //             className="cursor-pointer object-contain"
    //           />
    //         </>
    //       )}
    //     </div>
    //   </div>
    // </div>
    <>
      <div className="m-0 p-0 font-semibold text-3xl text-white pb-4 mb-4 border-b-4 border-[red] uppercase w-[90%] max-w-[1338px]  mx-auto">
        Radio
      </div>
      <div className="relative w-full bg-slate-300 h-[500px] md:h-[700px] overflow-hidden mb-2">
        <audio
          src={`http://localhost:5000/${currentSong}`}
          ref={audioPlayer}
          muted={mute}
          autoPlay
          onEnded={toggleNextSong}
        />
        <img
          className="absolute z-0 block w-full h-full object-cover left-0 top-0"
          // src={songdata[index]?.poster}
          src="https://data.whicdn.com/images/340880407/original.gif"
        />
        <div className="z-[1] w-full h-full relative t bg-[rgba(0,0,0,0.5)] px-3 md:px-[30px] lg:px-[120px]">
          <div className="flex justify-center items-center w-full h-full">
            <div className="w-[220px] h-[200px] mr-6 hidden md:flex justify-center items-center">
              <img
                className="object-cover w-full h-full posterimg"
                src={songdata[index]?.poster}
              />
            </div>

            <div className="flex flex-col justify-center items-center w-full h-full">
              <div className="flex justify-between items-center w-full">
                <div className="w-[64px] h-[64px] bg-[#1d1f2b] text-[white] flex justify-center items-center cursor-pointer">
                  {isPlaying ? (
                    <>
                      <BsFillPauseFill
                        className="text-[red] text-5xl"
                        onClick={togglePause}
                      />
                    </>
                  ) : (
                    <BsFillPlayFill
                      className="text-[red] text-6xl ml-[1px]"
                      onClick={togglePlay}
                    />
                  )}
                </div>
                <div className="flex flex-1 flex-col items-start w-[364px] h-[64px] bg-[#1d1f2b] text-[white] mx-3 px-4 py-2 md:py-0">
                  <h1 className="font-semibold md:text-xl text-[14px] text-[red] block uppercase">
                    {songdata[index]?.artist}
                  </h1>
                  <h1 className="font-semibold md:text-2xl text-[16px] text-white block sm:hidden">
                    {songdata[index]?.title.length > 10
                      ? `${songdata[index]?.title.substring(0, 18)}...`
                      : songdata[index]?.title}
                  </h1>
                  <h1 className="font-semibold md:text-2xl text-[16px] text-white sm:block hidden">
                    {songdata[index]?.title}
                  </h1>
                </div>
                <div
                  className="flex justify-center items-center w-[100px] h-[64px] bg-[#1d1f2b] text-[white] hover:text-[red] cursor-pointer"
                  onClick={handleVolclass}
                >
                  <VolumeBtns />
                </div>
              </div>
              <div className="flex justify-between items-center md:items-end w-full mt-1">
                <h1 className="flex justify-center items-center md:text-xl text-[16px] text-white md:pl-[5rem]">
                  <span>
                    <RiHeadphoneFill className="mr-1" />
                  </span>
                  Next Song : {songdata[index + 1]?.title}
                </h1>
                <div
                  className={`flex justify-between items-end  w-[200px] md:w-[300px] ${
                    isActive ? "" : "hidden"
                  } `}
                >
                  <PSlider
                    min={0}
                    max={100}
                    value={volume}
                    onChange={(e, v) => setVolume(v)}
                    className="h-[8px] text-[red]"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Radio;
