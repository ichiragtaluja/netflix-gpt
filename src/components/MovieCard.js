import React from "react";
import { IMG_CDN_URL } from "../utils/constants";

const MovieCard = ({ posterPath }) => {
  if (!posterPath) return null;
  return (
    <div className="flex-shrink-0">
      <img
        src={IMG_CDN_URL + posterPath}
        alt={"Movie card"}
        className="w-36 md:w-48 h-auto rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
      />
    </div>
  );
};

export default MovieCard;
