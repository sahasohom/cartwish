import "./Signup.css";
import user from "../../assets/user.webp";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { getUser, signUp } from "../../services/userServices";
import { Navigate } from "react-router-dom";

const signupSchema = z
  .object({
    name: z
      .string({ required_error: "Name is required" })
      .min(3, { message: "Name must be at least 3 characters long" }),

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

    cpassword: z.string({
      required_error: "Please confirm your password",
    }),

    deliveryAddress: z
      .string({ required_error: "Address is required" })
      .min(15, { message: "Address must be at least 15 characters long" }),
  })
  .refine((data) => data.password === data.cpassword, {
    path: ["cpassword"],
    message: "Passwords do not match",
  });

const Signup = () => {
  const [profilePic, setProfilePic] = useState(null);
  const [formError, setFormError] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: zodResolver(signupSchema) });

  const onSubmit = async (formData) => {
    try {
      await signUp(formData, profilePic);
    } catch (error) {
      if (error.response && error.response.status === 400) {
        setFormError(error.response.data.message);
      }
    }
  };

  if (getUser()) {
    return <Navigate to="/" />;
  }

  return (
    <section className="align_center form_page">
      <form
        className="authentication_form signup_form"
        onSubmit={handleSubmit(onSubmit)}
      >
        <h2>SignUp Form</h2>

        <div className="image_input_section">
          <div className="image_preview">
            <img
              src={profilePic ? URL.createObjectURL(profilePic) : user}
              id="file-ip-1-preview"
            />
          </div>
          <label htmlFor="file-ip-1" className="image_label">
            Upload Image
          </label>
          <input
            type="file"
            id="file-ip-1"
            className="image_input"
            onChange={(e) => setProfilePic(e.target.files[0])}
          />
        </div>

        <div className="signup_form_input">
          <div>
            <label htmlFor="name">Name</label>
            <input
              id="name"
              className="form_text_input"
              type="text"
              placeholder="Enter your name"
              {...register("name")}
            />
            {errors.name && (
              <em className="form_error">{errors.name.message}</em>
            )}
          </div>

          <div>
            <label htmlFor="email">Email</label>
            <input
              id="email"
              className="form_text_input"
              type="email"
              placeholder="Enter your email address"
              {...register("email")}
            />
            {errors.email && (
              <em className="form_error">{errors.email.message}</em>
            )}
          </div>

          <div>
            <label htmlFor="password">Password</label>
            <input
              id="password"
              className="form_text_input"
              type="password"
              placeholder="Enter your password"
              {...register("password")}
            />
            {errors.password && (
              <em className="form_error">{errors.password.message}</em>
            )}
          </div>

          <div>
            <label htmlFor="cpassword">Confirm Password</label>
            <input
              id="cpassword"
              className="form_text_input"
              type="password"
              placeholder="Enter confirm password"
              {...register("cpassword")}
            />
            {errors.cpassword && (
              <em className="form_error">{errors.cpassword.message}</em>
            )}
          </div>

          <div className="signup_textares_section">
            <label htmlFor="deliveryAddress">Delivery Address</label>
            <textarea
              id="deliveryAddress"
              className="input_textarea"
              placeholder="Enter delivery address"
              {...register("deliveryAddress")}
            />
            {errors.deliveryAddress && (
              <em className="form_error">{errors.deliveryAddress.message}</em>
            )}
          </div>
        </div>

        {formError && <em className="form_error">{formError}</em>}
        <button className="search_button form_submit" type="submit">
          Submit
        </button>
      </form>
    </section>
  );
};

export default Signup;
