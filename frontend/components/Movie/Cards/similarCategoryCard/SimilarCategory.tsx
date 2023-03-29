import { useState, useEffect } from "react";

import SwiperCore, { Autoplay, Pagination, Navigation } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";

import axios from "../../../../axios/axios";
import SimilarCateCard from "./SimilarCateCard";

type moviedataType = {
  id: string;
  title: string;
  description: string;
  poster: string;
  poster2: string;
  imdb_Rating: number;
  release_date: string;
  backdrop: string;
  runtime: string;
  language: string;
  genre: string;
  adult: boolean;
};

const SimilarCategory = (props: { makereverse: boolean }) => {
  const [moviedata, setmoviedata] = useState<moviedataType[]>([]);
  const [isLoading, setLoading] = useState(false);

  const getMoviesData = async () => {
    const res = await axios.get("/watch/");
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

  const makerev = props.makereverse;
  return (
    <>
      <div className="hero-slide mb-12 height-450px mx-[5%]">
        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          grabCursor={true}
          spaceBetween={1}
          loop={true}
          slidesPerView={2}
          autoplay={{
            disableOnInteraction: false,
            delay: 500,
            pauseOnMouseEnter: true,
            reverseDirection: makerev,
          }}
          breakpoints={{
            640: {
              slidesPerView: 3,
              spaceBetween: 20,
            },
            768: {
              slidesPerView: 4,
              spaceBetween: 5,
            },
            1024: {
              slidesPerView: 5,
              spaceBetween: 5,
            },
            1280: {
              slidesPerView: 7,
              spaceBetween: 4,
            },
          }}
        >
          {moviedata
            .slice(0, 9)
            .sort((a, b) => b.imdb_Rating - a.imdb_Rating)
            .map((movie, i) => (
              <SwiperSlide key={i}>
                <SimilarCateCard
                  id={movie.id}
                  img1={movie.poster}
                  img2={movie.poster2}
                  title={movie.title}
                  release_date={movie.release_date}
                  rating={movie.imdb_Rating}
                  description={movie.description}
                />
              </SwiperSlide>
            ))}
        </Swiper>
      </div>
    </>
  );
};

export default SimilarCategory;
