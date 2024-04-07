import { Link } from "react-router-dom";
import { useAppContext } from "../context/AppContext";
import SignOutButton from "./SignOutButton";

const Header = () => {
  const { isLoggedIn } = useAppContext();
  return (
    <div className="bg-slate-800 py-6">
      <div className="sm:container mx-auto flex justify-between px-6">
        <span className="sm:text-3xl text-white font-bold tracking-tight">
          <Link className="underline" to="/">DBooking.com</Link>
        </span>
        <span className="flex space-x-2 items-center">
          {isLoggedIn ? (
            <>
              <Link className="text-white" to="/my-bookings">My Bookings</Link>
              <Link className="text-white" to="/my-hotels">My Hotels</Link>
              <SignOutButton />
            </>
          ) : (
            <Link
              to="/sign-in"
              className="flex bg-white items-center text-slate-600 px-3 py-1 font-bold hover:bg-gray-100 rounded-md"
            >
              Sign in
            </Link>
          )}
        </span>
      </div>
    </div>
  );
};

export default Header;
