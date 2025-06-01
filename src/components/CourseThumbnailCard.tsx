import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

type CourseProps = {
  id: string;
  imageUrl: string;
  category: string;
  title: string;
  instructor: string;
  rating: number;
  enrolled: number;
  price: number;
  oldPrice: number;
  isBestSeller: boolean;
  isFavorite: boolean;
  onPressFavorite?: () => void;
};

const CourseThumbnailCard: React.FC<CourseProps> = ({
  id,
  imageUrl,
  category,
  title,
  instructor,
  rating,
  enrolled,
  price,
  oldPrice,
  isBestSeller,
  isFavorite,
  onPressFavorite,
}) => {
  const router = useRouter();

  return (
    <TouchableOpacity
      activeOpacity={0.85}
      onPress={() =>
        router.push({
          pathname: "/CourseDetails/CourseDetailsScreen",
          params: { id },
        })
      }
    >
      <View style={styles.card}>
        <View style={styles.imageContainer}>
          <Image
            source={{ uri: imageUrl }}
            style={styles.image}
            resizeMode="cover"
          />
          {isBestSeller && (
            <View style={styles.bestSellerTag}>
              <Text style={styles.bestSellerText}>Best-seller</Text>
            </View>
          )}
          <TouchableOpacity
            style={styles.heartIcon}
            onPress={onPressFavorite}
            activeOpacity={0.7}
          >
            <Ionicons
              name={isFavorite ? "heart" : "heart-outline"}
              size={22}
              color={isFavorite ? "#F24E1E" : "#A0A0A0"}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.details}>
          <Text style={styles.category}>{category}</Text>
          <Text style={styles.title} numberOfLines={1}>
            {title}
          </Text>
          <View style={styles.instructorRow}>
            <View style={styles.infoBox}>
              <Text style={styles.instructor}>{instructor}</Text>
              <View style={styles.row}>
                <Ionicons name="star" color="#FFD700" size={16} />
                <Text style={styles.rating}>{rating.toFixed(1)}</Text>
                <Text style={styles.enrolled}> {enrolled} Enrolled</Text>
              </View>
            </View>
            <View style={styles.priceRow}>
              <Text style={styles.oldPrice}>
                {oldPrice > price ? `$${oldPrice}` : ""}
              </Text>
              <Text style={styles.price}> ${price}</Text>
            </View>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    borderRadius: 16,
    marginRight: 10,
    width: 250,
    borderColor: "#e5e5e5",
    borderWidth: 1,
    overflow: "hidden",
  },
  imageContainer: {
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    overflow: "hidden",
    position: "relative",
    backgroundColor: "#d9d9d9",
    borderColor: "#e5e5e5",
    borderWidth: 1,
  },
  image: {
    width: "100%",
    height: 120,
  },
  bestSellerTag: {
    position: "absolute",
    top: 12,
    left: 12,
    backgroundColor: "#4A6680",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
  },
  bestSellerText: {
    color: "#fff",
    fontWeight: "500",
    fontSize: 14,
  },
  heartIcon: {
    position: "absolute",
    top: 12,
    right: 12,
    backgroundColor: "#fff",
    borderRadius: 8,
    paddingHorizontal: 5,
    paddingVertical: 4,
    elevation: 2,
  },
  details: {
    paddingHorizontal: 14,
    paddingVertical: 14,
  },
  category: {
    color: "#F24E1E",
    fontSize: 14,
    fontWeight: "500",
  },
  title: {
    color: "#222B45",
    fontSize: 18,
    fontWeight: "700",
    marginVertical: 3,
    maxWidth: 190,
  },
  instructor: {
    fontSize: 14,
    marginBottom: 4,
    color: "#525252",
    fontWeight: "600",
  },
  instructorRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 6,
    alignItems: "flex-end",
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
  },
  rating: {
    color: "#222B45",
    fontWeight: "600",
    marginLeft: 4,
    fontSize: 14,
  },
  enrolled: {
    color: "#525252",
    fontSize: 13,
    marginLeft: 4,
  },
  priceRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 4,
  },
  oldPrice: {
    color: "#A0A0A0",
    textDecorationLine: "line-through",
    fontSize: 16,
    marginRight: 4,
  },
  price: {
    color: "#2D6AFF",
    fontWeight: "700",
    fontSize: 20,
  },
  infoBox: {
    backgroundColor: "#EEEEEE",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    minWidth: 85,
    marginRight: 7,
  },
});

export default CourseThumbnailCard;
