import React, { useContext, useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  Dimensions,
  TouchableOpacity,
  Image,
  Platform,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import colors from "../assets/colors/color";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";

import listingHistories from "../assets/mockData/listingHistory";
import { ListingStatus } from "../model/listingStatus";
import { AuthContext } from "../model/authData";
import Listing from "../model/listing";
import { useIsFocused } from "@react-navigation/native";
import AppLoading from "expo-app-loading";

const API_URL =
  Platform.OS === "ios" ? "http://192.168.1.104:3000" : "http://10.0.2.2:3000";

const History = ({ navigation }) => {
  const [curUser, setCurUser] = useContext(AuthContext);
  const [listings, setListings] = useState<Listing[]>();

  const getListings = () => {
    const payload = {
      username: curUser.username,
    };
    fetch(`${API_URL}/history`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    })
      .then(async (res) => {
        try {
          const jsonRes = await res.json();
          if (res.status == 200) {
            setListings(jsonRes.products);
          }
        } catch (err) {
          console.log(err);
        }
      })
      .catch((err) => console.log(err));
  };

  useEffect(getListings, [useIsFocused()]);
  return (
    <View style={styles.container}>
      <ScrollView
        stickyHeaderIndices={[0]}
        showsVerticalScrollIndicator={false}
      >
        {/* Search Bar */}
        <SafeAreaView style={{ backgroundColor: colors.white }}>
          <View style={styles.topBarWrapper}>
            <View style={styles.searchBarWrapper}>
              <View style={styles.searchIcon}>
                <FontAwesome5
                  name="search"
                  size={20}
                  color={colors.lightGray}
                />
              </View>
              <TextInput
                style={styles.searchBarInput}
                placeholder="Search past listings..."
              />
            </View>
          </View>
        </SafeAreaView>

        {/* Cards for each entries */}
        {!listings ? (
          <AppLoading />
        ) : (
          <View style={styles.listingsWrapper}>
            <RenderListingCards navigation={navigation} listings={listings} />
          </View>
        )}
      </ScrollView>
    </View>
  );
};

const RenderListingCards = (props) => {
  // .map() iterates through listing items and create individual listing card
  const listing: Listing[] = props.listings;
  return (
    <>
      {listing.map((listing) => {
        return (
          <TouchableOpacity
            key={listing._id}
            onPress={() =>
              props.navigation.navigate("OrderDetailScreen", {
                listing: listing,
                isManagerView: true,
              })
            }
          >
            <View
              style={[
                styles.listingCardWrapper,
                {
                  backgroundColor: historyCardColor(listing.status),
                },
              ]}
            >
              <View style={styles.cardContentLeft}>
                <Image
                  source={{
                    uri: listing.imageUrl,
                  }}
                  style={styles.cardImage}
                />
                <View style={styles.locationWrapper}>
                  <FontAwesome5 name="map-pin" size={15} color={colors.white} />
                  <Text style={styles.cardLocation}>
                    {listing.listingLocation}
                  </Text>
                </View>
              </View>
              <View style={styles.cardContentRight}>
                <Text style={styles.cardTitle}>{listing.title}</Text>
                <Text style={styles.cardPrice}>${listing.price}</Text>
                <Text style={styles.cardAuthor}>
                  by {listing.createdBy.name}
                </Text>
                <Text style={styles.cardTime}>
                  Listed {listing.listedSince}
                </Text>
                <View style={styles.shippingFeesWrapper}>
                  <View
                    style={[
                      styles.shippingFeesLabel,
                      {
                        backgroundColor: statusLabelColor(listing.status),
                      },
                    ]}
                  >
                    <Text style={styles.cardShippingInfo}>
                      {statusLabelText(listing.status)}
                    </Text>
                  </View>
                </View>
              </View>
            </View>
          </TouchableOpacity>
        );
      })}
    </>
  );
};

// Determine card color
const historyCardColor = (status: ListingStatus) => {
  if (status == ListingStatus.COMPLETED) return colors.lightGreen;
  if (status == ListingStatus.LISTING) return colors.lightYellow;
  if (status == ListingStatus.CANCELLED) return colors.lightRed;
};

// Determine shipping cost label color
const statusLabelColor = (status: ListingStatus) => {
  if (status == ListingStatus.COMPLETED) return colors.green;
  if (status == ListingStatus.LISTING) return colors.orange;
  if (status == ListingStatus.CANCELLED) return colors.red;
};

// Determine shipping cost label text
const statusLabelText = (status: ListingStatus) => {
  if (status == ListingStatus.COMPLETED) return "Completed";
  if (status == ListingStatus.LISTING) return "In Progress";
  if (status == ListingStatus.CANCELLED) return "Cancelled";
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  topBarWrapper: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",

    // platform specific margin
    ...Platform.select({
      ios: {
        marginTop: 20,
      },
      android: {
        marginBottom: 20,
      },
    }),
    marginHorizontal: 20,
    backgroundColor: colors.white,
  },
  searchBarWrapper: {
    flex: 1,
    backgroundColor: "#ffffff",
    flexDirection: "row",
    alignItems: "center",
    height: 40,
    borderRadius: 15,

    // Drop shadow
    shadowColor: "#000",
    shadowOffset: {
      width: -2,
      height: -2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,

    elevation: 5,
  },
  searchIcon: {
    marginLeft: 15,
  },
  searchBarInput: {
    marginLeft: 10,
    fontFamily: "LatoLight",
    fontSize: 15,
  },
  listingsWrapper: {
    marginHorizontal: 20,
    marginBottom: 40,
  },
  listingCardWrapper: {
    marginTop: 20,
    borderRadius: 20,
    backgroundColor: "#ffffff",
    flexDirection: "row",

    // Drop shadow
    shadowColor: "#000",
    shadowOffset: {
      width: -2,
      height: -2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,

    elevation: 5,
  },
  cardContentLeft: {
    marginVertical: 10,
    marginLeft: 20,
  },
  cardImage: {
    height: 100,
    width: 100,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
  },
  locationWrapper: {
    marginTop: 10,
    flexDirection: "row",
  },
  cardLocation: {
    marginLeft: 5,
    fontFamily: "LatoRegularItalic",
    fontSize: 14,
    color: colors.black,
  },
  cardContentRight: {
    flex: 1,
    marginVertical: 10,
    marginLeft: 20,
  },
  cardTitle: {
    fontFamily: "LatoBold",
    fontSize: 19,
    color: colors.black,
  },
  cardPrice: {
    marginTop: 2.5,
    fontFamily: "LatoBold",
    fontSize: 22,
    color: colors.darkGreen,
  },
  cardAuthor: {
    marginTop: 2.5,
    fontFamily: "LatoRegular",
    fontSize: 14,
    color: colors.black,
  },
  cardTime: {
    marginTop: 10,
    fontFamily: "LatoRegularItalic",
    fontSize: 12,
    color: colors.black,
  },
  shippingFeesWrapper: {
    marginTop: 10,
    flexDirection: "row-reverse",
  },
  shippingFeesLabel: {
    marginRight: 10,
    borderRadius: 10,
    backgroundColor: colors.green,
    padding: 5,
  },
  cardShippingInfo: {
    fontFamily: "LatoBold",
    fontSize: 10,
    color: colors.white,
  },
});

export default History;
