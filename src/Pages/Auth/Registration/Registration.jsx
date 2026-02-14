import React from "react";
import { Input, Select, SelectItem } from "@heroui/react";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { registrationSchema } from "../../../lib/schema/authSchema";

export default function Registration() {
  const gender = [
    { key: "male", label: "Male" },
    { key: "female", label: "Female" },
  ];
  const {register,handleSubmit, formState: {errors}} = useForm({
    resolver: zodResolver(registrationSchema),
    mode: "all",
  defaultValues: {
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    birthdate: "",
    gender: "",
  }
});
  const onSubmit = (data) => {
  console.log(data);
};

  return (
    <main className="p-8 max-w-md mx-auto">
      <h1 className="text-4xl font-bold mb-2">Welcome to Nextify</h1>
      <p className="text-lg font-medium mb-6">Sign Up to Join Our Community</p>

      <form className="space-y-5 w-full" onSubmit={handleSubmit(onSubmit)}>
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
  type="password"
  errorMessage={errors.password?.message}
  isInvalid={Boolean(errors.password)}
/>

<Input
  {...register("confirmPassword")}
  label="Re-Password"
  type="password"
  errorMessage={errors.confirmPassword?.message}
  isInvalid={Boolean(errors.confirmPassword)}
/>

        {/* Birthdate & Gender Row */}
        <div className="flex flex-col sm:flex-row gap-4">
          <Input {...register("birthdate")} label="BirthDate" type="date" className="flex-1" errorMessage={errors.birthdate?.message}
  isInvalid={Boolean(errors.birthdate)} />
          <Select {...register("gender")} label="Gender" className="flex-1" errorMessage={errors.gender?.message}
  isInvalid={Boolean(errors.gender)}>
            {gender.map((g) => (
              <SelectItem key={g.key}>{g.label}</SelectItem>
            ))}
          </Select>
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
