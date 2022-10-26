import React, { useContext } from "react";
import {
  View,
  Text,
  Dimensions,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
  Alert,
  ScrollView,
  Platform,
} from "react-native";

import colors from "../assets/colors/color";
import Listing from "../model/listing";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import { AuthContext } from "../model/authData";
import { ListingStatus } from "../model/listingStatus";

const height = Dimensions.get("window").height;
const API_URL =
  Platform.OS === "ios" ? "http://192.168.1.104:3000" : "http://10.0.2.2:3000";

const OrderDetail = ({ route, navigation }) => {
  const listing: Listing = route.params.listing;
  var isManagerView: boolean = route.params.isManagerView;

  // check if its order manager view, if its undefined, then its false
  if (!isManagerView) isManagerView = false;

  return (
    <View style={styles.container}>
      <ImageBackground
        source={{ uri: listing.imageUrl }}
        style={styles.backgroundImage}
      >
        {/* Back Button */}
        <TouchableOpacity
          style={styles.backIcon}
          onPress={() => navigation.goBack()}
        >
          <FontAwesome5 name="chevron-left" size={32} color={colors.white} />
        </TouchableOpacity>

        <View style={styles.titlesWrapper}>
          <Text style={styles.itemTitle}>{listing.title}</Text>
          <View style={styles.locationWrapper}>
            <FontAwesome5 name="map-pin" size={20} color={colors.white} />
            <Text style={styles.locationText}>{listing.listingLocation}</Text>
          </View>
        </View>
      </ImageBackground>

      {/* Description Segment */}
      <View style={styles.descriptionWrapper}>
        <ScrollView showsVerticalScrollIndicator={false}>
          {/* Price and description */}
          <View style={styles.descriptionTextWrapper}>
            <Text style={styles.priceText}>${listing.price}</Text>
            <Text style={styles.descriptionTitle}>Description</Text>
            <Text style={styles.descriptionText}>{listing.description}</Text>
          </View>

          {/* Book now button */}
          <RenderButtons
            isManagerView={isManagerView}
            listing={listing}
            navigation={navigation}
          />
        </ScrollView>
      </View>
    </View>
  );
};

const RenderButtons = (props) => {
  const listing: Listing = props.listing;
  const isManagerView: boolean = props.isManagerView;
  const [curUser, setCurUser] = useContext(AuthContext);

  const interestedAction = () => {
    const payload = {
      username: curUser.username,
      name: curUser.name,
      _id: listing._id,
    };
    fetch(`${API_URL}/interested/set`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    }).then(async (res) => {
      try {
        const jsonRes = await res.json();
        if (res.status == 200) {
          Alert.alert(
            "Got it!",
            `We'll notify ${listing.createdBy.name} that you're interested in` +
              ` buying ${listing.title}. In the meantime, you can track the` +
              ` order status in your "History" tab`,
            [
              {
                text: "Ok",
                onPress: () => props.navigation.goBack(),
              },
            ]
          );
        }
      } catch (err) {
        console.log(err);
      }
    });
  };

  const setStatus = (statusType: ListingStatus) => {
    const payload = {
      _id: listing._id,
      status: statusType,
    };
    fetch(`${API_URL}/status/set`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    }).then(async (res) => {
      try {
        const jsonRes = await res.json();
        if (res.status == 200) {
          Alert.alert(
            `Order ${statusType}!`,
            `You've ${statusType} the transaction ${listing.title}`,
            [
              {
                text: "Ok",
                onPress: () => props.navigation.goBack(),
              },
            ]
          );
        }
      } catch (err) {
        console.log(err);
      }
    });
  };

  const cancelAction = () => {
    Alert.alert(
      "Listing Cancelled",
      `We've removed ${listing.title} from public listing`,
      [
        {
          text: "Ok",
          onPress: () => props.navigation.goBack(),
        },
      ]
    );
  };

  const editAction = () => {
    props.navigation.navigate("ModifyListing", {
      // flag for editing existing entries
      isEdit: true,
      listing: listing,
    });
  };

  // return these buttons if its a manager view
  if (isManagerView) {
    return (
      <>
        <TouchableOpacity style={styles.editButtonWrapper}>
          <Text style={styles.buttonText} onPress={editAction}>
            Edit Listing
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.completeButtonWrapper}>
          <Text
            style={styles.buttonText}
            onPress={() => setStatus(ListingStatus.COMPLETED)}
          >
            Mark as Complete
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.cancelButtonWrapper}>
          <Text
            style={styles.buttonText}
            onPress={() => setStatus(ListingStatus.CANCELLED)}
          >
            Cancel Listing
          </Text>
        </TouchableOpacity>
      </>
    );
  }

  return (
    <TouchableOpacity
      style={styles.interestedButtonWrapper}
      onPress={interestedAction}
    >
      <Text style={styles.buttonText}>I'm Interested!</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  backgroundImage: {
    height: height * 0.6,
    justifyContent: "space-between",
  },
  descriptionWrapper: {
    flex: 1,
    backgroundColor: colors.white,
    marginTop: -20,
    borderRadius: 25,
  },
  backIcon: {
    marginHorizontal: 20,
    marginTop: 60,
  },
  titlesWrapper: {
    marginHorizontal: 20,
    marginBottom: 40,
  },
  itemTitle: {
    fontFamily: "LatoBold",
    fontSize: 32,
    color: colors.white,
  },
  locationWrapper: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
  },
  locationText: {
    marginLeft: 5,
    fontFamily: "LatoRegular",
    fontSize: 16,
    color: colors.white,
  },
  descriptionTextWrapper: {
    marginTop: 30,
    marginHorizontal: 20,
  },
  priceText: {
    fontFamily: "LatoBold",
    fontSize: 30,
    color: colors.darkGreen,
  },
  descriptionTitle: {
    marginTop: 5,
    fontFamily: "LatoBold",
    fontSize: 24,
    color: colors.darkGray,
  },
  descriptionText: {
    marginTop: 20,
    fontFamily: "LatoRegular",
    fontSize: 16,
    color: colors.darkGray,
    height: 80,
  },
  editButtonWrapper: {
    marginHorizontal: 20,
    marginTop: 10,
    backgroundColor: colors.darkGray,
    alignItems: "center",
    paddingVertical: 15,
    borderRadius: 10,
  },
  completeButtonWrapper: {
    marginHorizontal: 20,
    marginTop: 10,
    backgroundColor: colors.green,
    alignItems: "center",
    paddingVertical: 15,
    borderRadius: 10,
  },
  cancelButtonWrapper: {
    marginHorizontal: 20,
    marginTop: 10,
    backgroundColor: colors.red,
    alignItems: "center",
    paddingVertical: 15,
    borderRadius: 10,
    marginBottom: 40,
  },
  interestedButtonWrapper: {
    marginHorizontal: 20,
    marginTop: 30,
    backgroundColor: colors.green,
    alignItems: "center",
    paddingVertical: 15,
    borderRadius: 10,
  },
  buttonText: {
    fontFamily: "LatoBold",
    fontSize: 18,
    color: colors.white,
  },
});

export default OrderDetail;
