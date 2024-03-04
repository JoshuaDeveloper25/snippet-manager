import { REDUCER_ACTIONS } from "../reducer/actions";
import AppContext from "../context/AppProvider";
import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { toast } from "react-toastify";
import axios from "axios";

const AddSnippet = () => {
  const { dispatch } = useContext(AppContext);
  const navigate = useNavigate();

  const handleSubmit = async (submitEvent) => {
    submitEvent.preventDefault();

    if (
      [
        submitEvent.target.title.value.trim(),
        submitEvent.target.description.value.trim(),
        submitEvent.target.code.value.trim(),
      ].includes("")
    ) {
      return toast.error("Fill up the blanks available");
    }

    try {
      await axios.post(
        `${import.meta.env.VITE_BASE_URL}/snippets/`,
        {
          title: submitEvent.target.title.value,
          description: submitEvent.target.description.value,
          code: submitEvent.target.code.value,
        }
      );
      toast.success("Snippet added!");
      navigate("/all-snippets");
      dispatch({
        type: REDUCER_ACTIONS.add_snippet,
        payload: submitEvent,
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <section className="container mx-auto px-8">
      <Link className="text-white text-xl" to={"/all-snippets"}>
        {"< Back"}
      </Link>

      <form onSubmit={handleSubmit} className="max-w-sm mx-auto px-3">
        <h2 className="text-white text-center text-4xl mb-4">Add Snippet</h2>

        {/* Title */}
        <div className="mb-5">
          <label
            htmlFor="title"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Title
          </label>
          <input
            type="text"
            id="title"
            name="title"
            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
            placeholder="Place Title"
          />
        </div>

        {/* Description */}
        <div className="mb-5">
          <label
            htmlFor="description"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Description
          </label>
          <input
            type="text"
            name="description"
            id="description"
            placeholder="Place Desc"
            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
          />
        </div>

        {/* Code */}
        <div className="mb-5">
          <label
            htmlFor="code"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Code
          </label>
          <textarea
            name="code"
            id="code"
            placeholder="Place Code Here."
            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
          ></textarea>
        </div>

        <button
          type="submit"
          className="text-white block w-full bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          {/* {mutation.isPending ? "Creating..." : "Create"} */}
          Create
        </button>
      </form>
    </section>
  );
};

export default AddSnippet;
