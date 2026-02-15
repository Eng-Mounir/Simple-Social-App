import * as z from "zod";

export const registrationSchema = z.object({
  name: z.string().nonempty("Name is required").min(3, "Name must be at least 3 characters").max(50, "Name must be less than 50 characters"),
  email: z.email("Invalid email"),
  password: z.string().nonempty("Password is required").min(6, "Password must be at least 6 characters").regex(/^(?=.*[A-Z])(?=.*\d).+$/, "Password must contain at least one uppercase letter and one number"),
  rePassword: z.string().nonempty("Confirm Password is required"),
  dateOfBirth: z.string().nonempty("Birthdate is required").refine((val) => {
    const today = new Date();
    const birth = new Date(val);
    const age = today.getFullYear() - birth.getFullYear();
    return age >= 18;
  }, { message: "You must be at least 18 years old" }),
  gender: z.enum(["male", "female"], {required_error: "Gender is required"})
})
.refine((data) => data.password === data.rePassword, {
  message: "Passwords do not match",
  path: ["rePassword"]
});


export const loginSchema = z.object({
  email: z.email("Invalid email"),
  password: z.string().nonempty("Password is required").min(6, "Password must be at least 6 characters"),
}); 
