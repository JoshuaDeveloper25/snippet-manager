import getFastApiError from "../utils/getFastApiError";
import { Link, useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import AppContext from "../context/AppProvider";
import { useContext, useRef } from "react";
import { toast } from "react-toastify";
import axios from "axios";

const LogIn = () => {
  const { setUserInfo } = useContext(AppContext);
  const navigate = useNavigate();

  const nameRef = useRef("");
  const passwordRef = useRef("");

  const mutation = useMutation({
    mutationFn: () => {
      const dataForm = new FormData();
      dataForm.append("username", nameRef?.current.value);
      dataForm.append("password", passwordRef?.current.value);

      return axios.post(
        `${import.meta.env.VITE_BASE_URL}/users/login`,
        dataForm
      );
    },
    onSuccess: (data) => {
      toast.success("Successfully sign in!");
      navigate("/home");
      setUserInfo(data);
      localStorage.setItem("userInfoLS", JSON.stringify(data));
    },
    onError: (err) => toast.error(getFastApiError(err)),
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    // Form validation
    if (
      [e.target.email.value.trim(), e.target.password.value.trim()].includes("")
    ) {
      return toast.error("Fill up the blanks available!");
    }

    mutation.mutate({
      username: e.target.email.value,
      password: e.target.password.value,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-sm mx-auto my-24 px-3">
      <h2 className="text-white text-center text-4xl mb-4">Log In</h2>

      {/* Email */}
      <div className="mb-5">
        <label
          htmlFor="email"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          Email
        </label>
        <input
          type="email"
          id="email"
          name="email"
          ref={nameRef}
          className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
          placeholder="name@flowbite.com"
        />
      </div>

      {/* Password */}
      <div className="mb-5">
        <label
          htmlFor="password"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          Password
        </label>
        <input
          type="text"
          name="password"
          ref={passwordRef}
          id="password"
          placeholder="********"
          className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
        />
      </div>

      <h3 className="block mb-2 text-sm font-medium text-gray-300 ">
        Don't have an account?{" "}
        <Link className="text-gray-200 underline" to={`/register`}>
          Register
        </Link>
      </h3>

      <button
        disabled={mutation.isPending}
        type="submit"
        className="text-white block w-full bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
      >
        {mutation.isPending ? "Signing in..." : "Sign In"}
      </button>
    </form>
  );
};

export default LogIn;
