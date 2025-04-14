import {
  View,
  Text,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Image,
  Platform,
  Alert,
  ActivityIndicator,
} from "react-native";
import { useRouter } from "expo-router";
import * as ImagePicker from "expo-image-picker";
import * as FileSystem from "expo-file-system";
import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import styles from "../../assets/styles/create.styles";
import COLORS from "../../constants/colors";
import { useAuthStore } from "@/store/AuthStore";
import axios from "axios";
import React from "react";

export default function Create() {
  const [title, setTitle] = useState("");
  const [rating, setRating] = useState(0);
  const [image, setImage] = useState(null);
  const [caption, setCaption] = useState("");
  const [imageBase64, setImageBase64] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { token } = useAuthStore();

  const pickImage = async () => {
    try {
      if (Platform.OS !== "web") {
        const { status } =
          await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== "granted") {
          Alert.alert(
            "Permission denied",
            "We need your media permissions to upload an image"
          );
          return;
        }

        const result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: "images",
          allowsEditing: true,
          aspect: [4, 3],
          quality: 0.3,
          base64: true,
        });

        if (!result.canceled) {
          setImage(result.assets[0].uri);

          if (result.assets[0].base64) {
            setImageBase64(result.assets[0].base64);
          } else {
            const base64 = FileSystem.readAsStringAsync(result.assets[0].uri, {
              encoding: FileSystem.EncodingType.Base64,
            });
            setImageBase64(base64);
          }
        }
      }
    } catch (e) {
      console.error(e);
    }
  };

  const handleSubmit = async () => {
    if (!title || !rating || !caption || !image) {
      return Alert.alert("All fields required", "Please fill all the fields");
    }

    try {
      setIsLoading(true);
      const uriParts = image.split(".");
      const fileType = uriParts[uriParts.length - 1];
      const imageType = fileType
        ? `image/${fileType.toLowerCase()}`
        : "image/jpeg";

      const imageURL = `data:${imageType};base64,${imageBase64}`;

      const formData = {
        title: title,
        rating: rating,
        caption: caption,
        image: imageURL,
      };

      const response = await axios.post(
        "https://react-native-tutorial-2.onrender.com/api/books",
        formData,
        {
          headers: {
            Authorization: `${token}`,
          },
        }
      );
      setIsLoading(false);
      Alert.alert(response.data.message);
      router.push("(tabs)/");
    } catch (e) {
      console.error("Error:", e);
      setIsLoading(false);
    }
  };

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={{ paddingBottom: 20 }}
    >
      <View style={styles.card}>
        <View style={styles.header}>
          <Text style={styles.title}>Add Book Recomendation</Text>
          <Text style={styles.subtitle}>
            Share your favorite reads with other
          </Text>
        </View>
        <View style={styles.form}>
          <View style={styles.formGroup}>
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Book Title</Text>
              <View style={styles.inputContainer}>
                <TextInput
                  style={styles.input}
                  placeholder="Add book title"
                  placeholderTextColor={COLORS.placeholderText}
                  autoCapitalize="none"
                  value={title}
                  onChangeText={setTitle}
                ></TextInput>
              </View>
            </View>
          </View>
          <View style={styles.formGroup}>
            <Text style={styles.label}>Rating</Text>
            <View style={styles.ratingContainer}>
              {[1, 2, 3, 4, 5].map((star) => (
                <TouchableOpacity key={star} style={styles.starButton}>
                  <Ionicons
                    name={rating >= star ? "star" : "star-outline"}
                    size={32}
                    color={COLORS.primary}
                    onPress={() => setRating(star)}
                    style={styles.starIcon}
                  />
                </TouchableOpacity>
              ))}
            </View>
          </View>
          <View style={styles.formGroup}>
            <Text style={styles.label}>Image</Text>
            <TouchableOpacity style={styles.imagePicker} onPress={pickImage}>
              {image ? (
                <Image
                  source={{ uri: image }}
                  style={styles.previewImage}
                  resizeMode="cover"
                />
              ) : (
                <View style={styles.placeholderContainer}>
                  <Ionicons
                    name="image-outline"
                    size={40}
                    color={COLORS.textSecondary}
                  />
                  <Text>Upload image</Text>
                </View>
              )}
            </TouchableOpacity>
          </View>
          <View style={styles.formGroup}>
            <Text style={styles.label}>Description</Text>
            <TextInput
              style={styles.textArea}
              placeholder="Book Description"
              placeholderTextColor={COLORS.placeholderText}
              value={caption}
              onChangeText={setCaption}
              autoCapitalize="none"
              multiline
            />
          </View>
          <TouchableOpacity
            disabled={isLoading}
            style={styles.button}
            onPress={handleSubmit}
          >
            {isLoading ? (
              <ActivityIndicator color={COLORS.white} />
            ) : (
              <>
                <Ionicons
                  name="cloud-upload-outline"
                  color={COLORS.white}
                  size={20}
                  style={styles.buttonIcon}
                />
                <Text style={styles.buttonText}>Submit</Text>
              </>
            )}
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}
