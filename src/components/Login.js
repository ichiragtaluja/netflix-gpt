import React, { useState, useRef } from "react";
import Header from "./Header";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { checkValidate } from "../utils/validate";
import { auth } from "../utils/firebase";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";

const Login = () => {
  const [isSignInForm, setIsSignInForm] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  const name = useRef(null);
  const email = useRef(null);
  const password = useRef(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const toggleSignInForm = () => {
    setIsSignInForm(!isSignInForm);
  };

  const handleButtonClick = () => {
    //validate form data
    let nameValue = "Undefined"; // default value

    if (name.current && name.current.value) {
      nameValue = name.current.value;
    }

    const message = checkValidate(
      email.current.value,
      password.current.value,
      nameValue
    );
    setErrorMessage(message);
    if (message) return;
    if (!isSignInForm) {
      createUserWithEmailAndPassword(
        auth,
        email.current.value,
        password.current.value
      )
        .then((userCredential) => {
          // Signed up
          const user = userCredential.user;
          console.log(user);

          updateProfile(auth.currentUser, {
            displayName: name.current.value,
            photoURL: "https://example.com/jane-q-user/profile.jpg",
          })
            .then(() => {
              const { uid, email, displayName } = auth.currentUser;
              dispatch(addUser({ uid, email, displayName }));

              navigate("/browse");
              // Profile updated!
              // ...
            })
            .catch((error) => {
              // An error occurred
              setErrorMessage(error.message);
              // ...
            });

          // ...
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setErrorMessage(errorCode + "-" + errorMessage);
          // ..
        });
    } else {
      signInWithEmailAndPassword(
        auth,
        email.current.value,
        password.current.value
      )
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;
          console.log(user);
          navigate("/browse");
          // ...
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setErrorMessage(errorCode + "-" + errorMessage);
        });
    }
  };

  return (
    <div className="bg-black relative">
      <Header />
      <img
        src="https://assets.nflxext.com/ffe/siteui/vlv3/2e07bc25-8b8f-4531-8e1f-7e5e33938793/a9ee5c28-3db3-493d-905b-1ae6a06cb86b/CA-en-20240219-popsignuptwoweeks-perspective_alpha_website_large.jpg"
        alt="background-img"
      />
      <div className="absolute inset-0 bg-black opacity-50"></div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
        }}
        className="bg-black bg-opacity-70 w-4/12  absolute top-0 left-0 right-0 flex flex-col my-32 mx-auto justify-center  p-16"
      >
        <h1 className="text-white  text-4xl my-4">
          {isSignInForm ? "Sign In" : "Sign Up"}
        </h1>
        {!isSignInForm && (
          <input
            ref={name}
            className=" text-md text-gray-500 rounded-sm px-4 py-3 my-2 bg-neutral-700"
            type="text"
            placeholder="Full Name"
          />
        )}
        <input
          ref={email}
          className=" text-md text-gray-500 rounded-sm px-4 py-3 my-2 bg-neutral-700"
          type="email"
          placeholder="Email Address"
        />
        <input
          ref={password}
          className="text-md text-gray-500 rounded-sm px-4 py-3 my-4 bg-neutral-700"
          type="password"
          placeholder="Password"
        />
        <p className="text-red-500">{errorMessage}</p>
        <button
          onClick={handleButtonClick}
          className="rounded-sm font-bold bg-red-600 p-3 mt-6  bg-blue-500 text-white"
        >
          {isSignInForm ? "Sign In" : "Sign-Up"}
        </button>
        {isSignInForm ? (
          <p onClick={toggleSignInForm} className=" text-sm my-4 text-gray-500">
            New to Netflix?{" "}
            <a className="cursor-pointer text-white" onClick={toggleSignInForm}>
              Sign-Up Now
            </a>
          </p>
        ) : (
          <p onClick={toggleSignInForm} className=" text-sm my-4 text-gray-500">
            Already Registered?{" "}
            <a className="cursor-pointer text-white" onClick={toggleSignInForm}>
              Sign In
            </a>
          </p>
        )}
      </form>
    </div>
  );
};

export default Login;
