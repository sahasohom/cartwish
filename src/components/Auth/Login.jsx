import "./Login.css";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { getUser, login } from "../../services/userServices";
import { useState } from "react";
import { Navigate, useLocation } from "react-router-dom";

const loginSchema = z.object({
  email: z
    .string({ required_error: "Email is required" })
    .email({ message: "Please enter a valid email address" })
    .min(3, { message: "Email must be at least 3 characters long" }),

  password: z
    .string({ required_error: "Password is required" })
    .min(8, { message: "Password must be at least 8 characters long" })
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\w\s]).{8,}$/, {
      message:
        "Password must include at least 1 uppercase letter, 1 lowercase letter, 1 number, and 1 special character",
    }),
});

const Login = () => {
  const location = useLocation();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: zodResolver(loginSchema) });

  const [formError, setFormError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async (formData) => {
    try {
      setIsLoading(true);
      await login(formData);
      const { state } = location;
      window.location = state ? state.from : "/";
      setIsLoading(false);
    } catch (error) {
      if (error.response && error.response.status === 400) {
        setFormError(error.response.data.message);
        setIsLoading(false);
      }
    }
  };

  if (getUser()) {
    return <Navigate to="/" />;
  }

  return (
    <section className="align_center form_page">
      <form action="" className="auth_form" onSubmit={handleSubmit(onSubmit)}>
        <h2>Login Form</h2>
        <div className="form_input">
          <div>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              name="email"
              id="email"
              className="form_text_input"
              placeholder="Enter your email"
              {...register("email")}
            />
            {errors.email && (
              <em className="form_error">{errors.email.message}</em>
            )}
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              name="password"
              id="password"
              className="form_text_input"
              placeholder="Enter your password"
              {...register("password")}
            />
            {errors.password && (
              <em className="form_error">{errors.password.message}</em>
            )}
          </div>
          {formError && <em className="form_error">{formError}</em>}
          <button type="submit" className="search_button form_submit">
            {isLoading ? "Loading..." : "Submit"}
          </button>
        </div>
      </form>
    </section>
  );
};

export default Login;
