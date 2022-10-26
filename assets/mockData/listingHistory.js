import { ListingStatus } from "../../model/listingStatus";

const listingHistories = [
  {
    id: "listings-1",
    title: "Home Studio Microphone",
    price: 35,
    shippingFee: 0,
    description:
      "Minor use, USB cable and tripod included. Have only been used for a couple of weeks for a school project. Will include shipping fees if needed.",
    imageUrl:
      "https://scontent-ort2-2.xx.fbcdn.net/v/t45.5328-4/c0.159.960.960a/p960x960/251046456_4626762574078065_1663113927182467496_n.jpg?_nc_cat=108&ccb=1-5&_nc_sid=c48759&_nc_ohc=wHcykt2BJr0AX_8qvPu&_nc_ht=scontent-ort2-2.xx&oh=c2b3bab1c1720feafa0f50afa934ca25&oe=618EE7B0",
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
    id: "listings-6",
    title: "PC gaming",
    price: 1100,
    shippingFee: 25,
    description:
      "Minor use, mostly for school related stuf without heavy loads. Some issues with power adapter which can easily be replaced for ~$50",
    imageUrl:
      "https://scontent-ort2-2.xx.fbcdn.net/v/t45.5328-4/c0.373.960.960a/p960x960/251412071_4431808516895538_1496598711426860703_n.png.jpg?_nc_cat=109&ccb=1-5&_nc_sid=c48759&_nc_ohc=hAoQsRF2fzAAX8E-DZf&_nc_ht=scontent-ort2-2.xx&oh=b058cab54cc159b924f75ca6988b7d36&oe=61918570",
    // listed since to store DateTime and calculate timeframe in backend
    listedSince: "3 days ago",
    listingLocation: "Savoy, IL",

    status: ListingStatus.COMPLETED,
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
    id: "listings-7",
    title: "2006 Mustang 175k Mi",
    price: 3150,
    shippingFee: 0,
    description:
      "2006 175k drives good needs I bought it at the auction. Put new struts and stabilizer on it, the upper arm controls still meed replaced. I put rims and flashing led lights on rims. come with the money and it’s yours.",
    imageUrl:
      "https://scontent-ort2-2.xx.fbcdn.net/v/t45.5328-4/c0.373.960.960a/p960x960/251663170_4741639299191932_6208037917386497242_n.png.jpg?_nc_cat=111&ccb=1-5&_nc_sid=c48759&_nc_ohc=iNUDT46cyeoAX_OsBeU&_nc_oc=AQlG4SMK4HaLX0evN9XVG7foQHHrop1U-P1BnDIC63NiGO_pDNIQ-g6nXkJyAdhInJ4&_nc_ht=scontent-ort2-2.xx&oh=215f34ede3f54ae7770e2a100ae58e13&oe=6190285B",
    // listed since to store DateTime and calculate timeframe in backend
    listedSince: "3 days ago",
    listingLocation: "Champaign, IL",

    status: ListingStatus.CANCELLED,
    createdBy: {
      username: "edwardpassagi",
      name: "Edward Passagi",
    },
    interestedUsernames: [],
  },
];

export default listingHistories;
