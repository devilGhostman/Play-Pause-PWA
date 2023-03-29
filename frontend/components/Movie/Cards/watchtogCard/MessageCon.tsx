import React from "react";

const MessageCon = (props: { user: any; classs: any; message: any }) => {
  if (props.user) {
    return (
      <div className={`rounded p-1 mt-3 flex ${props.classs}`}>
        {`${props.user}: ${props.message}`}
      </div>
    );
  } else {
    return (
      <div
        className={`rounded p-1 mt-2 bg-[#2f2f2f] pt-2 flex text-[#d3d1d1] items-center text-center ${props.classs}`}
      >
        {`You: ${props.message}`}
      </div>
    );
  }
};

export default MessageCon;
