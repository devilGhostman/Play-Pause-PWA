import { Box, InputAdornment, TextField } from "@mui/material";
import DialogActions from "@mui/material/DialogActions";

import { useForm, SubmitHandler } from "react-hook-form";

import { object, string, TypeOf } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { useEffect, useState } from "react";

import { MdEmail, MdPassword } from "react-icons/md";
import { GoMarkGithub } from "react-icons/go";
import { BsPersonBadgeFill } from "react-icons/bs";

import { signIn, useSession } from "next-auth/react";

import LoadingStyle from "../loadingStyle/LoadingStyle";
import toast from "react-hot-toast";

const signinSchema = object({
  email: string().nonempty("Email is required").email("Email is invalid"),
  password: string()
    .nonempty("Password is required")
    .min(8, "Password must be more than 8 characters")
    .max(32, "Password must be less than 32 characters"),
});

type SigninInput = TypeOf<typeof signinSchema>;

const LogIn = ({ handlecloseHandler }: any) => {
  const { data, status } = useSession();
  const [authStatuserror, setauthStatuserror] = useState(true);

  const {
    register,
    formState: { errors, isSubmitSuccessful },
    reset,
    handleSubmit,
  } = useForm<SigninInput>({
    resolver: zodResolver(signinSchema),
  });

  // useEffect(() => {
  //   if (isSubmitSuccessful) {
  //     reset();
  //   }
  // }, [isSubmitSuccessful]);

  const handleClose = () => {
    handlecloseHandler((prev: boolean) => !prev);
  };

  const onLoginHandler: SubmitHandler<SigninInput> = async (values) => {
    const resp = await signIn("credentials", {
      redirect: false,
      email: values.email,
      password: values.password,
      // callbackUrl: "/",
    });

    if (status === "unauthenticated") {
      setauthStatuserror(false);
    }

    if (status === "loading") {
      return <LoadingStyle />;
    }

    if (status === "authenticated") {
      toast.success("Login Successfully !!!");
      handlecloseHandler((prev: boolean) => !prev);
    }
  };

  async function handleGithubSignin() {
    signIn("github", { callbackUrl: "/" });
  }

  const onGuestLogin = async () => {
    await signIn("credentials", {
      redirect: false,
      email: "rahul@gmail.com",
      password: "test@123",
      // callbackUrl: "/",
    });
    toast.success("Login Successfully !!!");
    if (status === "authenticated") {
      handlecloseHandler((prev: boolean) => !prev);
    }
  };

  return (
    <div className="flex justify-center content-center flex-col p-3 bg-[#0f1111] text-[white]">
      <div className="flex justify-center content-center">
        <div className="flex justify-center content-center max-w-[90%] md:max-w-[80%] flex-col">
          <div className="flex justify-between">
            <div className="pb-2 flex flex-col justify-center">
              <p className="text-[30px]">Login</p>
              <p className="text-[12px]">Welcome Back</p>
            </div>
            <img src="../login.png" className="w-[35%]" />
          </div>

          <div className="text-[red]">
            <Box sx={{ maxWidth: "30rem" }}>
              <Box
                component="form"
                noValidate
                autoComplete="off"
                onSubmit={handleSubmit(onLoginHandler)}
              >
                <TextField
                  label="Email"
                  fullWidth
                  required
                  type="email"
                  margin="dense"
                  placeholder="Enter your email"
                  error={!!errors["email"]}
                  helperText={errors["email"] ? errors["email"].message : ""}
                  sx={{
                    "& .MuiInputLabel-root": { color: "#aaa" }, //styles the label
                    "& .MuiOutlinedInput-root": {
                      "& > fieldset": { borderColor: "#363a3c" },
                    },
                    "& .MuiOutlinedInput-root.Mui-focused": {
                      "& > fieldset": {
                        borderColor: "white",
                        color: "#aaa",
                      },
                    },
                    "& .MuiOutlinedInput-root:hover": {
                      "& > fieldset": {
                        borderColor: "white",
                        color: "#aaa",
                      },
                    },
                    "& .MuiInputBase-root": {
                      color: "#aaa",
                    },
                  }}
                  variant="outlined"
                  {...register("email")}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <MdEmail className="text-[#757575] text-xl" />
                      </InputAdornment>
                    ),
                  }}
                />
                <TextField
                  label="Password"
                  margin="dense"
                  fullWidth
                  required
                  type="password"
                  placeholder="Enter your password"
                  error={!!errors["password"]}
                  helperText={
                    errors["password"] ? errors["password"].message : ""
                  }
                  sx={{
                    "& .MuiInputLabel-root": { color: "#aaa" }, //styles the label
                    "& .MuiOutlinedInput-root": {
                      "& > fieldset": { borderColor: "#363a3c" },
                    },
                    "& .MuiOutlinedInput-root.Mui-focused": {
                      "& > fieldset": {
                        borderColor: "white",
                        color: "#aaa",
                      },
                    },
                    "& .MuiOutlinedInput-root:hover": {
                      "& > fieldset": {
                        borderColor: "white",
                        color: "#aaa",
                      },
                    },
                    "& .MuiInputBase-root": {
                      color: "#aaa",
                    },
                  }}
                  variant="outlined"
                  {...register("password")}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <MdPassword className="text-[#757575] text-xl" />
                      </InputAdornment>
                    ),
                  }}
                />
                <DialogActions>
                  <button
                    className="px-3 py-2 text-[#aaa] cursor-pointer hover:text-[white]"
                    onClick={handleClose}
                    type="reset"
                  >
                    Cancel
                  </button>
                  <button
                    color="primary"
                    className="border-2 border-[#aaa] rounded-lg px-3 py-2 text-[white] cursor-pointer hover:border-[red] hover:bg-[red] hover:text-[white]"
                    type="submit"
                  >
                    Log In
                  </button>
                </DialogActions>
              </Box>
              {!authStatuserror && (
                <div className="w-full h-[40px] flex justify-center items-center border-2 border-[red] rounded-lg text-[white] my-2  bg-[red]">
                  Wrong Credentials Entered
                </div>
              )}
              <div>
                <button
                  className="w-full h-[40px] flex justify-center items-center border-2 border-[#aaa] rounded-lg text-[#aaa] my-2 hover:border-[red] hover:bg-[red] hover:text-[white]"
                  type="button"
                  onClick={handleGithubSignin}
                >
                  <GoMarkGithub className="mr-4 text-xl" />
                  Sign In with Github
                </button>
                <button
                  className="w-full h-[40px] flex justify-center items-center border-2 border-[#aaa] rounded-lg text-[#aaa] my-2 hover:border-[red] hover:bg-[red] hover:text-[white]"
                  type="button"
                  onClick={onGuestLogin}
                >
                  <BsPersonBadgeFill className="mr-4 text-xl" />
                  Sign In as Guest
                </button>
              </div>
            </Box>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LogIn;
