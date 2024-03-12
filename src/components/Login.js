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
import { BACKGROUND_IMAGE, USER_AVATAR } from "../utils/constants";

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

  const handleTestButtonClick = () => {
    signInWithEmailAndPassword(auth, "ichiragtaluja@gmail.com", "Shivi@11111")
      .then((userCredential) => {
        const user = userCredential.user;
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        setErrorMessage(errorCode + "-" + errorMessage);
      });
  };

  const handleButtonClick = () => {
    let nameValue = "Undefined";

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
              setErrorMessage(error.message);
            });
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setErrorMessage(errorCode + "-" + errorMessage);
        });
    } else {
      signInWithEmailAndPassword(
        auth,
        email.current.value,
        password.current.value
      )
        .then((userCredential) => {
          const user = userCredential.user;
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
        className="h-screen w-screen object-cover"
        src={BACKGROUND_IMAGE}
        alt="background-img"
      />
      <div className="absolute inset-0 bg-black opacity-50"></div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
        }}
        className="bg-black bg-opacity-70 h-4/5 w-4/5 md:w-4/12  absolute top-0 left-0 right-0 flex flex-col my-28 mx-auto justify-center  p-16"
      >
        <h1 className="text-white  text-4xl my-3">
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
        {isSignInForm && (
          <button
            onClick={handleTestButtonClick}
            className="rounded-sm font-bold bg-blue-500 p-3 mt-6 border border-blue-500 text-white hover:bg-blue-400 hover:border-transparent transition-colors duration-300"
          >
            Login with Test Credentials
          </button>
        )}
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
