import { useMutation } from "react-query";
import * as apiClient from "../api-client";
import { useAppContext } from "../context/AppContext";
import { useNavigate } from "react-router-dom";

const SignOutButton = () => {
  const { showToast } = useAppContext();
  const navigate = useNavigate();
  const mutation = useMutation(apiClient.logout, {
    onSuccess: async () => {
      showToast({ message: "Successfully logged out!", type: "SUCCESS" });
      navigate("/register");
    },
    onError: (error: Error) => {
      showToast({ message: error.message, type: "ERROR" });
    },
  });

  const handleClick = () => {
    mutation.mutate();
  };
  return (
    <button
      onClick={handleClick}
      className="flex bg-white items-center text-slate-600 px-3 py-1 font-bold hover:bg-gray-100 rounded-md"
    >
      Sign Out
    </button>
  );
};

export default SignOutButton;
