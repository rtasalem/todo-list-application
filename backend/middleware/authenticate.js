const checkLoggedIn = (request, response, next) => {
  // Assuming you have a way to determine if the user is logged in
  // This could be based on a session, JWT, or any other authentication mechanism

  if (request.session && request.session.user) {
    next();
  } else {
    response
      .status(401)
      .json({ message: "Unauthorized access. Please log in." });
  }
};

module.exports = authenticate;
