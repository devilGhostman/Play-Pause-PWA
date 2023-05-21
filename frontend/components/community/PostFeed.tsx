import React, { useEffect, useState } from "react";
import Posts from "./Posts";

import { useSession } from "next-auth/react";
import axios from "axios";

type postType = {
  title: string;
  description: string;
  id: string;
  userId: string;
  userName: string;
  userPicturePath: string;
  location: string;
  occupation: string;
  likes: [];
  savedBy: [];
  comments: [{ commentedby: string; comment: string; commentedbyPic: string }];
  picturePath: string;
};

const PostFeed = () => {
  const { data, status } = useSession();
  const [posts, setPosts] = useState<postType[]>([]);
  const [isLoading, setisLoading] = useState(false);
  const getPost = async () => {
    const res = await axios.get(`https://play-pause-api.onrender.com/api/post`, {
      headers: {
        Authorization: `Bearer ${data?.user.token}`,
        "Content-Type": "application/json",
      },
    });
    console.log(res.data.posts);
    setPosts(res.data.posts);
    setTimeout(() => {
      setisLoading(false);
    }, 1000);
  };

  useEffect(() => {
    setisLoading(true);
    getPost();
  }, [data]);

  if (isLoading) {
    return <p>Loading..</p>;
  }
  if (!posts) {
    return <p>No Data yet</p>;
  }
  return (
    <div>
      {posts.map((post) => (
        <Posts
          key={post.userId}
          title={post.title}
          description={post.description}
          postId={post.id}
          postUserId={post.userId}
          userName={post.userName}
          userPicturePath={post.userPicturePath}
          location={post.location}
          occupation={post.occupation}
          likes={post.likes}
          savedBy={post.savedBy}
          comments={post.comments}
          picturePath={post.picturePath}
        />
      ))}
    </div>
  );
};

export default PostFeed;
