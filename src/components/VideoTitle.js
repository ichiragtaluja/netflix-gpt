import React from "react";

const VideoTitle = ({ title, overview }) => {
  return (
    <div className="md:bottom-40 sm:bottom-8 absolute bottom-30 left-4 right-4 p-6 text-white text-left z-10">
      <h1 className="text-2xl md:text-4xl font-bold mb-2">{title}</h1>
      <p className="hidden md:inline-block text-lg mb-4 w-8/12">{overview}</p>
      <div className="flex justify-start space-x-4 my-3">
        <button className="flex items-center  justify-center py-2 px-5  md:px-6 md:py-2 bg-red-600 text-white rounded-lg font-semibold hover:bg-red-700 hover:text-gray-200">
          ▶️ Play
        </button>
        <button className="hidden md:inline-block flex items-center justify-center px-6 py-2 bg-gray-800 text-white rounded-lg font-semibold opacity-50 hover:opacity-75 hover:bg-gray-900 hover:text-gray-200">
          More Info
        </button>
      </div>
    </div>
  );
};

export default VideoTitle;
