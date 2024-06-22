import { MdOutlineAlternateEmail } from "react-icons/md";
import { IoEyeOutline, IoEyeOffOutline } from "react-icons/io5";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Login } from "../../api/APIUsers";
import { toast } from "react-toastify";

export const SingInForm = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (await Login(email, password)) {
      toast.success("Login Successful");
      navigate("/account");
      window.location.reload();
    } else {
      toast.error("Login Failed");
    }
  };

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };
  return (
    <form
      onSubmit={handleSubmit}
      className="mb-0 mt-6 space-y-4 rounded-lg p-4 shadow-lg sm:p-6 lg:p-8"
    >
      <p className="text-center text-lg font-medium">Sign in to your account</p>

      <div>
        <label htmlFor="email" className="sr-only">
          Email
        </label>

        <div className="relative">
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
            placeholder="Enter email"
            required
          />

          <span className="absolute inset-y-0 end-0 grid place-content-center px-4">
            <MdOutlineAlternateEmail className="size-4 text-gray-400" />
          </span>
        </div>
      </div>

      <div>
        <label htmlFor="password" className="sr-only">
          Password
        </label>

        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
            placeholder="Enter password"
            required
          />

          <span
            onClick={handleShowPassword}
            className="absolute inset-y-0 end-0 grid place-content-center px-4 cursor-pointer"
          >
            {showPassword ? (
              <IoEyeOffOutline className="size-4 text-gray-400" />
            ) : (
              <IoEyeOutline className="size-4 text-gray-400" />
            )}
          </span>
        </div>
      </div>

      <button
        type="submit"
        className="block w-full rounded-lg bg-blue-600 px-5 py-3 text-sm font-medium text-white"
      >
        Sign in
      </button>

      <p className="text-center text-sm text-gray-500">
        No account?
        <Link className="underline" to="/sign-up">
          {" "}
          Sign up
        </Link>
      </p>
    </form>
  );
};
