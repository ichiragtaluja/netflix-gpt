import React from "react";

const VideoTitle = ({ title, overview }) => {
  return (
    <div className="absolute bottom-80 left-4 right-4 p-6 text-white text-left z-10">
      <h1 className="text-4xl font-bold mb-2">{title}</h1>
      <p className="text-lg mb-4 w-8/12">{overview}</p>
      <div className="flex justify-start space-x-4">
        <button className="flex items-center justify-center px-6 py-2 bg-red-600 text-white rounded-lg font-semibold hover:bg-red-700 hover:text-gray-200">
          <svg className="w-6 h-6 mr-2" fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M4 5a1 1 0 011.555-.832l10 7a1 1 0 010 1.664l-10 7A1 1 0 014 15V5z"
              clipRule="evenodd"
            />
          </svg>
          Play
        </button>
        <button className="flex items-center justify-center px-6 py-2 bg-gray-800 text-white rounded-lg font-semibold opacity-50 hover:opacity-75 hover:bg-gray-900 hover:text-gray-200">
          More Info
        </button>
      </div>
    </div>
  );
};

export default VideoTitle;
