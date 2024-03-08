import React from "react";
import { IMG_CDN_URL } from "../utils/constants";

const MovieCard = ({ posterPath }) => {
  return (
    // <div>
    //   <img src={IMG_CDN_URL + posterPath} alt="Movie Card" />
    // </div>
    <div className="flex-shrink-0">
      <img
        src={IMG_CDN_URL + posterPath}
        alt={"Movie card"}
        className="w-36 h-auto rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
      />
    </div>
  );
};

export default MovieCard;
