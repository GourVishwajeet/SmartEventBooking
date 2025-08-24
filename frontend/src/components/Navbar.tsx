import { Link } from "react-router-dom";


const Navbar: React.FC = () => {
  return (
    <nav className="fixed  w-full bg-black bg-opacity-60 text-white p-4 flex justify-between items-center z-50">
      <h1 className="text-2xl font-bold">SmartEvents</h1>
      <div className="space-x-6">
        <Link to={'/'} className="hover:text-gray-300">Home</Link>
        <Link to={"/events"} className="hover:text-gray-300">Events</Link>
        <Link to={"/about"} className="hover:text-gray-300">About</Link>
      </div>
      {/* <div className="space-x-4">
        <button className="px-4 py-2 bg-white text-black rounded-xl hover:bg-gray-200">Login</button>
        <button className="px-4 py-2 bg-indigo-600 rounded-xl hover:bg-indigo-500">Register</button>
      </div> */}
    </nav>
  );
};

export default Navbar;
