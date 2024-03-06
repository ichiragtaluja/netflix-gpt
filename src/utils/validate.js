export const checkValidate = (email, password, name) => {
  const isEmailValid = /^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/.test(
    email
  );
  const isPasswordValid =
    /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/.test(password);

  //   const isNameValid =
  //     /([A-Z][a-z]{3,} )([A-Z][a-z]{3,} )?([A-Z][a-z]{3,})/.test(name);

  const isNameValid =
    /^([A-Z][a-z]{3,} )?([A-Z][a-z]{3,} )?([A-Z][a-z]{3,})?$/.test(name);

  if (!isNameValid) {
    return "Name is not valid";
  }
  if (!isEmailValid) {
    return "Email ID is not valid";
  }
  if (!isPasswordValid) {
    return "Password is not valid";
  }

  return null;
};
