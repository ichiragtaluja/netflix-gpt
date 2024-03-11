import React from "react";
import GptSearchBar from "./GptSearchBar";
import GptMovieSuggestions from "./GptMovieSuggestions";
import { useDispatch } from "react-redux";
import { toggleGptSearchView } from "../utils/gptSlice";
import { BACKGROUND_IMAGE } from "../utils/constants";

const GptSearch = () => {
  const dispatch = useDispatch();

  const handleClose = () => {
    dispatch(toggleGptSearchView());
  };

  const handleOutsideClick = (event) => {
    if (!event.target.closest(".gpt-search-container")) {
      handleClose();
    }
  };

  return (
    <>
      <div className="fixed -z-10">
        <img
          className="h-screen w-screen object-cover"
          src={BACKGROUND_IMAGE}
          alt="background-img"
        />
        <div className="absolute inset-0 bg-black opacity-50"></div>
      </div>
      <div>
        <GptSearchBar />
        <GptMovieSuggestions />
      </div>
    </>
  );
};

export default GptSearch;
