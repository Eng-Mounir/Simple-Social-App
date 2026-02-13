import React from "react";
import { Input, Select, SelectItem } from "@heroui/react";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useForm } from "react-hook-form";

export default function Registration() {
  const gender = [
    { key: "male", label: "Male" },
    { key: "female", label: "Female" },
  ];
  const {register} = useForm();
  return (
    <main className="p-8 max-w-md mx-auto">
      <h1 className="text-4xl font-bold mb-2">Welcome to Nextify</h1>
      <p className="text-lg font-medium mb-6">Sign Up to Join Our Community</p>

      <form className="space-y-5 w-full">
        <Input {...register("name")} label="Name" type="text"/>
        <Input {...register("email")} label="Email" type="email" defaultValue="example@gmail.com" description="We'll never share your email with anyone else."
        />
        <Input {...register("password")} label="Password" type="password" />
        <Input {...register("confirmPassword")} label="Re-Password" type="password" />

        {/* Birthdate & Gender Row */}
        <div className="flex flex-col sm:flex-row gap-4">
          <Input {...register("birthdate")} label="BirthDate" type="date" className="flex-1" />
          <Select {...register("gender")} label="Gender" className="flex-1">
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
