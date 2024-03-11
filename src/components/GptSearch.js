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
    <div>
      <div className="fixed -z-10">
        <img src={BACKGROUND_IMAGE} alt="background-img" />
      </div>
      <GptSearchBar />
      <GptMovieSuggestions />
    </div>
  );
};

export default GptSearch;
