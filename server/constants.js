const Constants = {
  database: {
    userCollections: "users",
    productCollections: "products",
  },
  responseHTTP: {
    success: 200,
    badRequest: 400,
    unaothorized: 401,
    notFound: 404,
    conflict: 409,
    internalServerError: 500,
    badGateway: 502,
  },
  responseMsg: {
    pageNotFound: "Page not found",
    signUpSuccesful: "Sign-up successful",
    duplicateUsername: "Username  already exists",
    nullUsername: "Username is not provided",
    nullPassword: "Password is not provided",
    nullName: "Name is not provided",
    userNotFound: "User not found",
    userLoggedIn: "User logged in",
    userWrongPassword: "Wrong password entered",
    authorizedMessage: "You have been authorized",
    notAuthenticated: "Not authenticated",
    unaothorizedMessage: "Unauthorized",
  },
};

export { Constants };
