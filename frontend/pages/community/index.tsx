import React from "react";
import Profile from "../../components/community/Profile";
import PostCreate from "../../components/community/PostCreate";
import PostFeed from "../../components/community/PostFeed";
import FriendList from "../../components/community/FriendList";
import Topbar from "../../components/topbar/Topbar";
import Footer from "../../components/footer/Footer";
import UserActivity from "../../components/community/UserActivity";

const index = () => {
  return (
    <>
      <div className="bg-[black] mx-auto ">
        <Topbar />
        <div className="w-full mx-auto pt-24 pb-12 px-8 flex gap-[0.5rem] justify-between max-w-[1338px]">
          <div className="basis-[36%] xl:basis-[26%] hidden md:block">
            <Profile />
            <div className="block xl:hidden">
              <FriendList />
              <UserActivity />
            </div>
          </div>
          <div className="basis-[100%] md:basis-[62%] xl:basis-[42%]">
            <PostCreate />
            <PostFeed />
          </div>
          <div className="basis-[26%] hidden xl:block">
            <FriendList />
            <UserActivity />
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
};

export default index;
