import React from "react";

const MemeCard = (props: {
  imgSize: string;
  title: string;
  imgPath: string;
  videoPath: string;
  id: string;
}) => {
  const stopMovie = (e:any) => {
    e.target.pause();
  };

  const playMovie = (e:any) => {
    // e.target.load();
    e.target.currentTime = 0;
    e.target.play();
  };
  return (
    <>
      <div
        className={`m-[5px] cursor-pointer relative overflow-hidden rounded-2xl hover:scale-125 hover:z-20 duration-[0.2s] border-[#484848] border-2 hover:border-[0px] hover:shadow-[0px_0px_15px_#454545] memecard ${props.imgSize} group`}
      >
        {props.videoPath && (
          <video
            src={`${props.videoPath}`}
            onMouseOver={playMovie}
            onMouseOut={stopMovie}
            loop
            muted
            className="absolute z-0 block w-full h-full object-fill left-0 top-0 group-hover:z-[2] "
          ></video>
        )}
        <img
          src={props.imgPath}
          alt=""
          className="absolute top-0  left-0 z-[1] block w-[100%] h-[88%] object-fit rounded-2xl"
        />
        <div className="memeOverlay hover:opacity-0 ">
          <div className="font-black text-base pb-2  px-0 text-[#ff2525]">
            {props.title}
          </div>
        </div>
      </div>
    </>
  );
};

export default MemeCard;
