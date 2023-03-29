import { useState, useEffect } from "react";
import axios from "../../../axios/axios";

import LoadingStyle from "../../loadingStyle/LoadingStyle";

import { Autoplay, Navigation } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import Bslider from "./Bslider";

type moviedataType = {
  id: string;
  title: string;
  description: string;
  poster: string;
  imdb_Rating: string;
  release_date: string;
  backdrop: string;
  runtime: string;
  ytlink: string;
  language: string;
  genre: string;
  adult: boolean;
};

const Banner = () => {
  const [moviedata, setmoviedata] = useState<moviedataType[]>([]);
  const [isLoading, setLoading] = useState(false);

  const getMoviesData = async () => {
    const res = await axios.get("/watch/");
    setmoviedata(res.data.movies);
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  };
  useEffect(() => {
    setLoading(true);
    getMoviesData();
  }, []);

  if (isLoading) {
    return <LoadingStyle />;
  }

  if (!moviedata) {
    return <p>No Data yet</p>;
  }

  return (
    <div className="hero-slide h-[55vh] md:h-[60vh] lg:h-[94vh] xl:h-full">
      <Swiper
        modules={[Navigation, Autoplay]}
        grabCursor={true}
        spaceBetween={0}
        slidesPerView={1}
        autoplay={{ delay: 2000 }}
        // autoplay={{
        //   disableOnInteraction: false,
        //   delay: 1500,
        //   pauseOnMouseEnter: true,
        // }}
        loop={true}
      >
        {moviedata.slice(0, 6).map((movie, i) => (
          <SwiperSlide key={i}>
            <Bslider
              img={movie.poster}
              rating={movie.imdb_Rating}
              release_date={movie.release_date}
              runtime={movie.runtime}
              description={movie.description}
              title={movie.title}
              backdrop={movie.backdrop}
              language={movie.language}
              adult={movie.adult}
              ytlink={movie.ytlink}
              genre={movie.genre}
              className="active"
              id={movie.id}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Banner;
