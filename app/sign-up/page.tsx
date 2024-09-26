/**
 * This component renders a login form where users can sign in using their email or username and password.
 */
"use client";
import * as Yup from "yup";
import { useState } from "react";
import apiUtil from "@/utils/api";
import useToast from "@/hooks/useToast";
import { FaCheck } from "react-icons/fa";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { ToastType } from "@/state/toast/slice";
import { yupResolver } from "@hookform/resolvers/yup";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import Spinner from "@/component/common/spinner";

const signUpSchema = Yup.object().shape({
  userName: Yup.string()
    .min(3, "User Name must be at least 3 characters")
    .max(20, "User Name can't be more than 20 characters")
    .required("User Name is required"),
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  password: Yup.string()
    .min(8, "Password must be at least 8 characters")
    .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
    .matches(
      /[!@#$%^&*(),.?":{}|<>]/,
      "Password must contain at least one special character (!, @, #, $, etc.)"
    )
    .required("Password is required"),
});

interface SingUpFormData {
  userName: string;
  email: string;
  password: string;
}

const SignUpPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
    watch,
  } = useForm<SingUpFormData>({
    resolver: yupResolver(signUpSchema), // Connect Yup schema here
  });
  const router = useRouter();
  const { onShowToast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const onSubmit = async (data: SingUpFormData) => {
    try {
      setIsLoading(true);
      const response = await apiUtil.post("/sign-up", data);
      const res = await response.json();
      if (res.status !== 201) {
        onShowToast({
          type: ToastType.error,
          title: <FaCheck />,
          content: res.message || "Sign-up failed",
        });
        return;
      } else {
        onShowToast({
          type: ToastType.success,
          title: <FaCheck />,
          content: res.message || "Successfully Created",
        });
      }

      // document.cookie = `token=${res.token}`;
      router.push("/sign-in");
    } catch (error) {
      console.error("Sign-up error:", error);
      onShowToast({
        type: ToastType.error,
        title: <FaCheck />,
        content: "Sign-up failed",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const passwordValue = watch("password");

  return (
    <div className="relative min-h-screen flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="absolute inset-0 bg-[url('/assets/images/img.webp')] bg-cover bg-center filter blur-md"></div>

      <div className="relative z-10 sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl leading-9 font-extrabold text-grey-700">
          Create a new Account
        </h2>

        <div className="backdrop-blur-[100px] mt-8 bg-white-600 py-8 px-4 shadow sm:rounded-lg sm:px-10 bg-opacity-90">
          <form
            autoComplete="off"
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-6"
          >
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email
              </label>
              <div className="mt-1">
                <input
                  id="email"
                  type="text"
                  placeholder="Enter Email"
                  className={`appearance-none block w-full px-3 py-2 border ${
                    errors.email ? "border-red-500" : "border-gray-300"
                  } rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
                  {...register("email", {
                    required: "Email or User Name is required",
                  })}
                />
                {errors.email && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.email.message}
                  </p>
                )}
              </div>
            </div>
            <div>
              <label
                htmlFor="userName"
                className="block text-sm font-medium text-gray-700"
              >
                User Name
              </label>
              <div className="mt-1">
                <input
                  id="userName"
                  type="text"
                  autoComplete="off"
                  placeholder="Enter User Name"
                  className={`appearance-none block w-full px-3 py-2 border ${
                    errors.userName ? "border-red-500" : "border-gray-300"
                  } rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
                  {...register("userName", {
                    required: "Username is required",
                  })}
                />
                {errors.userName && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.userName.message}
                  </p>
                )}
              </div>
            </div>
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Password
              </label>
              <div className="mt-1">
                <div className="relative">
                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    autoComplete="new-password"
                    placeholder="Enter Password"
                    className={`appearance-none block w-full px-3 py-2 border ${
                      errors.password ? "border-red-500" : "border-gray-300"
                    } rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm pr-10`} // Added 'pr-10' for padding-right to make space for the icon
                    {...register("password", {
                      required: "Password is required",
                    })}
                  />
                  {passwordValue && passwordValue.length > 1 && (
                    <FontAwesomeIcon
                      onClick={() => setShowPassword(!showPassword)}
                      className="py-[0.5rem] absolute inset-y-0 right-3 flex items-center cursor-pointer text-gray-500"
                      icon={showPassword ? faEye : faEyeSlash}
                    />
                  )}
                </div>

                {errors.password && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.password.message}
                  </p>
                )}
              </div>
            </div>
            <div>
              <button
                type="submit"
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                {isLoading ? <Spinner /> : "Sign Up"}
              </button>
            </div>
            <p className="font-semibold text-center">
              Already have an account?
              <span
                className="font-semibold text-blue-700 cursor-pointer ml-1"
                onClick={() => router.push("/sign-in")}
              >
                Login
              </span>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
