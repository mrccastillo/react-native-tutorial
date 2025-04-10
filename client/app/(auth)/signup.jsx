import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { useRouter } from "expo-router";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Ionicons } from "@expo/vector-icons";
import styles from "@/assets/styles/signup.styles";
import COLORS from "@/constants/colors";
import { useState } from "react";
import { useAuthStore } from "@/store/AuthStore";

export default function Signup() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isShowPassword, setIsShowPassword] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const { user, token, setToken, setUser } = useAuthStore();

  const router = useRouter();

  const handleSignup = async () => {
    const formData = { username, email, password };

    try {
      setIsLoading(true);

      const response = await axios.post(
        "http://192.168.0.71:8000/api/auth/register",
        formData
      );
      const data = response.data;
      await AsyncStorage.setItem("token", data.token);
      await AsyncStorage.setItem("user", JSON.stringify(data));
      setUser(data);
      setToken(data.token);
      // set({ token: data.token, user: data.user });
      router.push("/(auth)/");
    } catch (e) {
      console.error("Something went wrong while signing up", e);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <View style={styles.header}>
          <Text style={styles.title}>Bookworm</Text>
          <Text style={styles.subtitle}>Share your favorite reads</Text>
        </View>
        <View style={styles.formContainer}>
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Username</Text>
            <View style={styles.inputContainer}>
              <Ionicons
                name="person-outline"
                size={20}
                color={COLORS.primary}
                style={styles.inputIcon}
              />
              <TextInput
                style={styles.input}
                placeholder="Enter your username"
                keyboardType="default"
                autoCapitalize="none"
                value={username}
                onChangeText={setUsername}
              />
            </View>
          </View>
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Email</Text>
            <View style={styles.inputContainer}>
              <Ionicons
                name="mail-outline"
                size={20}
                color={COLORS.primary}
                style={styles.inputIcon}
              />
              <TextInput
                style={styles.input}
                placeholder="Enter your email"
                keyboardType="email-address"
                autoCapitalize="none"
                value={email}
                onChangeText={setEmail}
              />
            </View>
          </View>
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Password</Text>
            <View style={styles.inputContainer}>
              <Ionicons
                name="lock-closed-outline"
                size={20}
                color={COLORS.primary}
                style={styles.inputIcon}
              />
              <TextInput
                style={styles.input}
                placeholder="Enter your password"
                keyboardType="default"
                secureTextEntry={isShowPassword}
                autoCapitalize="none"
                value={password}
                onChangeText={setPassword}
              />
              <Ionicons
                onPress={() => setIsShowPassword(!isShowPassword)}
                name={isShowPassword ? "eye-off-outline" : "eye-outline"}
                size={20}
                color={COLORS.primary}
                style={styles.eyeIcon}
              />
            </View>
          </View>
          <TouchableOpacity
            disabled={isLoading}
            style={styles.button}
            onPress={handleSignup}
          >
            {isLoading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text style={styles.buttonText}>Sign Up</Text>
            )}
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
