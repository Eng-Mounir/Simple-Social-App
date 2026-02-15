import React from "react";
import { Input, Select, SelectItem } from "@heroui/react";
import { Link,useNavigate } from "react-router-dom";
import { useState } from "react";
import { useForm,Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { registrationSchema } from "../../../lib/schema/authSchema";
import { IoEye, IoEyeOff } from "react-icons/io5";
import { registerUser } from "../../../services/authServices";
export default function Registration() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const gender = [
    { key: "male", label: "Male" },
    { key: "female", label: "Female" },
  ];
 //dh 3ashan a3mlo navigate ly login ba3d ma yregister b success
  const navigate = useNavigate();

  const {register,handleSubmit,control, formState: {errors }, reset} = useForm({
    resolver: zodResolver(registrationSchema),
    mode: "all",
  defaultValues: {
  name: "",
  email: "",
  password: "",
  rePassword: "",
  dateOfBirth: "",
  gender: undefined, 
}
});


async function onSubmit(objDataUser7taha) {
  console.log("Sending:", objDataUser7taha);

  try {
    const response = await registerUser(objDataUser7taha);

    console.log("Registration successful:", response);

    if (response.data.message === "success") {
      reset();
      navigate("/auth/login");
    }

  } catch (error) {
    console.error("Registration failed:", error.response?.data);
  }
}


  return (
    <main className="p-8 max-w-md mx-auto">
      <h1 className="text-4xl font-bold mb-2">Welcome to Nextify</h1>
      <p className="text-lg font-medium mb-6">Sign Up to Join Our Community</p>

      <form autoComplete="off" className="space-y-5 w-full" onSubmit={handleSubmit(onSubmit)}>
        <Input
  {...register("name")}
  label="Name"
  type="text"
  errorMessage={errors.name?.message}
  isInvalid={Boolean(errors.name)}
/>

<Input
  {...register("email")}
  label="Email"
  type="email"
  errorMessage={errors.email?.message}
  isInvalid={Boolean(errors.email)}
/>

<Input
  {...register("password")}
  label="Password"
  type={showPassword ? "text" : "password"}
  errorMessage={errors.password?.message}
  isInvalid={Boolean(errors.password)}
  endContent={
    showPassword ? (
      <IoEyeOff
        className="cursor-pointer text-2xl"
        onClick={() => setShowPassword(false)}
      />
    ) : (
      <IoEye
        className="cursor-pointer text-2xl"
        onClick={() => setShowPassword(true)}
      />
    )
  }
/>



<Input
  {...register("rePassword")}
  label="Re-Password"
  type={showConfirmPassword ? "text" : "password"}
  errorMessage={errors.rePassword?.message}
  isInvalid={Boolean(errors.rePassword)}
  endContent={
    showConfirmPassword ? (
      <IoEyeOff
        className="cursor-pointer text-2xl"
        onClick={() => setShowConfirmPassword(false)}
      />
    ) : (
      <IoEye
        className="cursor-pointer text-2xl"
        onClick={() => setShowConfirmPassword(true)}
      />
    )
  }
/>



        {/* Birthdate & Gender Row */}
        <div className="flex flex-col sm:flex-row gap-4">
          <Input {...register("dateOfBirth")} label="BirthDate" type="date" className="flex-1" errorMessage={errors.dateOfBirth?.message}
  isInvalid={Boolean(errors.dateOfBirth)} />


  
<Controller
  autoComplete="off"
  name="gender"
  control={control}
  defaultValue={undefined}
  render={({ field }) => (
    <Select
      label="Gender"
      selectedKeys={field.value ? new Set([field.value]) : new Set()}
      onSelectionChange={(keys) => {
        const value = Array.from(keys)[0];
        field.onChange(value);
      }}
      className="flex-1"
      errorMessage={errors.gender?.message}
      isInvalid={Boolean(errors.gender)}
    >
      {gender.map((g) => (
        <SelectItem key={g.key}>{g.label}</SelectItem>
      ))}
    </Select>
  )}
/>


        </div>

        {/* Submit button */}
        <button
          type="submit"
          className="w-full px-6 py-2 bg-primary text-white rounded font-semibold"
        >
          Sign Up
        </button>

        {/* Already have account */}
        <p className="text-center">
          Already have an account?{" "}
          <Link to="/auth/login" className="text-secondary font-semibold">
            Login
          </Link>
        </p>
      </form>
    </main>
  );
}

