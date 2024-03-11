import React from "react";
import MovieCard from "./MovieCard";

const MovieList = ({ title, movies }) => {
  return (
    <div className="mb-8 p-4 ">
      <h1 className="text-lg text-white md:text-3xl font-semibold mb-4">
        {title}
      </h1>
      <div className="flex overflow-x-auto space-x-4">
        {movies?.map((movie) => (
          <MovieCard key={movie.id} posterPath={movie.poster_path} />
        ))}
      </div>
    </div>
  );
};

export default MovieList;
