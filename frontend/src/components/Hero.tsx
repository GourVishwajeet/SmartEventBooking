import { Search } from "lucide-react";
import img from '../../public/pexels-pixabay-433452.jpg'

interface HeroProps {
  query: string;
  setQuery: (q: string) => void;
}

const Hero: React.FC<HeroProps> = ({ query, setQuery }) => {
  return (
    <section
      className="relative h-screen flex items-center justify-center"

    >   
    <img className="h-screen  absolute w-screen" src={img} alt="" />
      <div className="absolute inset-0 bg-black bg-opacity-40"></div>
      <div className="relative text-center text-white max-w-xl">
        <h2 className="text-4xl md:text-6xl font-bold mb-6">Find Your Next Event</h2>
        <div className="flex bg-white rounded-xl overflow-hidden shadow-lg">
          <input
            type="text"
            placeholder="Search events..."
            className="flex-1 px-4 py-3 text-black focus:outline-none"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button className="bg-indigo-600 px-6 flex items-center justify-center hover:bg-indigo-500">
            <Search className="text-white" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default Hero;
