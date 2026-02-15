// import React from "react";
// import { Input, Select, SelectItem,Button } from "@heroui/react";
// import { Link, useNavigate } from "react-router-dom";
// import { useState } from "react";
// import { useForm, Controller } from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { registrationSchema } from "../../../lib/schema/authSchema";
// import { IoEye, IoEyeOff } from "react-icons/io5";
// import { registerUser } from "../../../services/authServices";
// import { set } from "zod";

// export default function Registration() {
//   const [showPassword, setShowPassword] = useState(false);
//   const [showConfirmPassword, setShowConfirmPassword] = useState(false);
//   const [errorMsg, setErrorMsg] = useState("");
//   const [successMsg, setSuccessMsg] = useState("");

//   const gender = [
//     { key: "male", label: "Male" },
//     { key: "female", label: "Female" },
//   ];

//   const navigate = useNavigate();

//   const {
//     register,
//     handleSubmit,
//     control,
//     formState: { errors, isSubmitting},
//     reset,
//     setValue,
//   } = useForm({
//     resolver: zodResolver(registrationSchema),
//     mode: "all",
//     defaultValues: {
//       name: "",
//       email: "",
//       password: "",
//       rePassword: "",
//       dateOfBirth: "",
//       gender: "",
//     },
//   });

//   async function onSubmit(objDataUser7taha) {
//     console.log("Sending:", objDataUser7taha);
//     try {
//       setErrorMsg("");
//       setSuccessMsg("");
//       const response = await registerUser(objDataUser7taha);
//       console.log("Registration successful:", response.data);
//       setSuccessMsg(response.data.message || "Registration successful");
//       if (response.data?.message === "success") {
//         reset();
//         navigate("/auth/login");
//       }
//     } catch (error) {
//       console.log("Registration failed:", error);
//       setErrorMsg(error.response?.data?.error || "An error occurred during registration");
//     }
//   }

//   return (
//     <main className="p-8 max-w-md mx-auto">
//       <h1 className="text-4xl font-bold mb-2">Welcome to Nextify</h1>
//       <p className="text-lg font-medium mb-6">Sign Up to Join Our Community</p>

//       <form
//         autoComplete="off"
//         className="space-y-5 w-full"
//         onSubmit={handleSubmit(onSubmit)}
//       >
//         <Input
//           {...register("name")}
//           label="Name"
//           type="text"
//           errorMessage={errors.name?.message}
//           isInvalid={Boolean(errors.name)}
//         />

//         <Input
//           {...register("email")}
//           label="Email"
//           type="email"
//           errorMessage={errors.email?.message}
//           isInvalid={Boolean(errors.email)}
//         />

//         <Input
//           {...register("password")}
//           label="Password"
//           type={showPassword ? "text" : "password"}
//           errorMessage={errors.password?.message}
//           isInvalid={Boolean(errors.password)}
//           endContent={
//             showPassword ? (
//               <IoEyeOff
//                 className="cursor-pointer text-2xl"
//                 onClick={() => setShowPassword(false)}
//               />
//             ) : (
//               <IoEye
//                 className="cursor-pointer text-2xl"
//                 onClick={() => setShowPassword(true)}
//               />
//             )
//           }
//         />

//         <Input
//           {...register("rePassword")}
//           label="Re-Password"
//           type={showConfirmPassword ? "text" : "password"}
//           errorMessage={errors.rePassword?.message}
//           isInvalid={Boolean(errors.rePassword)}
//           endContent={
//             showConfirmPassword ? (
//               <IoEyeOff
//                 className="cursor-pointer text-2xl"
//                 onClick={() => setShowConfirmPassword(false)}
//               />
//             ) : (
//               <IoEye
//                 className="cursor-pointer text-2xl"
//                 onClick={() => setShowConfirmPassword(true)}
//               />
//             )
//           }
//         />

//         {/* Birthdate & Gender Row */}
//         <div className="flex flex-col sm:flex-row gap-4">
//           <Input
//             {...register("dateOfBirth")}
//             label="BirthDate"
//             type="date"
//             className="flex-1"
//             errorMessage={errors.dateOfBirth?.message}
//             isInvalid={Boolean(errors.dateOfBirth)}
//           />

//           <Controller
//             name="gender"
//             control={control}
//             render={({ field }) => (
//               <Select
//                 label="Gender"
//                 selectedKeys={field.value ? [field.value.toLowerCase()] : []}
//                 onSelectionChange={(keys) => {
//                   const selectedValue = Array.from(keys)[0];
//                   // Always store as lowercase
//                   field.onChange(selectedValue?.toLowerCase() || "");
//                 }}
//                 className="flex-1"
//                 errorMessage={errors.gender?.message}
//                 isInvalid={Boolean(errors.gender)}
//               >
//                 {gender.map((g) => (
//                   <SelectItem key={g.key}>
//                     {g.label}
//                   </SelectItem>
//                 ))}
//               </Select>
//             )}
//           />
//         </div>

//         {/* Submit button */}
//         <Button
//           type="submit"
//           className="w-full px-6 py-2 bg-primary text-white rounded font-semibold"
//           isLoading={isSubmitting}
//         >
//           Sign Up
//         </Button>

//         {/* Already have account */}
//         <p className="text-center">
//           Already have an account?{" "}
//           <Link to="/auth/login" className="text-secondary font-semibold">
//             Login
//           </Link>
//         </p>

//         {errorMsg && <p className="bg-red-600 text-white text-center text-xl rounded-2xl p-2">{errorMsg}</p>}
//         {successMsg && <p className="bg-green-600 text-white text-center text-xl rounded-2xl p-2">{successMsg}</p>}
//       </form>
//     </main>
//   );
// }









{/*Nafs el functionalty byta3t foo2 bs design ahla*/}
import React from "react";
import { Input, Select, SelectItem, Button, Card, CardBody, CardHeader, Divider } from "@heroui/react";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { registrationSchema } from "../../../lib/schema/authSchema";
import { IoEye, IoEyeOff } from "react-icons/io5";
import { registerUser } from "../../../services/authServices";
import { toast } from "react-toastify";

export default function Registration() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  const gender = [
    { key: "male", label: "Male" },
    { key: "female", label: "Female" },
  ];

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
    reset,
    setValue,
  } = useForm({
    resolver: zodResolver(registrationSchema),
    mode: "all",
    defaultValues: {
      name: "",
      email: "",
      password: "",
      rePassword: "",
      dateOfBirth: "",
      gender: "",
    },
  });

  async function onSubmit(objDataUser7taha) {
    console.log("Sending:", objDataUser7taha);
    try {
      setErrorMsg("");
      setSuccessMsg("");
      const response = await registerUser(objDataUser7taha);
      console.log("Registration successful:", response.data);
      // setSuccessMsg(response.data.message || "Registration successful");
      toast.success(response.data.message || "Registration successful", {
        position:"bottom-center",
        autoClose: 3000,
        pauseOnHover: true,
      });
      if (response.data?.message === "success") {
        reset();
        navigate("/auth/login");
      }
    } catch (error) {
      console.log("Registration failed:", error);
      // setErrorMsg(
      //   error.response?.data?.error || "An error occurred during registration"
      // );
      toast.error(error.response?.data?.error || "An error occurred during registration", {
        position:"bottom-center",
        autoClose: 3000,
        pauseOnHover: true,
      });
    }
  }

  return (
    <div className="w-full max-w-lg px-6">
      <Card className="w-full shadow-2xl border border-default-200">
        <CardHeader className="flex flex-col gap-3 items-center justify-center pt-8 pb-4">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-600 to-pink-600 flex items-center justify-center shadow-lg">
            <span className="text-3xl font-bold text-white">N</span>
          </div>
          <div className="text-center">
            <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              Welcome to Nextify
            </h1>
            <p className="text-default-500 text-sm mt-1">
              Sign Up to Join Our Community
            </p>
          </div>
        </CardHeader>

        <Divider />

        <CardBody className="px-8 py-6">
          <form
            autoComplete="off"
            className="space-y-4 w-full"
            onSubmit={handleSubmit(onSubmit)}
          >
            <Input
              {...register("name")}
              label="Full Name"
              type="text"
              placeholder="Enter your full name"
              variant="bordered"
              size="lg"
              radius="lg"
              errorMessage={errors.name?.message}
              isInvalid={Boolean(errors.name)}
              classNames={{
                input: "text-base",
                inputWrapper: "border-2 hover:border-purple-400 focus-within:!border-purple-500",
              }}
            />

            <Input
              {...register("email")}
              label="Email Address"
              type="email"
              placeholder="Enter your email"
              variant="bordered"
              size="lg"
              radius="lg"
              errorMessage={errors.email?.message}
              isInvalid={Boolean(errors.email)}
              classNames={{
                input: "text-base",
                inputWrapper: "border-2 hover:border-purple-400 focus-within:!border-purple-500",
              }}
            />

            <Input
              {...register("password")}
              label="Password"
              placeholder="Create a strong password"
              type={showPassword ? "text" : "password"}
              variant="bordered"
              size="lg"
              radius="lg"
              errorMessage={errors.password?.message}
              isInvalid={Boolean(errors.password)}
              classNames={{
                input: "text-base",
                inputWrapper: "border-2 hover:border-purple-400 focus-within:!border-purple-500",
              }}
              endContent={
                showPassword ? (
                  <IoEyeOff
                    className="cursor-pointer text-2xl text-default-400 hover:text-default-600"
                    onClick={() => setShowPassword(false)}
                  />
                ) : (
                  <IoEye
                    className="cursor-pointer text-2xl text-default-400 hover:text-default-600"
                    onClick={() => setShowPassword(true)}
                  />
                )
              }
            />

            <Input
              {...register("rePassword")}
              label="Confirm Password"
              placeholder="Re-enter your password"
              type={showConfirmPassword ? "text" : "password"}
              variant="bordered"
              size="lg"
              radius="lg"
              errorMessage={errors.rePassword?.message}
              isInvalid={Boolean(errors.rePassword)}
              classNames={{
                input: "text-base",
                inputWrapper: "border-2 hover:border-purple-400 focus-within:!border-purple-500",
              }}
              endContent={
                showConfirmPassword ? (
                  <IoEyeOff
                    className="cursor-pointer text-2xl text-default-400 hover:text-default-600"
                    onClick={() => setShowConfirmPassword(false)}
                  />
                ) : (
                  <IoEye
                    className="cursor-pointer text-2xl text-default-400 hover:text-default-600"
                    onClick={() => setShowConfirmPassword(true)}
                  />
                )
              }
            />

            {/* Birthdate & Gender Row */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Input
                {...register("dateOfBirth")}
                label="Date of Birth"
                type="date"
                variant="bordered"
                size="lg"
                radius="lg"
                className="flex-1"
                errorMessage={errors.dateOfBirth?.message}
                isInvalid={Boolean(errors.dateOfBirth)}
                classNames={{
                  input: "text-base",
                  inputWrapper: "border-2 hover:border-purple-400 focus-within:!border-purple-500",
                }}
              />

              <Controller
                name="gender"
                control={control}
                render={({ field }) => (
                  <Select
                    label="Gender"
                    placeholder="Select"
                    variant="bordered"
                    size="lg"
                    radius="lg"
                    selectedKeys={field.value ? [field.value.toLowerCase()] : []}
                    onSelectionChange={(keys) => {
                      const selectedValue = Array.from(keys)[0];
                      field.onChange(selectedValue?.toLowerCase() || "");
                    }}
                    className="flex-1"
                    errorMessage={errors.gender?.message}
                    isInvalid={Boolean(errors.gender)}
                    classNames={{
                      trigger: "border-2 hover:border-purple-400 data-[focus=true]:border-purple-500",
                    }}
                  >
                    {gender.map((g) => (
                      <SelectItem key={g.key}>{g.label}</SelectItem>
                    ))}
                  </Select>
                )}
              />
            </div>

            {/* Submit button */}
            <Button
              type="submit"
              size="lg"
              radius="lg"
              className="w-full mt-6 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold text-base shadow-lg hover:shadow-xl transition-all"
              isLoading={isSubmitting}
            >
              Sign Up
            </Button>

            {/* Already have account */}
            <p className="text-center text-sm text-default-600 mt-4">
              Already have an account?{" "}
              <Link
                to="/auth/login"
                className="text-purple-600 font-semibold hover:text-pink-600 transition-colors"
              >
                Login
              </Link>
            </p>

            {errorMsg && (
              <Card className="bg-danger-50 border-2 border-danger-200 mt-4">
                <CardBody className="py-3">
                  <p className="text-danger-600 text-center text-sm font-medium">
                    {errorMsg}
                  </p>
                </CardBody>
              </Card>
            )}

            {successMsg && (
              <Card className="bg-success-50 border-2 border-success-200 mt-4">
                <CardBody className="py-3">
                  <p className="text-success-600 text-center text-sm font-medium">
                    {successMsg}
                  </p>
                </CardBody>
              </Card>
            )}
          </form>
        </CardBody>
      </Card>
    </div>
  );
}