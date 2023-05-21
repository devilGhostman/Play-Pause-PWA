import React from "react";

const ActivityItem = (props: {
  picturePath: string;
  title: string;
  comment: string;
}) => {
  return (
    <div className="flex justify-between items-center hover:cursor-pointer px-1 hover:bg-[#292929]  rounded-[0.75rem] min-h-[60px]">
      <div className="flex justify-between items-center gap-4">
        {props.picturePath && (
          <div className="h-[60px] w-[60px] flex justify-center items-center ">
            <img
              className="rounded-[12px] object-cover w-[55px] h-[55px]"
              src={`https://play-pause-api.onrender.com/posts/${props.picturePath}`}
              alt="user"
            />
          </div>
        )}
        <div className="">
          <h3 className="font-bold">
            {props.title?.length > 45
              ? props.title.slice(0, 45) + ".."
              : props.title}
          </h3>
          {props.comment && <h4 className="">{props.comment}</h4>}
        </div>
      </div>
    </div>
  );
};

export default ActivityItem;
