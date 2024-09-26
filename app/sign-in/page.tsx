/**
 * This component renders a login form where users can sign in using their email or username and password.
 */

"use client";

import Spinner from "@/component/common/spinner";
import apiUtil from "@/utils/api";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";

interface LoginFormData {
  emailOrUsername: string;
  password: string;
}

const SignInPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async (data: LoginFormData) => {
    try {
      setIsLoading(true);
      const res = await apiUtil.post("/sign-in", data);
      console.log("res", res);

      const response = await res.json();
      if (response.status == 200) {
        document.cookie = `token=${response.token}`;
        router.push("/");
      } else {
        console.error(response.message);
      }
    } catch (error) {
      console.error("error", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      {/* Background Image with Blur */}
      <div className="absolute inset-0 bg-[url('/assets/images/img.webp')] bg-cover bg-center filter blur-md"></div>

      {/* Main Content */}
      <div className="relative z-10 sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl leading-9 font-extrabold text-grey-700">
          Sign In to your account
        </h2>

        <div className="backdrop-blur-[100px] mt-8 py-8 px-4 shadow sm:rounded-lg sm:px-10 bg-opacity-90">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div>
              <label
                htmlFor="emailOrUsername"
                className="block text-sm font-medium text-gray-700"
              >
                Email or Username
              </label>
              <div className="mt-1">
                <input
                  id="emailOrUsername"
                  type="text"
                  autoComplete="off"
                  placeholder="Enter Email or Username"
                  className={`appearance-none block w-full px-3 py-2 border ${
                    errors.emailOrUsername
                      ? "border-red-500"
                      : "border-gray-300"
                  } rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
                  {...register("emailOrUsername", {
                    required: "Email or Username is required",
                  })}
                />
                {errors.emailOrUsername && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.emailOrUsername.message}
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
                <input
                  id="password"
                  type="password"
                  autoComplete="new-password"
                  placeholder="Enter Password"
                  className={`appearance-none block w-full px-3 py-2 border ${
                    errors.password ? "border-red-500" : "border-gray-300"
                  } rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
                  {...register("password", {
                    required: "Password is required",
                  })}
                />
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
                {isLoading ? <Spinner /> : "Sign In"}
              </button>
            </div>
            <p className="font-semibold text-center">
              Don’t have an account?
              <span
                className="font-semibold text-blue-700 cursor-pointer ml-1"
                onClick={() => router.push("/sign-up")}
              >
                Sign-Up
              </span>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignInPage;
