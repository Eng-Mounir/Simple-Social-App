import React from "react";
import { Input, Button, Card, CardBody, CardHeader, Divider } from "@heroui/react";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "../../../lib/schema/authSchema";
import { IoEye, IoEyeOff } from "react-icons/io5";
import { loginUser } from "../../../services/authServices";
import { toast } from "react-toastify";

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm({
    resolver: zodResolver(loginSchema),
    mode: "all",
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(loginData) {
    console.log("Sending:", loginData);
    try {
      setErrorMsg("");
      setSuccessMsg("");
      const response = await loginUser(loginData);
      console.log("Login successful:", response.data);
      // setSuccessMsg(response.data.message || "Login successful");
      toast.success(response.data.message || "Login successful", {
        position:"top-center",
        autoClose: 3000,
        pauseOnHover: true,
      });
      console.log("token",response.data.token)
      localStorage.setItem("token", response.data.token);
      if (response.data?.message === "success") {
        // reset();
         // Navigate to home or dashboard
      }
    } catch (error) {
      console.log("Login failed:", error);
      // setErrorMsg(
      //   error.response?.data?.error || "An error occurred during login"
      // );
      toast.error(error.response?.data?.error || "An error occurred during login", {
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
              Welcome Back
            </h1>
            <p className="text-default-500 text-sm mt-1">
              Login to Continue Your Journey
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
              placeholder="Enter your password"
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

            {/* Forgot Password Link */}
            <div className="flex justify-end">
              <Link
                to="/auth/forgot-password"
                className="text-sm text-purple-600 hover:text-pink-600 font-medium transition-colors"
              >
                Forgot Password?
              </Link>
            </div>

            {/* Submit button */}
            <Button
              type="submit"
              size="lg"
              radius="lg"
              className="w-full mt-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold text-base shadow-lg hover:shadow-xl transition-all"
              isLoading={isSubmitting}
            >
              Login
            </Button>

            {/* Don't have account */}
            <p className="text-center text-sm text-default-600 mt-4">
              Don't have an account?{" "}
              <Link
                to="/auth/registration"
                className="text-purple-600 font-semibold hover:text-pink-600 transition-colors"
              >
                Sign Up
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