import React, { useEffect, useState } from "react";

import { MdPersonAddAlt1, MdPersonRemove } from "react-icons/md";

import axios from "axios";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import toast from "react-hot-toast";

type userType = {
  userName: string;
  email: string;
  phoneNumber: number;
  friends: [];
  location: string;
  occupation: string;
  viewedProfile: number;
  impressions: number;
  picturePath: string;
};

const Friend = (props: { friendId: string }) => {
  const { data, status } = useSession();
  const router = useRouter();

  const [user, setUser] = useState<userType>();
  const [isLoading, setisLoading] = useState(false);

  const getUser = async () => {
    const res = await axios.get(
      `https://play-pause-api.onrender.com/api/users/${props.friendId}`,
      {
        headers: {
          Authorization: `Bearer ${data?.user.token}`,
          "Content-Type": "application/json",
        },
      }
    );
    setUser(res.data.user);
    setTimeout(() => {
      setisLoading(false);
    }, 1000);
  };

  useEffect(() => {
    setisLoading(true);
    getUser();
  }, [data]);

  if (isLoading) {
    return <p>Loading..</p>;
  }
  if (!user) {
    return <p>No Data yet</p>;
  }

  const isFriend = user?.friends.find((id) => id === data?.user.id);

  const handleFriend = async () => {
    await axios
      .patch(
        `https://play-pause-api.onrender.com/api/users/${data?.user.id}/${props.friendId}`,
        {
          userId: data?.user.id,
          friendId: props.friendId,
        },
        {
          headers: {
            Authorization: `Bearer ${data?.user.token}`,
          },
        }
      )
      .then(() => {
        isFriend
          ? toast.success("UnFriend!!", {
              icon: "👤",
            })
          : toast.success("Added Friend !!", {
              icon: "🫂",
            });
      })
      .then(() => {
        setTimeout(() => {
          router.reload();
        }, 700);
      })
      .catch((error) => {
        toast.error(error);
      });
  };

  return (
    <div className="flex justify-between items-center ">
      <div className="flex justify-between items-center gap-4">
        <div className="h-[60px] w-[60px]">
          <img
            className="rounded-[20%] object-cover w-[55px] h-[55px]"
            src={`https://play-pause-api.onrender.com/userProfile/${user.picturePath}`}
            alt="user"
          />
        </div>
        <div className="">
          <h3 className="font-bold">{user.userName}</h3>
          <h4 className="">{user.location}</h4>
        </div>
      </div>
      {props.friendId !== data?.user.id && (
        <div className="p-[0.1rem]" onClick={handleFriend}>
          {isFriend ? (
            <MdPersonRemove className="text-[20px] hover:cursor-pointer" />
          ) : (
            <MdPersonAddAlt1 className="text-[20px] hover:cursor-pointer" />
          )}
        </div>
      )}
    </div>
  );
};

export default Friend;
