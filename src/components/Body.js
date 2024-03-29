import Login from "./Login";
import Browse from "./Browse";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

const Body = () => {
  const appRouter = createBrowserRouter([
    { path: "/", element: <Login /> },
    { path: "/login", element: <Login /> },
    { path: "/browse", element: <Browse /> },
  ]);

  return (
    <div className="bg-black z-0 relative h-screen">
      <RouterProvider router={appRouter}></RouterProvider>
    </div>
  );
};

export default Body;
