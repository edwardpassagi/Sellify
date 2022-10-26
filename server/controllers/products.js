import mongoUtil from "../utils/database.js";
import jwt from "jsonwebtoken";
import { jwtConstants } from "../sensitiveConstants.js";
import { Constants } from "../constants.js";
import defaultListings from "../assets/mockData/defaultListings.js";
import ListingStatus from "../models/listingStatus.js";
import { ObjectId } from "mongodb";

/**
 * This script is responsible for managing the backend API communicatin with our
 * mongoDB database.
 */

function isValidGetRequest(req, res) {
  if (
    typeof req.body === "undefined" ||
    typeof req.body.username === "undefined"
  ) {
    res.status(Constants.responseHTTP.badRequest).json({
      error: "please provide a valid username in your request body",
    });
    return false;
  }
  return true;
}

// return all products that are currently being listed
// & excludes logged in username
const getProducts = (req, res, next) => {
  // validate request
  if (!isValidGetRequest(req, res)) return;

  const username = req.body.username;
  const query = {
    status: ListingStatus.LISTING,
    "createdBy.username": { $ne: username },
    "interestedUsernames.username": { $ne: username },
  };
  console.log("GET /products from ", req.headers["user-agent"]);
  var db = mongoUtil.getDb();
  var productCollections = db.collection(Constants.database.productCollections);
  productCollections
    .find(query)
    .toArray()
    .then((products) => {
      return res
        .status(Constants.responseHTTP.success)
        .json({ count: products.length, products: products });
    })
    .catch((result) => {
      return res
        .status(Constants.responseHTTP.internalServerError)
        .json({ message: result });
    });
};

// insert a product
const insertProduct = (req, res, next) => {
  // validate request
  if (typeof req.body === "undefined") {
    return res.status(Constants.responseHTTP.badRequest).json({
      error: "please provide your insert request within the HTTP body",
    });
  }
  var db = mongoUtil.getDb();
  var productCollections = db.collection(Constants.database.productCollections);
  productCollections
    .insertOne(req.body)
    .then((result) => {
      return res
        .status(Constants.responseHTTP.success)
        .json({ message: result });
    })
    .catch((err) => {
      return res
        .status(Constants.responseHTTP.internalServerError)
        .json({ error: err });
    });
};

// returns listings that are either created by `username` or where `username`
// is interested in and the order is still listed
const getHistory = (req, res, next) => {
  // validate request
  if (!isValidGetRequest(req, res)) return;
  const username = req.body.username;
  const query = {
    $or: [
      { "createdBy.username": username },
      {
        $and: [
          { "interestedUsernames.username": username },
          { status: ListingStatus.LISTING },
        ],
      },
    ],
  };

  var db = mongoUtil.getDb();
  var productCollections = db.collection(Constants.database.productCollections);
  productCollections
    .find(query)
    .toArray()
    .then((products) => {
      return res
        .status(Constants.responseHTTP.success)
        .json({ count: products.length, products: products });
    })
    .catch((result) => {
      return res
        .status(Constants.responseHTTP.internalServerError)
        .json({ message: result });
    });
};

// endpoint to mark listing as interested
const setInterested = (req, res, next) => {
  // validate request
  if (!isValidGetRequest(req, res)) return;

  const query = {
    $push: {
      interestedUsernames: { username: req.body.username, name: req.body.name },
    },
  };
  var db = mongoUtil.getDb();
  var productCollections = db.collection(Constants.database.productCollections);
  productCollections
    .updateOne({ _id: ObjectId(req.body._id) }, query)
    .then((result) => {
      return res
        .status(Constants.responseHTTP.success)
        .json({ message: result });
    })
    .catch((err) => {
      return res
        .status(Constants.responseHTTP.internalServerError)
        .json({ error: err });
    });
};

// endpoint to modify status
const editStatus = (req, res, next) => {
  // validate request
  if (typeof req.body === "undefined") {
    return res.status(Constants.responseHTTP.badRequest).json({
      error: "please provide your insert request within the HTTP body",
    });
  }

  const query = { $set: { status: req.body.status } };
  var db = mongoUtil.getDb();
  var productCollections = db.collection(Constants.database.productCollections);
  productCollections
    .updateOne({ _id: ObjectId(req.body._id) }, query)
    .then((result) => {
      return res
        .status(Constants.responseHTTP.success)
        .json({ message: result });
    })
    .catch((err) => {
      return res
        .status(Constants.responseHTTP.internalServerError)
        .json({ error: err });
    });
};

// DEMO: Insert all the listings from assets/mockData/defaultListings.js
const insertDefault = (req, res, next) => {
  var db = mongoUtil.getDb();
  var productCollections = db.collection(Constants.database.productCollections);
  productCollections
    .insertMany(defaultListings)
    .then((result) => {
      return res
        .status(Constants.responseHTTP.success)
        .json({ message: "succesfully inserted demo DB" });
    })
    .catch((err) => {
      return res
        .status(Constants.responseHTTP.internalServerError)
        .json({ message: err });
    });
};

// DEMO: Set all listing status back to "LISTING"
const setAllStatusToListing = (req, res, next) => {
  var db = mongoUtil.getDb();
  var productCollections = db.collection(Constants.database.productCollections);
  productCollections
    .updateMany({}, { $set: { status: "LISTING" } })
    .then((result) => {
      return res
        .status(Constants.responseHTTP.success)
        .json({ message: result });
    })
    .catch((err) => {
      return res
        .status(Constants.responseHTTP.internalServerError)
        .json({ message: err });
    });
};

export {
  getProducts,
  insertProduct,
  insertDefault,
  getHistory,
  setInterested,
  editStatus,
  setAllStatusToListing,
};
