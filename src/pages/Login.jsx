import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../redux/Auth/Auth";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { loginUser } from "../apicalls/auth";

const loginSchema = z.object({
  identifier: z
    .string()
    .min(1, { message: "Username or Phone cannot be empty" })
    .min(6, {
      message: "Username or Phone must be at least 6 characters long",
    }),
  password: z
    .string()
    .min(1, { message: "Password cannot be empty" })
    .min(6, { message: "Password must be at least 6 characters long" })
    .max(20, { message: "Password must be at maximum 20 characters long" }),
});

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  const users = useSelector((state) => state.user.users);
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/dashboard");
    }
  }, [navigate, isAuthenticated]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginSchema),
  });

  const handleLogin = async (user) => {
    setLoading(true);

    const response = await loginUser(user);

    if (response?.success) {
      localStorage.setItem("token", response.token);
      dispatch(login(response.activeUser));
      setLoading(false);
      toast.success(response.message);
      navigate("/home");
    } else {
      setLoading(false);
      toast.error(response.message);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
      <form
        onSubmit={handleSubmit(handleLogin)}
        className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8 space-y-6"
      >
        {/* Header */}
        <h3 className="text-3xl font-bold text-gray-800 text-center">Login</h3>

        {/* Username / Phone */}
        <div className="flex flex-col">
          <input
            type="text"
            placeholder="john.doe"
            {...register("identifier")}
            className="px-4 py-3 border rounded-lg border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-400 text-gray-700 placeholder-gray-400"
          />
          {errors.identifier && (
            <p className="text-red-500 text-sm mt-1">
              {errors.identifier.message}
            </p>
          )}
        </div>

        {/* Password */}
        <div className="flex flex-col">
          <input
            type="password"
            placeholder="********"
            defaultValue={123456}
            {...register("password")}
            className="px-4 py-3 border rounded-lg border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-400 text-gray-700 placeholder-gray-400"
          />
          {errors.password && (
            <p className="text-red-500 text-sm mt-1">
              {errors.password.message}
            </p>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-3 rounded-lg transition-colors duration-300"
        >
          {loading ? "Logging in..." : "Login"}
        </button>

        {/* Optional Footer */}
        <p className="text-center text-gray-500 text-sm">
          Don't have an account?{" "}
          <a
            href="/register"
            className="text-green-500 font-medium hover:underline"
          >
            Sign Up
          </a>
        </p>
      </form>
    </div>
  );
};

export default Login;
