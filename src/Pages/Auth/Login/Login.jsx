// import React from "react";
// import { Input, Button, Card, CardBody, CardHeader, Divider } from "@heroui/react";
// import { Link, useNavigate } from "react-router-dom";
// import { useState } from "react";
// import { useForm } from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { loginSchema } from "../../../lib/schema/authSchema";
// import { IoEye, IoEyeOff } from "react-icons/io5";
// import { loginUser } from "../../../services/authServices";
// import { toast } from "react-toastify";
// import { useContext } from "react";
// import { AuthContext } from "../../../context/AuthContext";
// export default function Login() {
//   const [showPassword, setShowPassword] = useState(false);
//   const [errorMsg, setErrorMsg] = useState("");
//   const [successMsg, setSuccessMsg] = useState("");
 
//   const  { setToken } = useContext(AuthContext);

//   const navigate = useNavigate();

//   const {
//     register,
//     handleSubmit,
//     formState: { errors, isSubmitting },
//     reset,
//   } = useForm({
//     resolver: zodResolver(loginSchema),
//     mode: "all",
//     defaultValues: {
//       email: "",
//       password: "",
//     },
//   });

//   async function onSubmit(loginData) {
//     console.log("Sending:", loginData);
//     try {
//       setErrorMsg("");
//       setSuccessMsg("");
//       const response = await loginUser(loginData);
//       console.log("Login successful:", response);
//       // setSuccessMsg(response.data.message || "Login successful");
//       toast.success(response.data.message || "signed in successfully", {
//         position:"top-center",
//         autoClose: 3000,
//         pauseOnHover: true,
//       });
//       console.log("token",response.data.data.token)
//       localStorage.setItem("token", response.data.data.token);
//       setToken(response.data.data.token);
//       if (response.data?.message === "signed in successfully") {
//         reset();
//         navigate("/home");
//       }
//     } catch (error) {
//       console.log("Login failed:", error);
//       // setErrorMsg(
//       //   error.response?.data?.error || "An error occurred during login"
//       // );
//       toast.error(error.response?.data?.error || "An error occurred during login", {
//         position:"bottom-center",
//         autoClose: 3000,
//         pauseOnHover: true,
//       });
//     }
//   }

//   return (
//     <div className="w-full max-w-lg px-6">
//       <Card className="w-full shadow-2xl border border-default-200">
//         <CardHeader className="flex flex-col gap-3 items-center justify-center pt-8 pb-4">
//           <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-600 to-pink-600 flex items-center justify-center shadow-lg">
//             <span className="text-3xl font-bold text-white">N</span>
//           </div>
//           <div className="text-center">
//             <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
//               Welcome Back
//             </h1>
//             <p className="text-default-500 text-sm mt-1">
//               Login to Continue Your Journey
//             </p>
//           </div>
//         </CardHeader>

//         <Divider />

//         <CardBody className="px-8 py-6">
//           <form
//             autoComplete="off"
//             className="space-y-4 w-full"
//             onSubmit={handleSubmit(onSubmit)}
//           >
//             <Input
//               {...register("email")}
//               label="Email Address"
//               type="email"
//               placeholder="Enter your email"
//               variant="bordered"
//               size="lg"
//               radius="lg"
//               errorMessage={errors.email?.message}
//               isInvalid={Boolean(errors.email)}
//               classNames={{
//                 input: "text-base",
//                 inputWrapper: "border-2 hover:border-purple-400 focus-within:!border-purple-500",
//               }}
//             />

//             <Input
//               {...register("password")}
//               label="Password"
//               placeholder="Enter your password"
//               type={showPassword ? "text" : "password"}
//               variant="bordered"
//               size="lg"
//               radius="lg"
//               errorMessage={errors.password?.message}
//               isInvalid={Boolean(errors.password)}
//               classNames={{
//                 input: "text-base",
//                 inputWrapper: "border-2 hover:border-purple-400 focus-within:!border-purple-500",
//               }}
//               endContent={
//                 showPassword ? (
//                   <IoEyeOff
//                     className="cursor-pointer text-2xl text-default-400 hover:text-default-600"
//                     onClick={() => setShowPassword(false)}
//                   />
//                 ) : (
//                   <IoEye
//                     className="cursor-pointer text-2xl text-default-400 hover:text-default-600"
//                     onClick={() => setShowPassword(true)}
//                   />
//                 )
//               }
//             />

//             {/* Forgot Password Link */}
//             <div className="flex justify-end">
//               <Link
//                 to="/auth/forgot-password"
//                 className="text-sm text-purple-600 hover:text-pink-600 font-medium transition-colors"
//               >
//                 Forgot Password?
//               </Link>
//             </div>

//             {/* Submit button */}
//             <Button
//               type="submit"
//               size="lg"
//               radius="lg"
//               className="w-full mt-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold text-base shadow-lg hover:shadow-xl transition-all"
//               isLoading={isSubmitting}
//             >
//               Login
//             </Button>

//             {/* Don't have account */}
//             <p className="text-center text-sm text-default-600 mt-4">
//               Don't have an account?{" "}
//               <Link
//                 to="/auth/registration"
//                 className="text-purple-600 font-semibold hover:text-pink-600 transition-colors"
//               >
//                 Sign Up
//               </Link>
//             </p>

//             {errorMsg && (
//               <Card className="bg-danger-50 border-2 border-danger-200 mt-4">
//                 <CardBody className="py-3">
//                   <p className="text-danger-600 text-center text-sm font-medium">
//                     {errorMsg}
//                   </p>
//                 </CardBody>
//               </Card>
//             )}

//             {successMsg && (
//               <Card className="bg-success-50 border-2 border-success-200 mt-4">
//                 <CardBody className="py-3">
//                   <p className="text-success-600 text-center text-sm font-medium">
//                     {successMsg}
//                   </p>
//                 </CardBody>
//               </Card>
//             )}
//           </form>
//         </CardBody>
//       </Card>
//     </div>
//   );
// }



import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "../../../lib/schema/authSchema";
import { IoEye, IoEyeOff } from "react-icons/io5";
import { loginUser } from "../../../services/authServices";
import { toast } from "react-toastify";
import { useContext } from "react";
import { AuthContext } from "../../../context/AuthContext";

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [focused, setFocused] = useState(null);
  const { setToken } = useContext(AuthContext);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm({
    resolver: zodResolver(loginSchema),
    mode: "all",
    defaultValues: { email: "", password: "" },
  });

  async function onSubmit(loginData) {
    try {
      const response = await loginUser(loginData);
      toast.success(response.data.message || "signed in successfully", {
        position: "top-center",
        autoClose: 3000,
        pauseOnHover: true,
      });
      localStorage.setItem("token", response.data.data.token);
      setToken(response.data.data.token);
      if (response.data?.message === "signed in successfully") {
        reset();
        navigate("/home");
      }
    } catch (error) {
      toast.error(error.response?.data?.error || "An error occurred during login", {
        position: "bottom-center",
        autoClose: 3000,
        pauseOnHover: true,
      });
    }
  }

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;1,9..40,300&display=swap');

        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        .login-root {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          background: #0a0a0f;
          font-family: 'DM Sans', sans-serif;
          overflow: hidden;
          position: relative;
        }

        /* Ambient grid */
        .login-root::before {
          content: '';
          position: fixed;
          inset: 0;
          background-image:
            linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px);
          background-size: 60px 60px;
          pointer-events: none;
        }

        /* Glow orbs */
        .orb {
          position: fixed;
          border-radius: 50%;
          filter: blur(80px);
          pointer-events: none;
          animation: pulse-orb 8s ease-in-out infinite;
        }
        .orb-1 {
          width: 500px; height: 500px;
          background: radial-gradient(circle, rgba(99,102,241,0.18) 0%, transparent 70%);
          top: -100px; left: -100px;
          animation-delay: 0s;
        }
        .orb-2 {
          width: 400px; height: 400px;
          background: radial-gradient(circle, rgba(236,72,153,0.12) 0%, transparent 70%);
          bottom: -80px; right: -80px;
          animation-delay: -4s;
        }
        .orb-3 {
          width: 300px; height: 300px;
          background: radial-gradient(circle, rgba(20,184,166,0.08) 0%, transparent 70%);
          top: 50%; left: 60%;
          animation-delay: -2s;
        }
        @keyframes pulse-orb {
          0%, 100% { opacity: 0.6; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.1); }
        }

        .login-card {
          position: relative;
          width: 100%;
          max-width: 440px;
          margin: 24px;
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 24px;
          padding: 48px 44px;
          backdrop-filter: blur(24px);
          box-shadow:
            0 0 0 1px rgba(255,255,255,0.04),
            0 32px 64px rgba(0,0,0,0.6),
            inset 0 1px 0 rgba(255,255,255,0.08);
          animation: card-in 0.6s cubic-bezier(0.22, 1, 0.36, 1) both;
        }

        @keyframes card-in {
          from { opacity: 0; transform: translateY(32px) scale(0.97); }
          to   { opacity: 1; transform: translateY(0) scale(1); }
        }

        .card-shine {
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 1px;
          background: linear-gradient(90deg,
            transparent 0%,
            rgba(255,255,255,0.15) 30%,
            rgba(255,255,255,0.25) 50%,
            rgba(255,255,255,0.15) 70%,
            transparent 100%
          );
          border-radius: 24px 24px 0 0;
        }

        .header-eyebrow {
          display: flex;
          align-items: center;
          gap: 8px;
          margin-bottom: 20px;
          animation: fade-up 0.5s 0.1s cubic-bezier(0.22,1,0.36,1) both;
        }
        .eyebrow-dot {
          width: 6px; height: 6px;
          border-radius: 50%;
          background: linear-gradient(135deg, #6366f1, #ec4899);
          box-shadow: 0 0 8px rgba(99,102,241,0.6);
        }
        .eyebrow-text {
          font-size: 11px;
          font-weight: 500;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.4);
        }

        .header-title {
          font-family: 'DM Serif Display', serif;
          font-size: 42px;
          line-height: 1.05;
          color: #fff;
          margin-bottom: 8px;
          animation: fade-up 0.5s 0.15s cubic-bezier(0.22,1,0.36,1) both;
        }
        .header-title em {
          font-style: italic;
          background: linear-gradient(135deg, #818cf8 0%, #ec4899 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .header-sub {
          font-size: 14px;
          color: rgba(255,255,255,0.38);
          font-weight: 300;
          margin-bottom: 36px;
          animation: fade-up 0.5s 0.2s cubic-bezier(0.22,1,0.36,1) both;
        }

        @keyframes fade-up {
          from { opacity: 0; transform: translateY(16px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        .form-group {
          margin-bottom: 20px;
          animation: fade-up 0.5s cubic-bezier(0.22,1,0.36,1) both;
        }
        .form-group:nth-child(1) { animation-delay: 0.25s; }
        .form-group:nth-child(2) { animation-delay: 0.3s; }

        .field-label {
          display: block;
          font-size: 11px;
          font-weight: 500;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.35);
          margin-bottom: 8px;
          transition: color 0.2s;
        }
        .field-label.active {
          color: rgba(130,133,255,0.8);
        }

        .field-wrap {
          position: relative;
        }

        .field-input {
          width: 100%;
          background: rgba(255,255,255,0.05);
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 12px;
          padding: 14px 16px;
          font-size: 14.5px;
          font-family: 'DM Sans', sans-serif;
          font-weight: 400;
          color: #fff;
          outline: none;
          transition: all 0.2s;
          -webkit-appearance: none;
        }
        .field-input::placeholder { color: rgba(255,255,255,0.2); }
        .field-input:focus {
          background: rgba(99,102,241,0.08);
          border-color: rgba(99,102,241,0.5);
          box-shadow: 0 0 0 3px rgba(99,102,241,0.12), inset 0 1px 0 rgba(255,255,255,0.04);
        }
        .field-input.has-error {
          border-color: rgba(239,68,68,0.5);
          background: rgba(239,68,68,0.05);
        }
        .field-input.has-icon { padding-right: 44px; }

        .field-icon-btn {
          position: absolute;
          right: 12px;
          top: 50%;
          transform: translateY(-50%);
          background: none;
          border: none;
          cursor: pointer;
          color: rgba(255,255,255,0.3);
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 4px;
          border-radius: 6px;
          transition: color 0.2s;
        }
        .field-icon-btn:hover { color: rgba(255,255,255,0.7); }

        .field-error {
          margin-top: 6px;
          font-size: 12px;
          color: rgba(248,113,113,0.9);
          font-weight: 400;
        }

        .forgot-row {
          display: flex;
          justify-content: flex-end;
          margin-top: -8px;
          margin-bottom: 28px;
          animation: fade-up 0.5s 0.35s cubic-bezier(0.22,1,0.36,1) both;
        }
        .forgot-link {
          font-size: 12.5px;
          color: rgba(99,102,241,0.7);
          text-decoration: none;
          transition: color 0.2s;
          font-weight: 400;
        }
        .forgot-link:hover { color: rgba(168,85,247,0.9); }

        .submit-btn {
          width: 100%;
          padding: 15px;
          border: none;
          border-radius: 12px;
          font-family: 'DM Sans', sans-serif;
          font-size: 15px;
          font-weight: 500;
          color: #fff;
          cursor: pointer;
          position: relative;
          overflow: hidden;
          background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 50%, #ec4899 100%);
          box-shadow:
            0 4px 16px rgba(99,102,241,0.35),
            0 1px 0 rgba(255,255,255,0.1) inset;
          transition: all 0.2s;
          letter-spacing: 0.01em;
          animation: fade-up 0.5s 0.4s cubic-bezier(0.22,1,0.36,1) both;
        }
        .submit-btn::before {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, rgba(255,255,255,0.15) 0%, transparent 60%);
          opacity: 0;
          transition: opacity 0.2s;
        }
        .submit-btn:hover:not(:disabled) {
          transform: translateY(-1px);
          box-shadow:
            0 8px 24px rgba(99,102,241,0.5),
            0 1px 0 rgba(255,255,255,0.1) inset;
        }
        .submit-btn:hover:not(:disabled)::before { opacity: 1; }
        .submit-btn:active:not(:disabled) {
          transform: translateY(0);
          box-shadow: 0 2px 8px rgba(99,102,241,0.3);
        }
        .submit-btn:disabled {
          opacity: 0.7;
          cursor: not-allowed;
        }

        .btn-inner {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
        }
        .spinner {
          width: 16px;
          height: 16px;
          border: 2px solid rgba(255,255,255,0.3);
          border-top-color: #fff;
          border-radius: 50%;
          animation: spin 0.7s linear infinite;
        }
        @keyframes spin { to { transform: rotate(360deg); } }

        .divider {
          display: flex;
          align-items: center;
          gap: 12px;
          margin: 28px 0;
          animation: fade-up 0.5s 0.45s cubic-bezier(0.22,1,0.36,1) both;
        }
        .divider-line {
          flex: 1;
          height: 1px;
          background: rgba(255,255,255,0.07);
        }
        .divider-text {
          font-size: 11px;
          color: rgba(255,255,255,0.2);
          text-transform: uppercase;
          letter-spacing: 0.08em;
          font-weight: 500;
        }

        .signup-row {
          text-align: center;
          font-size: 13.5px;
          color: rgba(255,255,255,0.3);
          animation: fade-up 0.5s 0.5s cubic-bezier(0.22,1,0.36,1) both;
        }
        .signup-link {
          color: rgba(129,140,248,0.9);
          text-decoration: none;
          font-weight: 500;
          transition: color 0.2s;
        }
        .signup-link:hover { color: rgba(216,180,254,1); }

        /* Number decoration */
        .deco-number {
          position: absolute;
          font-family: 'DM Serif Display', serif;
          font-size: 200px;
          line-height: 1;
          color: rgba(255,255,255,0.015);
          right: -20px;
          bottom: -30px;
          user-select: none;
          pointer-events: none;
        }
      `}</style>

      <div className="login-root">
        <div className="orb orb-1" />
        <div className="orb orb-2" />
        <div className="orb orb-3" />

        <div className="login-card">
          <div className="card-shine" />
          <div className="deco-number">N</div>

          {/* Header */}
          <div className="header-eyebrow">
            <div className="eyebrow-dot" />
            <span className="eyebrow-text">Welcome back</span>
          </div>
          <h1 className="header-title">Sign in to <em>Nexus</em></h1>
          <p className="header-sub">Continue your journey where you left off.</p>

          {/* Form */}
          <form autoComplete="off" onSubmit={handleSubmit(onSubmit)}>
            <div className="form-group">
              <label
                className={`field-label ${focused === "email" ? "active" : ""}`}
                htmlFor="email"
              >
                Email address
              </label>
              <input
                id="email"
                {...register("email")}
                type="email"
                placeholder="you@example.com"
                className={`field-input ${errors.email ? "has-error" : ""}`}
                onFocus={() => setFocused("email")}
                onBlur={() => setFocused(null)}
              />
              {errors.email && (
                <p className="field-error">{errors.email.message}</p>
              )}
            </div>

            <div className="form-group">
              <label
                className={`field-label ${focused === "password" ? "active" : ""}`}
                htmlFor="password"
              >
                Password
              </label>
              <div className="field-wrap">
                <input
                  id="password"
                  {...register("password")}
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••••"
                  className={`field-input has-icon ${errors.password ? "has-error" : ""}`}
                  onFocus={() => setFocused("password")}
                  onBlur={() => setFocused(null)}
                />
                <button
                  type="button"
                  className="field-icon-btn"
                  onClick={() => setShowPassword((v) => !v)}
                  tabIndex={-1}
                >
                  {showPassword ? <IoEyeOff size={17} /> : <IoEye size={17} />}
                </button>
              </div>
              {errors.password && (
                <p className="field-error">{errors.password.message}</p>
              )}
            </div>

            <div className="forgot-row">
              <Link to="/auth/forgot-password" className="forgot-link">
                Forgot password?
              </Link>
            </div>

            <button type="submit" className="submit-btn" disabled={isSubmitting}>
              <span className="btn-inner">
                {isSubmitting && <span className="spinner" />}
                {isSubmitting ? "Signing in…" : "Sign in"}
              </span>
            </button>
          </form>

          <div className="divider">
            <div className="divider-line" />
            <span className="divider-text">new here?</span>
            <div className="divider-line" />
          </div>

          <p className="signup-row">
            Don't have an account?{" "}
            <Link to="/auth/registration" className="signup-link">
              Create one
            </Link>
          </p>
        </div>
      </div>
    </>
  );
}