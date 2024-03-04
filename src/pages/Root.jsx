import AppContext from "../context/AppProvider";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { toast } from "react-toastify";
import { REDUCER_ACTIONS } from "../reducer/actions";

const Root = () => {
  const { userInfo, setUserInfo, dispatch } = useContext(AppContext);

  const navigate = useNavigate();

  const signOut = () => {
    navigate("/");
    setUserInfo({});
    localStorage.removeItem("userInfoLS");
    toast.success("Successfully signed out!");
    dispatch({ type: REDUCER_ACTIONS.sign_out });
  };

  return (
    <main className="flex flex-col h-[100vh]">
      <header className="container mx-auto px-8 py-5">
        <div className="flex justify-between text-white">
          <div>
            <Link to={`/home`}>
              <h2 className="text-3xl font-bold italic tracking-widest">
                SnippetManager
              </h2>
            </Link>
          </div>

          <div className="text-end">
            {userInfo?.data?.access_token && (
              <>
                <h3 className="capitalize font-bold">
                  👋 {userInfo?.data.name}
                </h3>
                <p>{userInfo?.data.email}</p>
                <button onClick={signOut} className="font-bold" type="button">
                  Sign Out
                </button>
              </>
            )}
          </div>
        </div>
      </header>

      <section>
        <Outlet />
      </section>

      <footer className="mt-auto text-center text-white">
        <h2 className="pt-4 pb-1">Snippet Manager by Joshua</h2>
        <h2 className="pb-2">
          React Query, UseReducer, Context API, React Router DOM
        </h2>
      </footer>
    </main>
  );
};

export default Root;
