import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  
  return (
    <section className="container mx-auto px-8 py-5 mt-16">
      <div className="border border-white max-w-xl mx-auto text-center p-5 rounded">
        <h2 className="text-5xl text-white">Snippets for you!</h2>
        <button
          onClick={() => navigate("/all-snippets")}
          className="text-xl border-white border text-white hover:bg-white hover:text-black transition-all duration-300 px-2 py-1 rounded mt-6"
          type="button"
        >
          All Snippets
        </button>
      </div>
    </section>
  );
};

export default Home;
