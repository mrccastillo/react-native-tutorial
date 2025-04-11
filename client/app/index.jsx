import { Text, Touchable, TouchableOpacity, View } from "react-native";
import { Link } from "expo-router";
import styles from "../assets/styles/create.styles";
import { useEffect } from "react";
import { useAuthStore } from "@/store/AuthStore";

export default function Index() {
  const { user, token, checkAuth, logout } = useAuthStore();

  useEffect(() => {
    checkAuth();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>
          {user ? `Hello,  ${user.username}` : "please login first"}
        </Text>
        <Text style={styles.label}>
          {token
            ? `this  is your token :)    : ${token}`
            : "no token, pls login first oke?"}
        </Text>
      </View>

      <View style={styles.card}>
        <Link href="/(auth)/signup">Create an account</Link>
        <Link href="/(auth)">Login</Link>
      </View>
      <TouchableOpacity onPress={logout}>
        <Text>Logout</Text>
      </TouchableOpacity>
      {/* <Text style={}>HELLO</Text> */}
    </View>
  );
}
