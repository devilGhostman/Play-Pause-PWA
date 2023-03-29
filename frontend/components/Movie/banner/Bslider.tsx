import React, { useState } from "react";
import { FaPlay } from "react-icons/fa";
import { BsFillInfoCircleFill } from "react-icons/bs";

import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useRouter } from "next/router";
import Link from "next/link";

const ROUTE_POST_ID = "watch/[seriesid]";

const Bslider = (props: {
  backdrop: String;
  className: any;
  title: String | undefined;
  description: String | undefined;
  img: string | undefined;
  rating: String | undefined;
  release_date: String | undefined;
  runtime: String | undefined;
  language: String;
  adult: Boolean;
  ytlink: string;
  genre: String;
  id: string;
}) => {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  return (
    <div
      className={`hero-slide__item md:h-[100%] ${props.className}`}
      style={{ backgroundImage: `url(${props.backdrop})` }}
    >
      <div className="hero-slide__item__content container">
        <div className="hero-slide__item__content__info ">
          <h2 className="btitle text-3xl md:text-5xl lg:text-7xl font-bold">
            {props.title}
          </h2>
          <div className="boverview text-[#aaa] w-full md:text-lg lg:max-w-2xl lg:text-1xl">
            {props.description ? props.description.slice(0, 190) + "..." : ""}
          </div>
          <div className="btns flex space-x-3">
            <div className="bg-[#0f1111]">
              <button
                onClick={handleClickOpen}
                className="bannerButton bg-[#181a1b] text-white"
              >
                <FaPlay className="h-4 w-4 text-white md:h-8 md:w-8" /> Play
              </button>
              <Dialog open={open} onClose={handleClose} maxWidth={"lg"}>
                <DialogTitle
                  sx={{
                    color: "red",
                    fontWeight: "bold",
                    backgroundColor: "#0f1111",
                  }}
                >
                  {props.title}
                </DialogTitle>
                <DialogContent sx={{ backgroundColor: "#0f1111" }}>
                  <DialogContentText>
                    <div className="relative w-[100%]  h-[200px] sm:w-[500px] sm:h-[300px] md:h-[500px] md:w-[800px] lg:w-[1100px] lg:h-[700px] xl:w-[1170px] xl:h-[680px]">
                      <iframe
                        className="w-[98%] h-[98%]"
                        src={`https://www.youtube.com/embed/${props.ytlink}`}
                        title={`${props.title}`}
                        allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        frameBorder="0"
                      ></iframe>
                    </div>
                  </DialogContentText>
                </DialogContent>
                <DialogActions sx={{ backgroundColor: "#0f1111" }}>
                  <Button
                    onClick={handleClose}
                    className="absolute bottom-[8px] right-[8px]"
                  >
                    Close
                  </Button>
                </DialogActions>
              </Dialog>
            </div>
            <Link
              href={{
                pathname: ROUTE_POST_ID,
                query: { seriesid: props.id },
              }}
            >
              <button className="bannerButton bg-[gray]/70">
                <BsFillInfoCircleFill className="h-4 w-4 md:h-8 md:w-8" /> More
                Info
              </button>
            </Link>
          </div>
        </div>
        <div className="hero-slide__item__content__poster ">
          <img src={props.img} alt="" />
        </div>
      </div>
    </div>
  );
};

export default Bslider;
