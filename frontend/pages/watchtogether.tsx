import { useEffect, useState } from "react";

import axios from "../axios/axios";

import WatchtogCard from "../components/Movie/Cards/watchtogCard/WatchtogCard";
import LoadingStyle from "../components/loadingStyle/LoadingStyle";
import BottomBar from "../components/bottomBar/BottomBar";

import { useSession } from "next-auth/react";
import Footer from "../components/footer/Footer";

type moviedataType = {
  id: string;
  title: string;
  description: string;
  poster: string;
  imdb_Rating: string;
  rotten_Rating: string;
  release_date: string;
  backdrop: string;
  runtime: string;
  language: string;
  genre: [];
  popularity: string;
  adult: boolean;
};

let user: string;

const watchtogether = () => {
  const [moviedata, setmoviedata] = useState<moviedataType[]>([]);
  const [isLoading, setLoading] = useState(false);

  const [name, setname] = useState("User");
  const { data: session, status } = useSession();

  const getMoviesData = async () => {
    const res = await axios.get("/watch?new=true");
    setmoviedata(res.data.movies);
    setTimeout(() => {
      setLoading(false);
    }, 1500);
  };
  useEffect(() => {
    setLoading(true);
    getMoviesData();
  }, []);

  const sendUser = () => {
    user = (document.getElementById("joinInput") as HTMLInputElement).value;
    (document.getElementById("joinInput") as HTMLInputElement).value = "";
    if (user === "" && session) {
      user = `${session.user?.name}`;
      setname(user);
    }
    console.log(user);
  };

  useEffect(() => {
    if (session) {
      setname(session.user?.name as string);
      user = name;
    }
  }, [session, moviedata]);

  if (isLoading) {
    return <LoadingStyle />;
  }

  if (!moviedata) {
    return <p>No Data yet</p>;
  }
  return (
    <div>
      <h1 className=" tracking-normal border-b-2 border-[red] font-semibold text-3xl text-white block pb-[10px] mb-[20px] mx-[2%] text-center">
        WATCH TOGETHER WITH FRIENDS
      </h1>
      <h3 className=" tracking-normal border-b-2 border-[#525050] font-semibold text-xl text-[#aaa] block pb-[10px] mb-[20px] mx-[2%] ">
        Hi <span className="text-[red]">{`${name}`}</span>, Browse Your
        Favourite Movie/Series
      </h3>
      <div>
        <div className="flex justify-center">
          <input
            onChange={(e) => setname(e.target.value)}
            placeholder=" Choose Cool Name!!"
            type="text"
            id="joinInput"
            onKeyUpCapture={(event) =>
              event.key === "Enter" ? sendUser() : null
            }
          />
          <button
            onClick={sendUser}
            className="rounded-lg bg-red-500 text-white w-[70px] border-2 border-red-500 mx-4"
          >
            Enter
          </button>
        </div>
      </div>
      {/* <div className="flex items-center space-x-0.5 overflow-x-scroll scrollbar-hide md:space-x-2.5 md:p-2 "> */}
      <div className="w-auto space-x-3 space-b-2 mx-[2%] ">
        {moviedata.slice(0, 12).map((movie, i) => (
          <WatchtogCard
            key={movie.id}
            img={movie.poster}
            rating={movie.imdb_Rating}
            popularity={movie.popularity}
            description={movie.description}
            title={movie.title}
            runtime={movie.runtime}
            id={movie.id}
          />
        ))}
      </div>
      {/* <BottomBar /> */}
      <Footer />
    </div>
  );
};

export default watchtogether;
export { user };
