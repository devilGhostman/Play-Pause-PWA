import React, { useEffect, useState } from "react";
import { InputBase } from "@mui/material";
import Dropzone from "react-dropzone";
import {
  MdAttachFile,
  MdDelete,
  MdEdit,
  MdImage,
  MdVideocam,
} from "react-icons/md";
import { RiFileGifFill } from "react-icons/ri";

import { useSession } from "next-auth/react";
import axios from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/router";

type imageType = {
  lastModified: Date;
  name: string;
  path: string;
  size: number;
  type: string;
};

const PostCreate = () => {
  const { data, status } = useSession();
  const router = useRouter();
  const [post, setPost] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const [image, setImage] = useState<imageType | any | null | File>();
  const [isImage, setIsImage] = useState(false);

  const handlePost = async () => {
    const form = new FormData();
    form.append("userId", `${data?.user.id}`);
    form.append("title", `${title}`);
    form.append("description", `${description}`);

    if (image) {
      form.append("picture", image);
      form.append("picturePath", image.name);
    }

    await axios
      .post("https://play-pause-api.onrender.com/api/post/", form, {
        headers: {
          Authorization: `Bearer ${data?.user.token}`,
          "Content-Type": "multipart/form-data",
        },
      })
      .then(() => {
        toast.success("Posted !!");
      })
      .then(() => {
        setTimeout(() => {
          router.reload();
        }, 700);
      })
      .catch((error) => {
        toast.error(error);
      });

    setTitle("");
    setDescription("");
  };

  return (
    <div className="pr-[1.5rem] pl-[0.75rem] py-[1.5rem] rounded-[0.75rem] bg-[#141414] ">
      <div className="flex justify-center items-center gap-6">
        <div className="h-[60px] w-[60px]">
          <img
            className="rounded-[20%] object-cover w-[60px] h-[60px]"
            src={`https://play-pause-api.onrender.com/userProfile/${data?.user?.image}`}
            alt="user"
          />
        </div>
        <InputBase
          placeholder="What's on your mind..."
          onChange={(e) => setTitle(e.target.value)}
          value={title}
          sx={{
            width: "100%",
            backgroundColor: "#252525",
            borderRadius: "1rem",
            padding: "1rem 2rem",
            color: "#aaa",
          }}
        />
      </div>
      <InputBase
        placeholder="Add description to it..."
        onChange={(e) => setDescription(e.target.value)}
        value={description}
        sx={{
          width: "100%",
          backgroundColor: "#252525",
          borderRadius: "1rem",
          padding: "1rem 2rem",
          marginTop: "1rem",
          color: "#aaa",
        }}
      />
      {isImage && (
        <div className="p-4 mt-4 rounded-[5px] border-4 border-white">
          <Dropzone
            // acceptedFiles=".jpg,.jpeg,.png"
            multiple={false}
            onDrop={(acceptedFiles) => setImage(acceptedFiles[0])}
          >
            {({ getRootProps, getInputProps }) => (
              <div className="flex justify-between items-center">
                <div
                  className="p-4 w-full hover:cursor-pointer border-dotted border-2 border-white"
                  {...getRootProps()}
                >
                  <input type="file" {...getInputProps()} />
                  {!image ? (
                    <p>
                      Drag 'n' drop some image here, or click to select image
                    </p>
                  ) : (
                    <div className="flex justify-between items-center">
                      <h3>{image.name}</h3>
                      <MdEdit className="hover:cursor-pointer text-[20px]" />
                    </div>
                  )}
                </div>
                {image && (
                  <div
                    onClick={() => setImage(null)}
                    className="hover:cursor-pointer text-[20px]"
                  >
                    <MdDelete />
                  </div>
                )}
              </div>
            )}
          </Dropzone>
        </div>
      )}

      <div className="my-5 mx-0  h-1 border-b-4 border-[red]"></div>

      <div className="flex justify-between items-center">
        <div
          className="flex justify-between items-center gap-[0.25rem] hover:cursor-pointer"
          onClick={() => setIsImage(!isImage)}
        >
          <MdImage className="text-[25px]" />
          <h2>Image</h2>
        </div>

        <div className="hidden sm:flex justify-between items-center gap-[0.25rem] ">
          <RiFileGifFill className="text-[25px]" />
          <h2>GIF</h2>
        </div>
        <div className="hidden sm:flex justify-between items-center gap-[0.25rem]">
          <MdVideocam className="text-[25px]" />
          <h2>Video</h2>
        </div>
        <div className="hidden sm:flex justify-between items-center gap-[0.25rem]">
          <MdAttachFile className="text-[25px]" />
          <h2>Attach File</h2>
        </div>
        <button
          disabled={!title}
          onClick={handlePost}
          type="submit"
          className="mr-2 pr-2 text-[18px] font-bold hover:cursor-pointer hover:text-red-500"
        >
          POST
        </button>
      </div>
    </div>
  );
};

export default PostCreate;
