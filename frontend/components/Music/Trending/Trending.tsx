import { useState, useEffect } from "react";
import axios from "../../../axios/axios";

import Card from "./Card";
import LoadingStyle from "../../loadingStyle/LoadingStyle";

import SwiperCore, { Autoplay, Pagination, Navigation } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";

type songdataType = {
  id: string;
  title: string;
  artist: string;
  poster: string;
  songPath: string;
  songPath2: string;
};

const Trending = () => {
  const [songdata, setsongdata] = useState<songdataType[]>([]);
  const [isLoading, setLoading] = useState(false);
  const [currPlaying, setcurrPlaying] = useState(false);

  const getSongData = async () => {
    const res = await axios.get("/music/");
    setsongdata(res.data.musics);
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  };
  useEffect(() => {
    setLoading(true);
    getSongData();
  }, []);

  const handlecurrPlaying = (value: boolean) => {
    setcurrPlaying(value);
  };

  if (isLoading) {
    return <LoadingStyle />;
  }

  if (!songdata) {
    return <p>No Data yet</p>;
  }
  return (
    <>
      <div className="w-[90%] max-w-[1338px]  mx-auto mt-5">
        <div className="m-0 p-0 font-semibold text-3xl text-white pb-4 mb-4 border-b-4 border-[red] uppercase w-[100%]   mx-auto">
          trending
        </div>
        <div className="pt-[15px]">
          <Swiper
            className="h-[320px] md:h-[400px]"
            modules={[Navigation, Pagination, Autoplay]}
            grabCursor={true}
            spaceBetween={1}
            loop={true}
            slidesPerView={2}
            autoplay={{
              disableOnInteraction: currPlaying,
              delay: 1000,
              pauseOnMouseEnter: true,
            }}
            breakpoints={{
              640: {
                slidesPerView: 3,
                spaceBetween: 20,
              },
              768: {
                slidesPerView: 3,
                spaceBetween: 5,
              },
              1024: {
                slidesPerView: 4,
                spaceBetween: 8,
              },
              1280: {
                slidesPerView: 5,
                spaceBetween: 8,
              },
            }}
          >
            {songdata.map((song, i) => (
              <SwiperSlide key={i}>
                <Card
                  id={song.id}
                  poster={song.poster}
                  title={song.title}
                  artist={song.artist}
                  songPath={song.songPath}
                  songPath2={song.songPath2}
                  handlecurrPlaying={handlecurrPlaying}
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </>
  );
};

export default Trending;
