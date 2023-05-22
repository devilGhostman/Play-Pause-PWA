import {
  Box,
  FormControlLabel,
  FormGroup,
  FormHelperText,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import Checkbox from "@mui/material/Checkbox";

import { useForm, SubmitHandler } from "react-hook-form";
import { any, literal, object, optional, string, TypeOf } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Dropzone from "react-dropzone";

import { useEffect, useState } from "react";

import { IoLocation, IoPerson } from "react-icons/io5";
import {
  MdDelete,
  MdEdit,
  MdEmail,
  MdImage,
  MdPassword,
  MdPhone,
  MdWork,
} from "react-icons/md";

import DialogActions from "@mui/material/DialogActions";

import axios from "../../axios/axios";
import toast from "react-hot-toast";
import { SiGhostery } from "react-icons/si";

const registerSchema = object({
  userName: string()
    .nonempty("Name is required")
    .max(32, "Name must be less than 100 characters"),
  email: string().nonempty("Email is required").email("Email is invalid"),
  phoneNumber: string().nonempty("Phone Number is required").min(10).max(10),
  location: string().nonempty("Location is required"),
  occupation: string().nonempty("Occupation is required"),
  password: string()
    .nonempty("Password is required")
    .min(8, "Password must be more than 8 characters")
    .max(32, "Password must be less than 32 characters"),
  passwordConfirm: string().nonempty("Please confirm your password"),
  terms: literal(true, {
    invalid_type_error: "Accept Terms is required",
  }),
}).refine((data) => data.password === data.passwordConfirm, {
  path: ["passwordConfirm"],
  message: "Passwords do not match",
});

type RegisterInput = TypeOf<typeof registerSchema>;
type imageType = {
  lastModified: Date;
  name: string;
  path: string;
  size: number;
  type: string;
};

interface values {
  [key: string]: string | boolean;
}

const Signup = ({ handlecloseHandler }: any) => {
  const [image, setImage] = useState<any>();
  const [isImage, setIsImage] = useState(false);
  const {
    register,
    formState: { errors, isSubmitSuccessful },
    reset,
    handleSubmit,
  } = useForm<RegisterInput>({
    resolver: zodResolver(registerSchema),
  });

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset();
    }
  }, [isSubmitSuccessful]);

  const onSubmitHandler: SubmitHandler<RegisterInput> = (values) => {
    const val: values = values;
    var form = new FormData();

    for (var key in val) {
      if (val.hasOwnProperty(key)) {
        form.append(key, val[key].toString());
      }
    }

    if (image) {
      form.append("picture", image);
      form.append("picturePath", image.name);
    }
    const json = JSON.stringify(values);
    axios
      .post("/users/signup/", form, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        // headers: {
        //   Accept: "application/json",
        //   "Content-Type": "application/json",
        // },
      })
      .then(() => toast.success("Account Created"))
      .then(() => handlecloseHandler((prev: boolean) => !prev))
      .then(() => console.log("signup done"))
      .catch((error) => console.log(error));
  };

  const handleClose = () => {
    handlecloseHandler((prev: boolean) => !prev);
  };

  return (
    <div className="flex justify-center content-center flex-col md:p-3 p-1 bg-[#0f1111] text-[white]">
      <div className="flex justify-center content-center">
        <div className="flex justify-center content-center max-w-[90%]  md:max-w-[80%] flex-col">
          <div className="flex justify-between">
            <div className="pb-2 flex flex-col justify-center">
              <p className="text-[30px]">Register here</p>
              <p className="text-[12px]">Create an account</p>
            </div>
            <img src="../signup.png" className="w-[35%] scale-x-[-1]" />
          </div>
          <div className="text-white">
            <Box sx={{ maxWidth: "30rem" }}>
              <Box
                component="form"
                noValidate
                autoComplete="off"
                onSubmit={handleSubmit(onSubmitHandler)}
              >
                <TextField
                  margin="dense"
                  label="UserName"
                  placeholder="Enter Username"
                  fullWidth
                  color="primary"
                  required
                  error={!!errors["userName"]}
                  helperText={
                    errors["userName"] ? errors["userName"].message : ""
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
                  {...register("userName")}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <IoPerson className="text-[#757575] text-xl" />
                      </InputAdornment>
                    ),
                  }}
                />
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
                  label="Phone Number"
                  fullWidth
                  required
                  type="tel"
                  margin="dense"
                  placeholder="Enter your Phone Number"
                  error={!!errors["phoneNumber"]}
                  helperText={
                    errors["phoneNumber"] ? errors["phoneNumber"].message : ""
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
                  {...register("phoneNumber")}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <MdPhone className="text-[#757575] text-xl" />
                      </InputAdornment>
                    ),
                  }}
                />
                <TextField
                  margin="dense"
                  label="Location"
                  placeholder="Enter Location"
                  fullWidth
                  color="primary"
                  required
                  error={!!errors["location"]}
                  helperText={
                    errors["location"] ? errors["location"].message : ""
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
                  {...register("location")}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <IoLocation className="text-[#757575] text-xl" />
                      </InputAdornment>
                    ),
                  }}
                />
                <TextField
                  margin="dense"
                  label="Occupation"
                  placeholder="Enter Occupation"
                  fullWidth
                  color="primary"
                  required
                  error={!!errors["occupation"]}
                  helperText={
                    errors["occupation"] ? errors["occupation"].message : ""
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
                  {...register("occupation")}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <MdWork className="text-[#757575] text-xl" />
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
                  {...register("password")}
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
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <MdPassword className="text-[#757575] text-xl" />
                      </InputAdornment>
                    ),
                  }}
                />
                <TextField
                  margin="dense"
                  label="Confirm Password"
                  fullWidth
                  required
                  type="password"
                  placeholder="Enter your password"
                  error={!!errors["passwordConfirm"]}
                  helperText={
                    errors["passwordConfirm"]
                      ? errors["passwordConfirm"].message
                      : ""
                  }
                  {...register("passwordConfirm")}
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
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <MdPassword className="text-[#757575] text-xl" />
                      </InputAdornment>
                    ),
                  }}
                />
                <div
                  className="flex justify-start items-center gap-[0.7rem] my-1 hover:cursor-pointer"
                  onClick={() => setIsImage(!isImage)}
                >
                  <SiGhostery className="text-[20px]" />
                  <h2>Choose Avatar for Yourself</h2>
                </div>
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
                                Drag 'n' drop some image here, or click to
                                select image
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
                <FormGroup>
                  <FormControlLabel
                    control={<Checkbox required />}
                    {...register("terms")}
                    label={
                      <Typography color={errors["terms"] ? "error" : "inherit"}>
                        Accept Terms and Conditions
                      </Typography>
                    }
                  />
                  <FormHelperText error={!!errors["terms"]}>
                    {errors["terms"] ? errors["terms"].message : ""}
                  </FormHelperText>
                </FormGroup>
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
                    New Account
                  </button>
                </DialogActions>
              </Box>
            </Box>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
