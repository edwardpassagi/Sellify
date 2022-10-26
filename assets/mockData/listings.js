import { ListingStatus } from "../../model/listingStatus";

const imgLink =
  "https://cdn.discordapp.com/attachments/814648750089437277/910323375228989481/sampleListing.png";

const listingsData = [
  {
    id: "listings-1",
    title: "Home Studio Microphone",
    price: 35,
    shippingFee: 0,
    description:
      "Minor use, USB cable and tripod included. Have only been used for a couple of weeks for a school project. Will include shipping fees if needed.",
    imageUrl: imgLink,
    // listed since to store DateTime and calculate timeframe in backend
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
    id: "listings-2",
    title: "Yamaha Keyboard Set",
    price: 65.5,
    shippingFee: 14.59,
    description:
      "Yamaha keyboard set that I rarely use so Im selling it on sellify. I hope you will like it.",
    imageUrl: imgLink,
    createdBy: {
      username: "stonov",
      name: "Simeon Tonov",
    },
    // listed since to store DateTime and calculate timeframe in backend
    listedSince: "3 days ago",
    listingLocation: "Savoy, IL",
  },
  {
    id: "listings-3",
    title: "iPhone XS",
    price: 200,
    shippingFee: 25.99,
    description:
      "This is a fake iPhone XS that that I was scammed on. Im selling it for cheap so you better cop.",
    imageUrl: imgLink,
    createdBy: {
      username: "fyazic",
      name: "Furkan Y",
    },
    // listed since to store DateTime and calculate timeframe in backend
    listedSince: "2 days ago",
    listingLocation: "Urbana, IL",
  },
  {
    id: "listings-4",
    title: "Hitachi TV",
    price: 90,
    shippingFee: 0,
    description:
      "Hitachi TV that you guys can use since I barely use it. Bought in 2020 to go thru pandemic and has only been thru mild use",
    imageUrl: imgLink,
    createdBy: {
      username: "mab21",
      name: "Mohamed A",
    },
    // listed since to store DateTime and calculate timeframe in backend
    listedSince: "2 days ago",
    listingLocation: "Urbana, IL",
  },
  {
    id: "listings-5",
    title: "Selfie Phone Tripod",
    price: 6,
    shippingFee: 2,
    description:
      "Selfie tripod for all the future vloggers out there in Champaign-urbana area. I know you want this really bad so Imma charge u extra $2 for the shipping fees.",
    imageUrl: imgLink,
    createdBy: {
      username: "hhache",
      name: "Sam Hachem",
    },
    // listed since to store DateTime and calculate timeframe in backend
    listedSince: "23 hours ago",
    listingLocation: "Champaign, IL",
  },
];

export default listingsData;
