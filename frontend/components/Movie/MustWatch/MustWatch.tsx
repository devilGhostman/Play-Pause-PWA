import { useEffect, useState } from "react";
import LoadingStyle from "../../loadingStyle/LoadingStyle";
import Link from "next/link";

type moviedataType = {
  ytlink: string;
  id: string;
  title: string;
  description: string;
  poster: string;
  imdb_Rating: number;
  rotten_Rating: number;
  release_date: string;
  backdrop: string;
  runtime: string;
  language: string;
  genre: [];
  popularity: string;
  casts: [
    {
      characterName: string;
      dp: string;
      name: string;
    }
  ];
  adult: boolean;
};
const ROUTE_POST_ID = "watch/[seriesid]";

const MustWatch = () => {
  const [moviedata, setmoviedata] = useState<moviedataType>();
  const [isLoading, setLoading] = useState<boolean>(false);
  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    setLoading(true);
    fetch(
      `https://play-pause-api.vercel.app/api/watch/64204a871d252cb4ae5fa525`,
      {
        signal,
      }
    )
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setmoviedata(data.movie);
        setTimeout(() => {
          setLoading(false);
        }, 3000);
      })
      .catch((err) => {
        if (err.name === "AbortError") {
        }
      });

    return () => {
      controller.abort();
    };
  }, []);

  if (isLoading) {
    return <LoadingStyle />;
  }

  if (!moviedata) {
    return <p>No Data yet</p>;
  }
  return (
    <>
      <div className="px-12 my-4">
        <h2 className="tracking-normal border-b-4 border-[red] pb-4 font-semibold text-3xl text-white block">
          MUST WATCH
        </h2>
      </div>
      <div className="relative w-full h-[700px] overflow-hidden mb-20 ">
        <video
          src="https://s3.amazonaws.com/akamai.netstorage/HD_downloads/Orion_SM.mp4"
          autoPlay={true}
          loop
          muted
          className="absolute z-0 block w-full h-full object-cover left-0 top-0"
        ></video>
        <div className="z-[1] w-full h-full relative t bg-[rgba(0,0,0,0.5)]">
          <div className="flex justify-between items-start h-full">
            <div className="flex items-start justify-between flex-col flex-1 p-4 md:p-16 h-full">
              <div>
                <h1 className="text-[80px] font-semibold">{moviedata.title}</h1>
                <h3 className="text-[#aaa]">{moviedata.description}</h3>
              </div>

              <div className="flex flex-col h-[100px] w-[150px] items-end self-end md:self-start">
                <h3>{moviedata.language}</h3>
                <h3>{moviedata.release_date}</h3>
                <Link
                  href={{
                    pathname: ROUTE_POST_ID,
                    query: { seriesid: moviedata.id },
                  }}
                >
                  <button className="border-2 border-[white] bg-[white] text-[black] w-full mt-2 p-1 hover:text-[red]">
                    More{">>>"}
                  </button>
                </Link>
              </div>
            </div>
            <div className="lg:flex flex-1 h-full flex-col items-start justify-end p-8 hidden ">
              <div className="w-full flex flex-col p-8">
                <div className="w-full flex justify-end my-4">
                  <h2 className=" tracking-normal font-semibold text-xl text-white block ">
                    CASTS
                  </h2>
                </div>
                <div className="flex space-x-2 justify-end items-end w-full">
                  {moviedata.casts.slice(0, 4).map((cast, i) => {
                    return (
                      <div key={i} className="">
                        <img
                          src={`${cast.dp}`}
                          alt=""
                          className="rounded-[10px] h-[150px] w-[130px] object-cover"
                        />
                        <p className="max-w-full">{cast.name}</p>
                        <p className="font-semibold">as {cast.characterName}</p>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MustWatch;
