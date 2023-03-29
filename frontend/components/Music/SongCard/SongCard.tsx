import { useState } from "react";

import { BsFillPauseFill, BsFillPlayFill } from "react-icons/bs";

const SongCard = (props: {
  onclick: (arg0: any) => void;
  setPause: () => void;
  id: string;
  title: string;
  artist: string;
  poster: string;
  songPath: string;
  songPath2: string;
}) => {
  const [play, setplay] = useState(false);
  const handlePlay = () => {
    props.setPause();
    setplay(false);
  };

  const getid = () => {
    props.onclick(props.id);
    setplay(true);
  };

  return (
    <div className="flex flex-col xl:w-[250px] lg:w-[240px] md:w-[250px] sm:w-[220px] p-4 bg-[#1d1f2b] bg-opacity-80 backdrop-blur-sm animate-slideup rounded-lg cursor-pointer ">
      <div className="relative w-full md:h-[225px] sm:h-[220px]  group ">
        <div className="absolute inset-0 justify-center items-center  bg-opacity-50 group-hover:flex hidden hover:flex hover:bg-[#0c0b0b52] ">
          {play ? (
            <BsFillPauseFill
              className="text-[red] text-5xl"
              onClick={handlePlay}
            />
          ) : (
            <BsFillPlayFill
              className="text-[red] text-5xl ml-[1px]"
              onClick={getid}
            />
          )}
        </div>
        <img
          alt="song_img"
          src={props.poster}
          className="w-full h-full rounded-lg posterimg"
        />
      </div>

      <div className="mt-4 flex flex-col">
        <h1 className="font-semibold text-lg text-[red] truncate">
          {props.title}
        </h1>
        <h3 className="text-sm truncate text-gray-300 mt-1">{props.artist}</h3>
      </div>
    </div>
  );
};

export default SongCard;
