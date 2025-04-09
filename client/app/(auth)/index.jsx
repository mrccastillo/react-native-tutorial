import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  Platform,
} from "react-native";
import { Link, useRouter } from "expo-router";
import { KeyboardAvoidingView } from "react-native";
import { Image } from "react-native";
import styles from "../../assets/styles/login.styles";
import COLORS from "../../constants/colors";
import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import axios from "axios";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isShowPassword, setIsShowPassword] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async () => {
    const formData = { email, password };
    console.log(formData);

    try {
      setIsLoading(true);
      const response = await axios.post(
        "http://192.168.0.71:8000/api/auth/login",
        formData
      );
      console.log(response.data);
      router.push("/(auth)/signup");
    } catch (e) {
      console.error("Something went wrong while you're logging in", e);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.topIllustration}>
        <Image
          source={require("../../assets/images/reading-glasses.png")}
          style={styles.illustrationImage}
          resize="contain"
        ></Image>
      </View>
      <View style={styles.card}>
        <View style={styles.formContainer}>
          {/* email */}
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
                placeholderTextColor={COLORS.placeholderText}
                autoCapitalize="none"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
              />
            </View>
          </View>
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Password</Text>
            <View style={styles.inputContainer}>
              <Ionicons
                name="lock-closed"
                size={20}
                color={COLORS.primary}
                style={styles.inputIcon}
              />

              <TextInput
                style={styles.input}
                placeholder="Enter your password"
                placeholderTextColor={COLORS.placeholderText}
                autoCapitalize="none"
                value={password}
                onChangeText={setPassword}
                secureTextEntry={isShowPassword}
              />

              <TouchableOpacity
                onPress={() => setIsShowPassword(!isShowPassword)}
                style={styles.eyeIcon}
              >
                <Ionicons
                  name={isShowPassword ? "eye-off-outline" : "eye-outline"}
                  color={COLORS.primary}
                  size={20}
                />
              </TouchableOpacity>
            </View>
          </View>
          <TouchableOpacity
            style={styles.button}
            disabled={isLoading}
            onPress={handleLogin}
          >
            {isLoading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text style={styles.buttonText}>Login</Text>
            )}
          </TouchableOpacity>
          <View style={styles.footer}>
            <Text style={styles.footerText}>Don't have an account?</Text>
            <Link href="/signup" asChild>
              <TouchableOpacity>
                <Text style={styles.link}>Sign up</Text>
              </TouchableOpacity>
            </Link>
          </View>
        </View>
      </View>
    </View>
  );
}
