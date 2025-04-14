import { View, Text, FlatList } from "react-native";
import styles from "../../assets/styles/home.styles";
import axios from "axios";
import { useState, useEffect } from "react";

export default function Home() {
  const [isLoading, setIsLoading] = useState(false);
  const [book, setBook] = useState();

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await axios.get(
          "https://react-native-tutorial-2.onrender.com/api/books",
          formData,
          {
            headers: {
              Authorization: `${token}`,
            },
          }
        );
        setBook(response.data.book);
        setIsLoading(false);
      } catch (e) {
        console.error("Error: ", e);
      }
    };
  });

  const renderItem = () => {
    <View></View>;
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={book}
        renderItem={renderItem}
        keyExtractor={(item) => item._id}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}
