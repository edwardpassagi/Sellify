import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { User } from "../models/user.js";
import mongoUtil from "../utils/database.js";
import { Constants } from "../constants.js";
import { jwtConstants } from "../sensitiveConstants.js";

function isValidRequest(req, res, type = "login") {
  // login only validates username and password
  if (
    typeof req.body.username === "undefined" ||
    req.body.username.length == 0
  ) {
    res
      .status(Constants.responseHTTP.badRequest)
      .json({ message: Constants.responseMsg.nullUsername });
    return false;
  } else if (
    typeof req.body.password === "undefined" ||
    req.body.password.length == 0
  ) {
    res
      .status(Constants.responseHTTP.badRequest)
      .json({ message: Constants.responseMsg.nullPassword });
    return false;
  }

  if (type == "signup") {
    if (typeof req.body.name === "undefined" || req.body.name.length == 0) {
      res
        .status(Constants.responseHTTP.badRequest)
        .json({ message: Constants.responseMsg.nullName });
      return false;
    }
  }
  return true;
}

const signup = (req, res, next) => {
  // validates request
  if (!isValidRequest(req, res, "signup")) {
    return;
  }

  var db = mongoUtil.getDb();
  var userCollections = db.collection(Constants.database.userCollections);
  userCollections
    .findOne({
      username: req.body.username,
    })
    .then((dbUser) => {
      // check if user username already exists
      if (dbUser) {
        return res
          .status(Constants.responseHTTP.conflict)
          .json({ message: Constants.responseMsg.duplicateUsername });
      }

      // passed all validation, create password hash and upload to db
      bcrypt.hash(req.body.password, 12, (err, passwordHash) => {
        if (err) {
          return res
            .status(Constants.responseHTTP.internalServerError)
            .json({ message: "failed to hash the password" });
        } else if (passwordHash) {
          var user = new User(req.body.username, passwordHash, req.body.name);
          userCollections.insertOne(user.userJson, (err, _) => {
            if (err) {
              return res
                .status(Constants.responseHTTP.internalServerError)
                .json({
                  message: "failed to upload entry",
                });
            }
            return res
              .status(Constants.responseHTTP.success)
              .json({ message: Constants.responseMsg.signUpSuccesful });
          });
        }
      });
    })
    .catch((err) => {
      console.log("error on signup: ", err);
    });
};

const login = (req, res, next) => {
  // validates request
  if (!isValidRequest(req, res, "login")) {
    return;
  }
  var db = mongoUtil.getDb();
  var userCollections = db.collection(Constants.database.userCollections);
  userCollections
    .findOne({
      username: req.body.username,
    })
    .then((dbUser) => {
      // if username doesnt exist
      if (!dbUser) {
        return res
          .status(Constants.responseHTTP.notFound)
          .json({ message: Constants.responseMsg.userNotFound });
      }

      // compare passowrd hash from request and stored user
      bcrypt.compare(
        req.body.password,
        dbUser.passwordHash,
        (err, compareRes) => {
          if (err)
            return res.status(Constants.responseHTTP.badGateway).json({
              message: "error while checking user password",
            });
          // password match
          if (compareRes) {
            const token = jwt.sign(
              { username: req.body.username },
              jwtConstants.secretString,
              { expiresIn: "1h" }
            );
            return res.status(Constants.responseHTTP.success).json({
              message: Constants.responseMsg.userLoggedIn,
              username: dbUser.username,
              name: dbUser.name,
              token: token,
            });
          }

          // password doesnt match
          return res.status(Constants.responseHTTP.unaothorized).json({
            message: Constants.responseMsg.userWrongPassword,
          });
        }
      );
    })
    .catch((err) => {
      console.log("error on login: ", err);
    });
};

const isAuth = (req, res, next) => {
  const authHeader = req.get("Authorization");
  if (!authHeader) {
    return res
      .status(Constants.responseHTTP.unaothorized)
      .json({ message: Constants.responseMsg.notAuthenticated });
  }
  const token = authHeader.split(" ")[1];

  let decodedToken;
  try {
    decodedToken = jwt.verify(token, jwtConstants.secretString);
  } catch (err) {
    return res
      .status(Constants.responseHTTP.internalServerError)
      .json({ message: err.message || "could not decode the token" });
  }
  if (!decodedToken) {
    return res
      .status(Constants.responseHTTP.unaothorized)
      .json({ message: Constants.responseMsg.unaothorizedMessage });
  } else {
    return res.status(Constants.responseHTTP.success).json({
      message: Constants.responseMsg.authorizedMessage,
    });
  }
};

export { signup, login, isAuth };
