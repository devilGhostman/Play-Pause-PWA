import React, { useRef, useState } from "react";
import { BsFillPauseFill, BsFillPlayFill } from "react-icons/bs";

const Card = (props: {
  id: string;
  title: string;
  artist: string;
  poster: string;
  songPath: string;
  songPath2: string;
  handlecurrPlaying: any;
}) => {
  const audioPlayer = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const togglePlay = () => {
    if (!isPlaying) {
      audioPlayer.current?.play();
      setIsPlaying(true);
      props.handlecurrPlaying(true);
    }
    // setMute(false);
  };

  const togglePause = () => {
    if (isPlaying) {
      audioPlayer.current?.pause();
      setIsPlaying(false);
      props.handlecurrPlaying(false);
      // setMute(true);
    }
  };

  const handlePlay = () => {
    if (!isPlaying) {
      togglePlay();
    } else {
      togglePause();
    }
  };
  return (
    <div
      className="w-[180px] h-[280px] sm:w-[200px] sm:h-[300px] md:w-[260px] md:h-[360px] rounded-[20px] overflow-hidden relative text-white/80 cursor-pointer hover:scale-105 hover:text-white/100 transition duration-200 ease-out group "
      onClick={handlePlay}
      // style={{
      //   backgroundImage: "linear-gradient(rgb(0, 0, 0, 0), rgb(0, 0, 0, 1))",
      // }}
    >
      <audio
        // src={`http://localhost:5000/${props.songPath}`}
        src={`${props.songPath2}`}
        ref={audioPlayer}
        onEnded={togglePause}
      />
      <img
        src={props.poster}
        alt=""
        className="h-full w-full absolute inset-0 object-cover rounded-[20px] opacity-80 group-hover:opacity-100"
      />

      <div className="absolute bottom-10 inset-x-0 ml-4 flex items-center space-x-3.5 ">
        <div className="h-10 w-10 bg-[#8f1414] rounded-full flex items-center justify-center group-hover:bg-[#ff2929] flex-shrink-0">
          {isPlaying ? (
            <BsFillPauseFill
              className="text-white text-xl"
              onClick={togglePause}
            />
          ) : (
            <BsFillPlayFill
              className="text-white text-xl ml-[1px]"
              onClick={togglePlay}
            />
          )}
        </div>

        <div
          className="w-full px-1"
          style={{
            backgroundImage:
              "linear-gradient(rgb(0, 0, 0, 0.7), rgb(0, 0, 0, 0.7))",
          }}
        >
          <h4 className="text-[12px] md:text-[18px] font-extrabold truncate w-44 text-[#ff4040]">
            {props.title}
          </h4>
          <h6 className="text-[12px] lg:text-[16px] font-semibold">
            {props.artist}
          </h6>
        </div>
      </div>
    </div>
  );
};

export default Card;
