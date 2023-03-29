import React from "react";
import Link from "next/link";
import { AiFillStar, AiFillEye } from "react-icons/ai";

const ROUTE_POST_ID = "watch/[seriesid]";

const Tcard = (props: {
  title: string;
  description: string;
  img: string;
  rating: string;
  runtime: string;
  popularity: string;
  id: string;
}) => {
  return (
    <div className="trend_card min-w-[180px] h-[270px] md:min-w-[200px] md:h-[300px] lg:min-w-[250px] lg:h-[380px] xl:min-w-[270px] xl:h-[400px]">
      <Link href={{ pathname: ROUTE_POST_ID, query: { seriesid: props.id } }}>
        <a>
          <div
            className="img1"
            style={{ backgroundImage: `url(${props.img})` }}></div>
          <div
            className="img2"
            style={{ backgroundImage: `url(${props.img})` }}></div>
          <div className="trend_title">{props.title}</div>
          <div className="trend_text hidden md:block">
            {props.description.length > 100
              ? `${props.description.substring(0, 100)}...`
              : props.description}
          </div>
          <div>
            <div className="trend_rating">
              {props.rating}
              <AiFillStar className="text-lg" />
            </div>
          </div>
          <div>
            <div className="trend_runtime">
              {props.runtime}
              <span> MIN</span>
            </div>
          </div>
          <div>
            <div className="trend_popularity">
              {props.popularity} <AiFillEye className="text-lg" />
            </div>
          </div>
        </a>
      </Link>
    </div>
  );
};

export default Tcard;
