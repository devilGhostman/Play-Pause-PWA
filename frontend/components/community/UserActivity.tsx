import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";

import axios from "../../axios/axios";
import ActivityItem from "./ActivityItem";

type likedType = {
  postPic: string;
  postTitle: string;
  postid: string;
  id: string;
};
type savedType = {
  postPic: string;
  postTitle: string;
  postid: string;
  id: string;
};
type commentType = {
  postPic: string;
  postTitle: string;
  postid: string;
  comment: string;
  id: string;
};

const UserActivity = () => {
  const { data, status } = useSession();
  const [liked, setLiked] = useState<likedType[]>([]);
  const [saved, setSaved] = useState<savedType[]>([]);
  const [comment, setComment] = useState<commentType[]>([]);
  const [isLoading, setisLoading] = useState(false);

  const getUserActivity = async () => {
    const res = await axios.get(`/users/${data?.user.id}`, {
      headers: {
        Authorization: `Bearer ${data?.user.token}`,
        "Content-Type": "application/json",
      },
    });

    setLiked(res.data.user.liked);
    setSaved(res.data.user.savedPosts);
    setComment(res.data.user.commented);

    setTimeout(() => {
      setisLoading(false);
    }, 1000);
  };

  useEffect(() => {
    setisLoading(true);
    getUserActivity();
  }, [data]);

  if (isLoading) {
    return <p>Loading..</p>;
  }
  if (!data) {
    return <p>No Data yet</p>;
  }
  return (
    <>
      <div className="pr-[1.5rem] pl-[0.75rem] py-[1.5rem] rounded-[0.75rem] my-4 mx-0 bg-[#141414] ">
        <h2 className=" text-[20px] mb-3 pb-2 font-semibold text-3xl text-white border-b-4 border-[red]">
          Community Followed
        </h2>
        <div className="flex flex-col gap-6"></div>
      </div>
      <div className="pr-[1.5rem] pl-[0.75rem] py-[1.5rem] rounded-[0.75rem] my-4 mx-0 bg-[#141414] ">
        <h2 className=" text-[20px] mb-3 pb-2 font-semibold text-3xl text-white border-b-4 border-[red]">
          Liked Post
        </h2>
        <div className="flex flex-col gap-6">
          {liked.map((item) => (
            <ActivityItem
              picturePath={item.postPic}
              title={item.postTitle}
              key={item.id}
              comment={""}
            />
          ))}
        </div>
      </div>
      <div className="pr-[1.5rem] pl-[0.75rem] py-[1.5rem] rounded-[0.75rem] my-4 mx-0 bg-[#141414] ">
        <h2 className=" text-[20px] mb-3 pb-2 font-semibold text-3xl text-white border-b-4 border-[red]">
          Saved Posts
        </h2>
        <div className="flex flex-col gap-6">
          {saved.map((item) => (
            <ActivityItem
              picturePath={item.postPic}
              title={item.postTitle}
              key={item.id}
              comment={""}
            />
          ))}
        </div>
      </div>
      <div className="pr-[1.5rem] pl-[0.75rem] py-[1.5rem] rounded-[0.75rem] my-4 mx-0 bg-[#141414] ">
        <h2 className=" text-[20px] mb-3 pb-2 font-semibold text-3xl text-white border-b-4 border-[red]">
          Recent Comments
        </h2>
        <div className="flex flex-col gap-6">
          {comment.map((item) => (
            <ActivityItem
              picturePath={item.postPic}
              title={item.postTitle}
              key={item.id}
              comment={item.comment}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default UserActivity;
