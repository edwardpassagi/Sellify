/**
 * Sample listing for demo purposes
 */
// there are 11 fields

import ListingStatus from "../../models/listingStatus.js";

const imgIphone =
  "https://cdn.discordapp.com/attachments/814648750089437277/910323375228989481/sampleListing.png";

const imgKeyboard =
  "https://cdn.discordapp.com/attachments/814648750089437277/910322909472514058/sampleListing.png";

const defaultListings = [
  {
    title: "Home Studio Microphone",
    price: 35,
    shippingFee: 0,
    description:
      "Minor use, USB cable and tripod included. Have only been used for a couple of weeks for a school project. Will include shipping fees if needed.",
    imageUrl: imgIphone,
    listedSince: "10 days ago",
    listingLocation: "Champaign, IL",
    status: ListingStatus.LISTING,
    createdBy: {
      username: "edwardpassagi",
      name: "Edward Passagi",
    },
    interestedUsernames: [
      {
        username: "stonov",
        name: "Simeon Tonov",
      },
    ],
  },
  {
    title: "Yamaha Keyboard Set",
    price: 65.5,
    shippingFee: 14.59,
    description:
      "Yamaha keyboard set that I rarely use so Im selling it on sellify. I hope you will like it.",
    imageUrl: imgKeyboard,
    listedSince: "3 days ago",
    listingLocation: "Savoy, IL",
    status: ListingStatus.LISTING,
    createdBy: {
      username: "stonov",
      name: "Simeon Tonov",
    },
    interestedUsernames: [
      {
        username: "epassagi",
        name: "Edward Passagi",
      },
    ],
  },
  {
    title: "iPhone XS",
    price: 200,
    shippingFee: 25.99,
    description:
      "This is a fake iPhone XS that that I was scammed on. Im selling it for cheap so you better cop.",
    imageUrl: imgIphone,
    listedSince: "2 days ago",
    listingLocation: "Urbana, IL",
    status: ListingStatus.LISTING,
    createdBy: {
      username: "fyazic",
      name: "Furkan Y",
    },
    interestedUsernames: [
      {
        username: "hhache",
        name: "Sam Hachem",
      },
    ],
  },
  {
    title: "Hitachi TV",
    price: 90,
    shippingFee: 0,
    description:
      "Hitachi TV that you guys can use since I barely use it. Bought in 2020 to go thru pandemic and has only been thru mild use",
    imageUrl: imgKeyboard,
    listedSince: "2 days ago",
    listingLocation: "Urbana, IL",
    status: ListingStatus.COMPLETED,
    createdBy: {
      username: "mab",
      name: "Mohamed A",
    },
    interestedUsernames: [
      {
        username: "hhache",
        name: "Sam Hachem",
      },
    ],
  },
  {
    title: "Selfie Phone Tripod",
    price: 6,
    shippingFee: 2,
    description:
      "Selfie tripod for all the future vloggers out there in Champaign-urbana area. I know you want this really bad so Imma charge u extra $2 for the shipping fees.",
    imageUrl: imgIphone,
    listedSince: "23 hours ago",
    listingLocation: "Champaign, IL",
    createdBy: {
      username: "hhache",
      name: "Sam Hachem",
    },
    status: ListingStatus.CANCELLED,
    interestedUsernames: [
      {
        username: "stonov",
        name: "Simeon Tonov",
      },
    ],
  },
];

export default defaultListings;
