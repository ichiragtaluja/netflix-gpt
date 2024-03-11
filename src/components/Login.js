import React, { useState, useRef } from "react";
import Header from "./Header";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { checkValidate } from "../utils/validate";
import { auth } from "../utils/firebase";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { BACKGROUND_IMAGE, USER_AVATAR, userAvatar } from "../utils/constants";

const Login = () => {
  const [isSignInForm, setIsSignInForm] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  const name = useRef(null);
  const email = useRef(null);
  const password = useRef(null);
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

          updateProfile(auth.currentUser, {
            displayName: name.current.value,
            photoURL: USER_AVATAR,
          })
            .then(() => {
              const { uid, email, displayName } = auth.currentUser;
              dispatch(addUser({ uid, email, displayName }));
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

          // navigate("/browse");
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
      <img src={BACKGROUND_IMAGE} alt="background-img" />
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
