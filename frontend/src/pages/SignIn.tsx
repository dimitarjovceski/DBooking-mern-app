import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "react-query";
import * as apiClient from "../api-client";
import { useAppContext } from "../context/AppContext";
import { Link, useLocation, useNavigate } from "react-router-dom";

export type SignInFormData = {
  email: string;
  password: string;
};

const SignIn = () => {
  const { showToast } = useAppContext();
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const location = useLocation();

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<SignInFormData>();

  const mutation = useMutation(apiClient.login, {
    onSuccess: async () => {
      showToast({ message: "Successfully logged in!", type: "SUCCESS" });
      await queryClient.invalidateQueries("validateToken");
      navigate(location.state?.from?.pathName || "/");
    },
    onError: (error: Error) => {
      showToast({ message: error.message, type: "ERROR" });
    },
  });

  const onSubmit = handleSubmit((data) => {
    mutation.mutate(data);
  });
  return (
    <form
      className="flex flex-col  gap-5 justify-center max-w-md mx-auto"
      onSubmit={onSubmit}
    >
      <h2 className="sm:text-2xl md:text-3xl font-bold text-center">Sign In</h2>
      <div className="flex flex-col md:flex-col gap-5">
        <label className="text-gray-700 text-sm font-bold flex-1">
          Email
          <input
            className="border rounded w-full py-1 px-2 font-normal"
            {...register("email", { required: "Email is reguired" })}
          />
          {errors.email && (
            <span className="text-red-500">{errors.email.message}</span>
          )}
        </label>
        <label className="text-gray-700 text-sm font-bold flex-1">
          Password
          <input
            type="password"
            className="border rounded w-full py-1 px-2 font-normal"
            {...register("password", {
              required: "Password is reguired",
              minLength: {
                value: 6,
                message: "Password must be at least 6 characters",
              },
            })}
          />
          {errors.password && (
            <span className="text-red-500">{errors.password.message}</span>
          )}
        </label>
        <span className="flex flex-col gap-3 sm:flex-row justify-between sm:items-center">
          <span className="text-sm">
            Don't have an Account?{" "}
            <Link className="underline text-blue-800 font-bold" to="/register">
              Create account 
            </Link>
          </span>
          <button
            type="submit"
            className="sm:w-[200px] bg-slate-700 font-bold text-white p-2 rounded-md hover:bg-slate-500"
          >
            Sign In
          </button>
        </span>
      </div>
    </form>
  );
};

export default SignIn;
