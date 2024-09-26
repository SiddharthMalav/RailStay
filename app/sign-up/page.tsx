/**
 * This component renders a login form where users can sign in using their email or username and password.
 */
"use client";
import useToast from "@/hooks/useToast";
import { ToastType } from "@/state/toast/slice";
import apiUtil from "@/utils/api";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { FaCheck } from "react-icons/fa";

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
  } = useForm<SingUpFormData>();
  const router = useRouter();
  const { onShowToast } = useToast();

  const onSubmit = async (data: SingUpFormData) => {
    try {
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

      document.cookie = `token=${res.token}`;
      router.push("/");
    } catch (error) {
      console.error("Sign-up error:", error);
      onShowToast({
        type: ToastType.error,
        title: <FaCheck />,
        content: "Sign-up failed",
      });
    }
  };

  return (
    <div className="relative min-h-screen flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      {/* Background Image with Blur */}
      <div className="absolute inset-0 bg-[url('/assets/images/img.webp')] bg-cover bg-center filter blur-md"></div>

      {/* Main Content */}
      <div className="relative z-10 sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl leading-9 font-extrabold text-grey-700">
          Create a new Account
        </h2>

        <div className="backdrop-blur-[100px] mt-8 bg-white-600 py-8 px-4 shadow sm:rounded-lg sm:px-10 bg-opacity-90">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
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
                    required: "Email or Username is required",
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
                userName
              </label>
              <div className="mt-1">
                <input
                  id="userName"
                  type="text"
                  placeholder="Enter userName"
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
                <input
                  id="password"
                  type="password"
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
                Sign Up
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
