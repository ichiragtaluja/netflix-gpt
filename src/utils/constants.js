export const LOGO =
  "https://cdn.cookielaw.org/logos/dd6b162f-1a32-456a-9cfe-897231c7763c/4345ea78-053c-46d2-b11e-09adaef973dc/Netflix_Logo_PMS.png";

export const BACKGROUND_IMAGE =
  "https://assets.nflxext.com/ffe/siteui/vlv3/2e07bc25-8b8f-4531-8e1f-7e5e33938793/a9ee5c28-3db3-493d-905b-1ae6a06cb86b/CA-en-20240219-popsignuptwoweeks-perspective_alpha_website_large.jpg";

export const USER_AVATAR =
  "https://occ-0-487-1722.1.nflxso.net/dnm/api/v6/vN7bi_My87NPKvsBoib006Llxzg/AAAABXYofKdCJceEP7pdxcEZ9wt80GsxEyXIbnG_QM8znksNz3JexvRbDLr0_AcNKr2SJtT-MLr1eCOA-e7xlDHsx4Jmmsi5HL8.png?r=1d4";

export const API_OPTIONS = {
  method: "GET",
  headers: {
    Authorization: "Bearer " + process.env.REACT_APP_TMDB_KEY,
    accept: "application/json",
  },
};

export const IMG_CDN_URL = "https://image.tmdb.org/t/p/w780/";

export const OPEN_AI_KEY = process.env.REACT_APP_OPEN_AI_KEY;
