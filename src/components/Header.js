import React from "react";
import { auth } from "../utils/firebase";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();
  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        // Sign-out successful.
        navigate("/");
      })
      .catch((error) => {
        navigate("/error");
        // An error happened.
      });
  };
  return (
    <div className="flex justify-between items-center w-full absolute z-10 bg-gradient-to-b from-black">
      <img
        className="w-48"
        src="https://cdn.cookielaw.org/logos/dd6b162f-1a32-456a-9cfe-897231c7763c/4345ea78-053c-46d2-b11e-09adaef973dc/Netflix_Logo_PMS.png"
        alt="netflix-logo"
      />
      <div className="flex items-center">
        <img
          className="w-8"
          src="https://occ-0-487-1722.1.nflxso.net/dnm/api/v6/vN7bi_My87NPKvsBoib006Llxzg/AAAABXYofKdCJceEP7pdxcEZ9wt80GsxEyXIbnG_QM8znksNz3JexvRbDLr0_AcNKr2SJtT-MLr1eCOA-e7xlDHsx4Jmmsi5HL8.png?r=1d4"
          alt=""
        />
        <button
          onClick={handleSignOut}
          className="ml-4 mr-4 px-4 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700 focus:outline-none focus:bg-red-700"
        >
          Sign Out
        </button>
      </div>
    </div>
  );
};

export default Header;
