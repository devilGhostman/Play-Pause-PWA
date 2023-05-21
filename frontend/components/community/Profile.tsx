import React, { useEffect, useMemo, useState } from "react";

import { BsInstagram, BsLinkedin, BsReddit, BsTwitter } from "react-icons/bs";
import { MdEdit, MdLocationOn, MdPhone, MdWork } from "react-icons/md";
import { RiUserSettingsLine } from "react-icons/ri";

import { useSession } from "next-auth/react";
import axios from "axios";

type userType = {
  userName: string;
  email: string;
  phoneNumber: number;
  friends: [];
  location: string;
  occupation: string;
  viewedProfile: number;
  impressions: number;
};

const Profile = () => {
  const [user, setUser] = useState<userType>();
  const [isLoading, setisLoading] = useState(false);
  const { data, status } = useSession();

  const getUser = async () => {
    const res = await axios.get(
      `https://play-pause-api.onrender.com/api/users/${data?.user?.id}`,
      {
        headers: { Authorization: `Bearer ${data?.user.token}` },
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

  return (
    <div className="px-[0.75rem] pt-[1.5rem] rounded-[0.75rem] bg-[#141414] ">
      <div className="flex justify-between items-center pb-[1.1rem] gap-[0.5rem]">
        <div className="flex justify-between items-center gap-4">
          <div className="h-[60px] w-[60px]">
            <img
              className="rounded-[50%] object-cover w-[60px] h-[60px]"
              src={`https://play-pause-api.onrender.com/userProfile/${data?.user?.image}`}
              alt="user"
            />
          </div>
          <div>
            <h4 className="font-semibold text-xl cursor-pointer ">
              {user.userName}
            </h4>
            <h3 className="font-medium "> {user.friends.length}</h3>
          </div>
        </div>
        <RiUserSettingsLine className="text-xl" />
      </div>
      <hr className="border-b-4 border-[red]" />
      <div className="py-4 px-0">
        <div className="flex items-center  gap-8 mb-[0.5rem]">
          <MdLocationOn className="text-[20px]" />
          <h3>{user.location}</h3>
        </div>
        <div className="flex items-center  gap-8 mb-[0.5rem]">
          <MdWork className="text-[20px]" />
          <h3>{user.occupation}</h3>
        </div>
        <div className="flex items-center  gap-8 mb-[0.5rem]">
          <MdPhone className="text-[20px]" />
          <h3>{user.phoneNumber}</h3>
        </div>
      </div>
      <hr />

      <div className="py-4 px-0">
        <div className="flex items-center justify-between mb-[0.5rem]">
          <h3>Who's viewed your profile</h3>
          <h3 className="font-medium">{user.viewedProfile}</h3>
        </div>
        <div className="flex items-center justify-between mb-[0.5rem]">
          <h3>Impressions of your post</h3>
          <h3 className="font-medium">{user.impressions}</h3>
        </div>
      </div>

      <hr />

      <div className="py-4 px-0">
        <h2 className="text-[1.2rem] font-semibold mb-4">Social Profiles</h2>
        <div className="flex justify-between items-center gap-4 mb-[0.5rem] hover:bg-[#292929] px-1 rounded-[0.75rem]">
          <div className="flex justify-between items-center gap-4">
            <BsTwitter />
            <div>
              <h3 className="font-medium">Twitter</h3>
              <h4 className="font-extralight">Social Network</h4>
            </div>
          </div>
          <MdEdit className="hover:cursor-pointer" />
        </div>
        <div className="flex justify-between items-center gap-4 mb-[0.5rem]  hover:bg-[#292929] px-1 rounded-[0.75rem]">
          <div className="flex justify-between items-center gap-4">
            <BsInstagram />
            <div>
              <h3 className="font-medium">Instagram</h3>
              <h4 className="font-extralight">Social Network</h4>
            </div>
          </div>
          <MdEdit className="hover:cursor-pointer" />
        </div>
        <div className="flex justify-between items-center gap-4 mb-[0.5rem]  hover:bg-[#292929] px-1 rounded-[0.75rem]">
          <div className="flex justify-between items-center gap-4">
            <BsReddit />
            <div>
              <h3 className="font-medium">Reddit</h3>
              <h4 className="font-extralight">Social Network</h4>
            </div>
          </div>
          <MdEdit className="hover:cursor-pointer" />
        </div>
        <div className="flex justify-between items-center gap-4 mb-[0.5rem]  hover:bg-[#292929] px-1 rounded-[0.75rem]">
          <div className="flex justify-between items-center gap-4">
            <BsLinkedin />
            <div>
              <h3 className="font-medium">Linkedin</h3>
              <h4 className="font-extralight">Network Platform</h4>
            </div>
          </div>
          <MdEdit className="hover:cursor-pointer" />
        </div>
      </div>
    </div>
  );
};

export default Profile;
