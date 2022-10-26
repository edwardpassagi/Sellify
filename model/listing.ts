import { ListingStatus } from "./listingStatus";
import User from "./user";
/**
 * This script defines the model of a `Listing` object
 */
export default interface Listing {
  _id: string;
  title: string;
  price: number;
  shippingFee: number;
  description: string;
  imageUrl: string;
  // listed since to store DateTime and calculate timeframe in backend
  listedSince: string;
  listingLocation: string;

  // order status
  status: ListingStatus;

  createdBy: User;
  interestedUsernames: User[];
}
