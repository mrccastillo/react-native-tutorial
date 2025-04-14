import { View, Text, FlatList, Image } from "react-native";
import { useFocusEffect } from "@react-navigation/native"; //temp
import styles from "../../assets/styles/home.styles";
import axios from "axios";
import { Ionicons } from "@expo/vector-icons";
import { useAuthStore } from "@/store/AuthStore";
import { useState, useEffect, useCallback } from "react";
import COLORS from "../../constants/colors";

export default function Home() {
  const [isLoading, setIsLoading] = useState(false);
  const [books, setBooks] = useState();
  const { token } = useAuthStore();

  // useEffect(() => {
  //   const fetchBooks = async () => {
  //     try {
  //       const response = await axios.get(
  //         "https://react-native-tutorial-2.onrender.com/api/books",
  //         {
  //           headers: {
  //             Authorization: `${token}`,
  //           },
  //         }
  //       );
  //       console.log(response.data.books);
  //       setBooks(response.data.books);
  //       setIsLoading(false);
  //     } catch (e) {
  //       console.error("Error: ", e);
  //     }
  //   };
  //   fetchBooks();
  // }, []);

  const fetchBooks = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get(
        "https://react-native-tutorial-2.onrender.com/api/books",
        {
          headers: {
            Authorization: `${token}`,
          },
        }
      );
      setBooks(response.data.books);
      setIsLoading(false);
    } catch (e) {
      console.error("Error: ", e);
      setIsLoading(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      fetchBooks(); // Fetch books whenever the screen is focused
    }, [])
  );

  const renderItem = ({ item }) => {
    return (
      <View style={styles.bookCard}>
        <View style={styles.bookHeader}>
          <View style={styles.userInfo}>
            <Image
              source={require("../../assets/images/person-icon.jpg")}
              style={styles.avatar}
            />
            <Text>{item.user.username}</Text>
          </View>
        </View>
        <View style={styles.bookImageContainer}>
          <Image
            source={{ uri: item.image }}
            style={styles.bookImage}
            contentFit="cover"
          ></Image>
        </View>
        <View style={styles.bookDetails}>
          <Text style={styles.bookTitle}>{item.title}</Text>
          <View style={styles.ratingContainer}>
            {[...Array(5)].map((_, index) => (
              <View key={index} style={styles.starButton}>
                <Ionicons
                  name={item.rating > index ? "star" : "star-outline"}
                  size={32}
                  color={COLORS.primary}
                  style={styles.starIcon}
                />
              </View>
            ))}
          </View>
          <Text style={styles.caption}>{item.caption}</Text>
          <Text style={styles.date}>{item.createdAt}</Text>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={books}
        renderItem={renderItem}
        keyExtractor={(item) => item._id}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}
