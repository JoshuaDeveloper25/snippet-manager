import AppContext from "../context/AppProvider";
import { Link, useNavigate } from "react-router-dom";
import { useContext, useEffect } from "react";
import { REDUCER_ACTIONS } from "../reducer/actions";
import { toast } from "react-toastify";
import axios from "axios";

const AllSnippets = () => {
  const { state, dispatch } = useContext(AppContext);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get(
          `${import.meta.env.VITE_BASE_URL}/snippets/`
        );
        dispatch({ type: REDUCER_ACTIONS.all_snippets, payload: data });
        console.log(data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  const addSnippet = () => {
    navigate("/add-snippet");
  };

  const updateSnippet = (snippet) => {
    navigate(`/edit-snippet/${snippet?.id}`, {
      state: { snippetObject: snippet },
    });
  };

  const deleteSnippet = async (snippet) => {
    const delete_request = confirm(
      `Are you sure you want to remove this snippet?`
    );

    if (!delete_request) {
      return;
    }

    try {
      await axios.delete(
        `${import.meta.env.VITE_BASE_URL}/snippets/${snippet.id}`
      );

      toast.success("Snippet deleted!");

      dispatch({
        type: REDUCER_ACTIONS?.delete_snippet,
        payload: snippet?.id,
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <section className="container mx-auto px-8">
      <Link className="text-white text-xl" to={"/home"}>
        {"< Back"}
      </Link>

      <h2 className="text-white text-center text-5xl mb-10 mt-5">
        {state?.snippets?.length !== 0
          ? "All Snippets"
          : "Create Now Your Snippets!"}
      </h2>
      <div className="flex gap-7 flex-wrap">
        {state?.snippets?.map((snippet) => {
          return (
            <div
              key={snippet?.id}
              className="max-w-[30rem] flex-[40%] min-w-[15rem] mx-auto text-white border border-white rounded shadow-md shadow-white"
            >
              <h2 className="border-b p-2 capitalize">
                <span className="font-bold">Title:</span> {snippet.title}
              </h2>
              <h2 className="px-2 py-2">
                <span className="font-bold">Description:</span>{" "}
                {snippet.description}
              </h2>
              <p className="bg-white text-black py-5">
                <span className="font-bold px-2">Code:</span>
                {snippet.code}
              </p>
              <div className="border-t p-2">
                <button
                  onClick={() => updateSnippet(snippet)}
                  className="bg-orange-600 hover:bg-orange-800 px-2 py-1 font-bold rounded me-2"
                >
                  Update
                </button>

                <button
                  onClick={() => deleteSnippet(snippet)}
                  className="bg-red-600 hover:bg-red-800 px-2 py-1 font-bold rounded"
                >
                  Delete
                </button>
              </div>
            </div>
          );
        })}
      </div>

      <div className="text-center">
        <button
          onClick={addSnippet}
          className="bg-blue-600 hover:bg-blue-800 text-white px-2 py-1 font-bold rounded my-8"
        >
          Add Snippet
        </button>
      </div>
    </section>
  );
};

export default AllSnippets;
