import { useState, useEffect } from "react";
import { useRouter } from "next/router";

import axios from "../../../axios/axios";
import BottomBar from "../../../components/bottomBar/BottomBar";

import { user } from "../../watchtogether";
import ScrollToBottom from "react-scroll-to-bottom";

import io, { Socket } from "socket.io-client";
// let socket = io.connect("http://localhost:5000");

import socketIo from "socket.io-client";
import MessageCon from "../../../components/Movie/Cards/watchtogCard/MessageCon";
import LoadingStyle from "../../../components/loadingStyle/LoadingStyle";

let socket: any;
const ENDPOINT = "https://play-pause-api.onrender.com";

type moviedataType = {
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
  popularity: string;
  adult: boolean;
};

type messageType = {
  id: string;
  user: string;
  message: string;
};

const index = () => {
  const router = useRouter();
  const { seriesid } = router.query;

  const [moviedata, setmoviedata] = useState<moviedataType>();
  const [isLoading, setLoading] = useState(false);

  const [id, setid] = useState("");
  const [messages, setMessages] = useState<messageType[]>([]);
  const [room, setRoom] = useState("");
  const [crtRoom, setcrtRoom] = useState('click "Create Button"');

  const send = () => {
    const message = (document.getElementById("chatInput") as HTMLInputElement)
      .value;
    socket.emit("message", { message, id, room });
    (document.getElementById("chatInput") as HTMLInputElement).value = "";
  };

  const joinRoom = () => {
    if (room !== "") {
      socket.emit("join_room", room);
    }
  };

  useEffect(() => {
    joinRoom();
  }, [room]);

  const createRoom = () => {
    let ranKey = Math.floor(Math.random() * 10000) + 1;
    setRoom(`${ranKey}`);
    setcrtRoom(`${ranKey}`);
  };

  useEffect(() => {
    socket = socketIo(ENDPOINT, { transports: ["websocket"] });

    socket.on("connect", () => {
      setid(socket.id);
    });
    console.log(socket);
    socket.emit("joined", { user });

    socket.on("welcome", (data: messageType) => {
      setMessages([...messages, data]);
      // console.log(data.user, data.message);
    });

    socket.on("userJoined", (data: messageType) => {
      setMessages([...messages, data]);
      // console.log(data.user, data.message);
    });

    socket.on("leave", (data: messageType) => {
      setMessages([...messages, data]);
      // console.log(data.user, data.message);
    });

    return () => {
      socket.emit("left");
      socket.off();
    };
  }, []);

  useEffect(() => {
    socket.on("sendMessage", (data: messageType) => {
      setMessages([...messages, data]);
      // console.log(data.user, data.message, data.id, data.room);
    });
    return () => {
      socket.off();
    };
  }, [messages]);

  //   const getMoviesData = async () => {
  //     const res = await axios.get(`/watch/${seriesid}`);
  //     console.log(res.data.movies);
  //     setmoviedata(res.data.movies);
  //     setLoading(false);
  //   };
  //   useEffect(() => {
  //     if (router.isReady) {
  //       setLoading(true);
  //       getMoviesData();
  //     }
  //   }, [router.isReady]);

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;
    if (router.isReady) {
      setLoading(true);
      fetch(`https://play-pause-api.vercel.app/api/watch/${seriesid}`, {
        signal,
      })
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          setmoviedata(data.movie);
          setTimeout(() => {
            setLoading(false);
          }, 1000);
        })
        .catch((err) => {
          if (err.name === "AbortError") {
          }
        });
    }

    return () => {
      controller.abort();
    };
  }, [router.isReady]);

  if (isLoading) {
    return <LoadingStyle />;
  }

  if (!moviedata) {
    return <p>No Data yet</p>;
  }
  return (
    <>
      <div className="grid grid-rows lg:grid-cols-4 gap-4 h-[100vh] pt-6">
        <div className=" lg:col-span-3">
          <h1 className=" tracking-normal border-b-2 border-[red] font-semibold text-3xl text-white block pb-[10px] mb-[20px] mx-[5%]">
            Watch Movie / Web Series
          </h1>
          <div className=" mb-3 lg:mx-[4%]  ">
            <div className="relative w-[100%] pb-[56.25%] h-[0px]">
              <div className="relative mx-[20px] md:mx-auto">
                <video
                  // src={`http://localhost:5000/${moviedata.moviePath}`}
                  // src={`http://localhost:5000/movies/1670752346987-ved.mp4`}
                  src="https://dl.streamcloud.club/files/yts/720p/6393e826a573603799b4788b.mp4"
                  controls
                  className="bsolute top-[0px] left-[5%] w-[100%] h-[80%]"
                  width="800"
                  height="642"
                  poster={moviedata.backdrop}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="bg-[#151515] pb-10 ">
          <h1 className=" tracking-normal border-b-2 border-[red] font-semibold text-3xl text-white block pb-[10px] mb-[20px] mx-[5%] text-center">
            Room Chat
          </h1>
          <div className="px-2 mb-14">
            <div className="flex flex-col bg-[#1d1d1d] text-white  h-[100%]">
              <div className="flex justify-center items-center relative w-[100%] bg-[#333232b9] flex-wrap py-2 h-[10%] px-2">
                <input
                  placeholder="Room Number"
                  onChange={(event) => {
                    setRoom(event.target.value);
                  }}
                  className="flex-1 w-[1%] border-2 rounded-l-lg bg-[#212121] border-slate-400 pl-1 text-[#aaa] font-normal"
                />
                <button
                  className="rounded-r-lg bg-red-500 text-white w-[60px] border-2 border-red-500"
                  onClick={joinRoom}
                >
                  Join
                </button>
              </div>
              <div className="flex justify-center items-center relative w-[100%] bg-[#333232b9] flex-wrap py-2 h-[10%] px-2">
                <h2 className="flex-1 w-[1%] border-2 rounded-l-lg bg-[#212121] border-slate-400 pl-1 text-[#aaa] font-normal">
                  {crtRoom}
                </h2>
                <button
                  className="rounded-r-lg bg-red-500 text-white w-[60px] border-2 border-red-500"
                  onClick={createRoom}
                  id="clsCheck"
                >
                  Create
                </button>
              </div>
              <div className="h-[400px] md:h-[630px]">
                <div className="h-[90%] px-2 py-2">
                  <h1 className="text-[16px] text-[#aaa] mx-[38%] self-center">
                    Messages
                  </h1>

                  <ScrollToBottom className="text-[14px] text-[#aaa] flex flex-col h-[98%] w-full pt-2">
                    {messages.map((msg, i) => (
                      <MessageCon
                        key={i}
                        message={msg.message}
                        user={msg.id === id ? "" : msg.user}
                        classs={msg.id === id ? "flex-row-reverse" : "flex-row"}
                      />
                    ))}
                  </ScrollToBottom>
                  {/* {messages.map((msg) => console.log(msg))} */}
                </div>
                <div className="flex justify-center items-center relative w-[100%] bg-[#333232b9] flex-wrap py-2 h-[10%] px-2">
                  <input
                    placeholder="Message..."
                    // onChange={(event) => {
                    //   setmessage(event.target.value);
                    // }}
                    id="chatInput"
                    type="text"
                    onKeyUpCapture={(event) =>
                      event.key === "Enter" ? send() : null
                    }
                    className="flex-1 w-[1%] border-2 rounded-l-lg bg-[#212121] border-slate-400 pl-1 text-[#aaa] font-normal "
                  />
                  <button
                    className="rounded-r-lg bg-red-500 text-white w-[60px] border-2 border-red-500 flex justify-center items-center"
                    onClick={send}
                  >
                    Send
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* <BottomBar /> */}
      </div>
    </>
  );
};

export default index;
