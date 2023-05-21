import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";

import {
  MdChat,
  MdOutlineFavorite,
  MdOutlineFavoriteBorder,
  MdShare,
} from "react-icons/md";
import { BsBookmarkHeart, BsBookmarkHeartFill } from "react-icons/bs";

import { InputBase } from "@mui/material";
import toast from "react-hot-toast";
import Friend from "./Friend";
import axios from "axios";

const Posts = (props: {
  title: string;
  description: string;
  postId: string;
  postUserId: string;
  userName: string;
  userPicturePath: string;
  location: string;
  occupation: string;
  likes: [];
  savedBy: [];
  comments: [{ commentedby: string; comment: string; commentedbyPic: string }];
  picturePath: string;
}) => {
  const { data, status } = useSession();
  const router = useRouter();
  const [comment, setComment] = useState("");
  const [isComments, setIsComments] = useState(false);

  const isliked = props.likes.find((id) => id === data?.user.id);
  const isSaved = props.savedBy.find((id) => id === data?.user.id);

  const patchLike = async () => {
    await axios
      .patch(
        `https://play-pause-api.onrender.com/api/post/${props.postId}/likes`,
        { userId: data?.user.id },
        {
          headers: {
            Authorization: `Bearer ${data?.user.token}`,
            "Content-Type": "application/json",
          },
        }
      )
      .then(() => {
        isliked
          ? toast.success("Unliked !!", {
              icon: "💔",
            })
          : toast.success("Liked !!", {
              icon: "❤️",
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

  const patchSave = async () => {
    await axios
      .patch(
        `https://play-pause-api.onrender.com/api/post/${props.postId}/saves`,
        { userId: data?.user.id },
        {
          headers: {
            Authorization: `Bearer ${data?.user.token}`,
            "Content-Type": "application/json",
          },
        }
      )
      .then(() => {
        isSaved
          ? toast.success("Removed !!", {
              icon: "🔖",
            })
          : toast.success("Saved !!", {
              icon: "🔖",
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

  const handleComment = async () => {
    await axios
      .patch(
        `https://play-pause-api.onrender.com/api/post/${props.postId}/comments`,
        {
          userId: data?.user.id,
          userName: data?.user.name,
          userPic: data?.user.image,
          comment: comment,
        },
        {
          headers: {
            Authorization: `Bearer ${data?.user.token}`,
            "Content-Type": "application/json",
          },
        }
      )
      .then(() => {
        toast.success("Commented !!");
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
    <div className=" px-[1.2rem] py-[1.5rem] rounded-[0.75rem] my-4 mx-0 bg-[#141414] group">
      <Friend friendId={props.postUserId} />
      <div className="my-2 mx-0 h-1 border-b-4 border-[red]"></div>
      <h2 className="font-semibold group-hover:text-red-500">{props.title}</h2>
      <h2 className="">{props.description}</h2>
      {props.picturePath && (
        <img
          src={`https://play-pause-api.onrender.com/posts/${props.picturePath}`}
          alt="POST"
          className="w-full h-auto mt-[0.75rem] rounded-[0.75rem]"
        />
      )}
      <div className="flex justify-between items-center mt-[1rem]">
        <div className="flex justify-between items-center mt-[1rem]">
          <div className="flex justify-between items-center gap-4">
            <div className="flex justify-between items-center gap-[0.3rem]">
              <span onClick={patchLike}>
                {isliked ? (
                  <MdOutlineFavorite className="text-[20px] text-[red] hover:cursor-pointer" />
                ) : (
                  <MdOutlineFavoriteBorder className="text-[20px] hover:cursor-pointer" />
                )}
              </span>
              <h3 className="text-[20px]">{props.likes.length}</h3>
            </div>
            <div
              className="flex justify-between items-center gap-[0.3rem]"
              onClick={() => setIsComments(!isComments)}
            >
              <MdChat className="text-[20px] hover:cursor-pointer" />
              <h3 className="text-[20px]">{props.comments.length}</h3>
            </div>
          </div>
        </div>
        <div className="flex justify-between items-center mt-[1rem] gap-4">
          <div className="flex justify-between items-center gap-[0.3rem]">
            <span onClick={patchSave}>
              {isSaved ? (
                <BsBookmarkHeartFill className="text-[20px] text-[red] hover:cursor-pointer" />
              ) : (
                <BsBookmarkHeart className="text-[20px] hover:cursor-pointer" />
              )}
            </span>
            {/* <h3 className="text-[20px]">{props.savedBy.length}</h3> */}
          </div>
          <div>
            <MdShare className="text-[20px] hover:cursor-pointer" />
          </div>
        </div>
      </div>
      {isComments && (
        <div className="mt-[0.5rem]">
          <div className="w-full flex justify-between items-center">
            <InputBase
              placeholder="What's on your mind..."
              onChange={(e) => setComment(e.target.value)}
              value={comment}
              sx={{
                width: "98%",
                backgroundColor: "#252525",
                borderRadius: "1rem",
                padding: "0.2rem 1rem",
                margin: "1rem 0.2rem",
                color: "#aaa",
              }}
            />
            <button
              disabled={!comment}
              onClick={handleComment}
              className="hover:cursor-pointer hover:text-red-500 font-bold"
            >
              Comment
            </button>
          </div>
          {props.comments.map((comment, i) => (
            <div>
              <div
                className="flex items-center gap-3 w-full hover:bg-[#252525] px-2 py-[2px] "
                key={i}
              >
                <div className="h-[22px] w-[22px]">
                  <img
                    className="rounded-[20%] object-cover w-[22px] h-[22px]"
                    src={`https://play-pause-api.onrender.com/userProfile/${comment.commentedbyPic}`}
                    alt="user"
                  />
                </div>
                <h3>{comment.commentedby}</h3>
                <h3>{comment.comment}</h3>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Posts;
