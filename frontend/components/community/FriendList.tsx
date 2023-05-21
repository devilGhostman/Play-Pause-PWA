import React, { useEffect, useMemo, useState } from "react";

import { useSession } from "next-auth/react";
import Friend from "./Friend";

import axios from "axios";

type friendType = {
  _id: string;
};

const FriendList = () => {
  const { data, status } = useSession();
  const [friends, setFriends] = useState<friendType[]>([]);
  const [isLoading, setisLoading] = useState(false);

  const getFriends = async () => {
 
    const res = await axios.get(
      `https://play-pause-api.onrender.com/api/users/${data?.user.id}/friends`,
      {
        headers: {
          Authorization: `Bearer ${data?.user.token}`,
          "Content-Type": "application/json",
        },
      }
    );

    setFriends(res.data);
    setTimeout(() => {
      setisLoading(false);
    }, 1000);
  };

  useEffect(() => {
    setisLoading(true);
    getFriends();
  }, [data]); 

  if (isLoading) {
    return <p>Loading..</p>;
  }
  if (!friends) {
    return <p>No Data yet</p>;
  }

  return (
    <div className="pr-[1.5rem] pl-[0.75rem] py-[1.5rem] rounded-[0.75rem] my-4 mx-0 bg-[#141414] ">
      <h2 className=" text-[20px] mb-3 pb-2 font-semibold text-3xl text-white border-b-4 border-[red]">
        Friend List
      </h2>
      <div className="flex flex-col gap-6">
        {friends.map((friend) => (
          <Friend friendId={friend._id} key={friend._id} />
        ))}
      </div>
    </div>
  );
};

export default FriendList;
