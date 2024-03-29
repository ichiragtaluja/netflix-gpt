import React, { useEffect } from "react";
import { auth } from "../utils/firebase";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { removeUser } from "../utils/userSlice";
import { onAuthStateChanged } from "firebase/auth";
import { addUser } from "../utils/userSlice";
import { useDispatch } from "react-redux";
import { LOGO, USER_AVATAR } from "../utils/constants";
import { toggleGptSearchView } from "../utils/gptSlice";

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const user = useSelector((store) => store.user);
  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        removeUser();
      })
      .catch((error) => {
        navigate("/error");
      });
  };
  const handleGptSearch = () => {
    dispatch(toggleGptSearchView());
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const { uid, email, displayName } = user;
        dispatch(addUser({ uid, email, displayName }));
        navigate("/browse");
      } else {
        dispatch(removeUser());
        navigate("/");
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <div className="flex flex-col justify-between items-center w-full fixed top-0 z-20 bg-gradient-to-b from-black md:flex-row">
      <img className="w-48" src={LOGO} alt="netflix-logo" />
      {user && (
        <div className="flex items-center">
          <button
            onClick={handleGptSearch}
            className="ml-4 mr-4 px-4 py-2 rounded-lg  bg-indigo-600 text-white  hover:bg-indigo-700 focus:outline-none focus:bg-indigo-700"
          >
            GPT Search
          </button>
          <img
            className="hidden md:inline-block w-8"
            src={user?.photoURL || USER_AVATAR}
            alt=""
          />
          <button
            onClick={handleSignOut}
            className="ml-4 mr-4 px-4 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700 focus:outline-none focus:bg-red-700"
          >
            Sign Out
          </button>
        </div>
      )}
    </div>
  );
};

export default Header;
