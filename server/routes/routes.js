import express from "express";
import bodyParser from "body-parser";
import { signup, login, isAuth } from "../controllers/auth.js";
import {
  getProducts,
  insertDefault,
  insertProduct,
  getHistory,
  setInterested,
  editStatus,
  setAllStatusToListing,
} from "../controllers/products.js";
import { Constants } from "../constants.js";

const router = express.Router();
var jsonParser = bodyParser.json();

// auth endpoints
router.post("/signup", jsonParser, signup);
router.post("/login", jsonParser, login);
router.get("/private", isAuth);

// product endpoints
router.post("/default", insertDefault);
router.post("/reset/all/listing", setAllStatusToListing);
router.post("/products", jsonParser, getProducts);
router.post("/history", jsonParser, getHistory);
router.post("/product/insert", jsonParser, insertProduct);

// `I'm interested!` and modify endpoints
router.post("/interested/set", jsonParser, setInterested);
router.post("/status/set", jsonParser, editStatus);

router.get("/public", (req, res, next) => {
  res.status(200).json({ message: "succesfully signed in" });
});

// to match any other path, right now only for testing if its connected to DB
router.use("/", (req, res, next) => {
  res.status(Constants.responseHTTP.badRequest).json({
    error: Constants.responseMsg.pageNotFound,
  });
});

export default router;
