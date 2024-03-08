import { useMutation } from "@tanstack/react-query";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import getFastApiErrors from "../utils/getFastApiError";

const Register = () => {
  const navigate = useNavigate();

  const mutation = useMutation({
    mutationFn: (obj) => {
      return axios.post(`${import.meta.env.VITE_BASE_URL}/users/register`, obj);
    },
    onSuccess: (data) => {
      toast.success("User created!");
      console.log(data);
      navigate("/");
    },
    onError: (err) => toast.error(getFastApiErrors(err)),
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    // Form validation
    if (
      [
        e.target.name.value.trim(),
        e.target.email.value.trim(),
        e.target.password.value.trim(),
      ].includes("")
    ) {
      return toast.error("Fill up the blanks available!");
    } else if (e.target.password.value !== e.target.repeatPassword.value) {
      return toast.error("Passwords MUST be the same!");
    }

    mutation.mutate({
      name: e.target.name.value,
      email: e.target.email.value,
      password: e.target.password.value,
    });
  };

  return (
    <form onSubmit={handleSubmit} className=" max-w-sm mx-auto my-10 px-3">
      <h2 className="text-white text-center text-4xl mb-4">Register</h2>

      <div className="mb-5">
        <label
          htmlFor="name"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          Your name
        </label>
        <input
          type="text"
          id="name"
          className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
          placeholder="johndoe"
          name="name"
        />
      </div>

      <div className="mb-5">
        <label
          htmlFor="email"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          Your email
        </label>
        <input
          type="email"
          id="email"
          className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
          placeholder="email@flowbite.com"
          name="email"
        />
      </div>

      <div className="mb-5">
        <label
          htmlFor="password"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          Your password
        </label>
        <input
          type="text"
          id="password"
          className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
          name="password"
          placeholder="******"
        />
      </div>

      <div className="mb-5">
        <label
          htmlFor="repeat-password"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          Repeat password
        </label>
        <input
          type="text"
          id="repeat-password"
          className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
          name="repeatPassword"
          placeholder="******"
        />
      </div>

      <h3 className="block mb-2 text-sm font-medium text-gray-300 ">
        Already have an account?{" "}
        <Link className="text-gray-200 underline" to={`/`}>
          Log In
        </Link>
      </h3>

      <button
        disabled={mutation.isPending}
        type="submit"
        className="text-white w-full block bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
      >
        {mutation.isPending ? "Registering..." : "Register"}
      </button>
    </form>
  );
};

export default Register;
