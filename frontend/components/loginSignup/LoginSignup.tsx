import { useState } from "react";

import { FaPowerOff } from "react-icons/fa";
import { MdLogout } from "react-icons/md";

import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
// import { withStyles } from "@material-ui/core/styles";

import { signOut, useSession } from "next-auth/react";

import LogIn from "./LogIn";
import Signup from "./Signup";

import Link from "next/link";

const LoginSignup = () => {
  const { data, status } = useSession();

  const [isSignup, setisSignup] = useState(true);
  const [isSignin, setisSignin] = useState(false);
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setTimeout(() => {
      setisSignup(true);
    }, 500);
  };

  const handlecloseHandler = (checkClose: boolean) => {
    setOpen(checkClose);
    setisSignup(true);
  };

  const onSignOut = () => {
    setisSignin(!isSignin);
    signOut({ callbackUrl: "https://play-pause-pwa.vercel.app/" });
    setOpen(false);
  };

  return (
    <div>
      {data ? (
        <>
          <MdLogout onClick={handleClickOpen} className="text-2xl" />
          {/* <div className="h-[25px] w-[25px]">
            <img
              className="rounded-[20%] object-cover w-[25px] h-[25px]"
              src={`http://localhost:5000/userProfile/${data?.user.image}`}
              alt="user"
            />
          </div> */}
        </>
      ) : (
        <>
          <FaPowerOff onClick={handleClickOpen} className="text-2xl" />
        </>
      )}
      <Dialog open={open} onClose={handleClose}>
        {!isSignup && !data && (
          <>
            <Signup handlecloseHandler={handlecloseHandler} />
            <div className="bg-[#0f1111]">
              <div className="flex justify-center item-center text-[14px] md:text-[16px] mb-4 w-full bg-[#0f1111]">
                <h1 className="text-[#aaa] ">Already have account !!</h1>

                <button
                  className="px-2 text-[red] "
                  onClick={() => setisSignup(!isSignup)}
                >
                  Sign In here
                </button>
              </div>
            </div>
          </>
        )}
        {isSignup && !data && (
          <>
            <LogIn handlecloseHandler={handlecloseHandler} />
            <div className="bg-[#0f1111]">
              <div className="flex justify-center item-center text-[14px] md:text-[16px] mb-4 w-full bg-[#0f1111] ">
                <h1 className="text-[#aaa]">Do Not have account ?</h1>
                <button
                  className="px-2 text-[red]"
                  onClick={() => setisSignup(!isSignup)}
                >
                  Sign up here
                </button>
              </div>
            </div>
          </>
        )}
        {data && (
          <div className="flex justify-between content-center flex-col  border-[#243c5a] bg-[#191b1d] text-[white]">
            <div className="flex justify-center content-center m-5 px-2">
              <div className="pb-2">
                <p className="text-[20px]">Are You Sure, You want to quit</p>
                <p className="text-[16px]">Hope You Come Back Soon !!</p>
              </div>
            </div>
            <div>
              <DialogActions>
                <button
                  className="px-3 py-2 text-[#aaa] cursor-pointer hover:text-[white]"
                  onClick={handleClose}
                >
                  Cancel
                </button>
                <button
                  color="primary"
                  className="border-2 border-[#aaa] rounded-lg px-3 py-2 text-[#aaa] cursor-pointer hover:border-[red] hover:bg-[red] hover:text-[white]"
                  type="submit"
                  onClick={onSignOut}
                >
                  Log Out
                </button>
              </DialogActions>
            </div>
          </div>
        )}
      </Dialog>
    </div>
  );
};

export default LoginSignup;
