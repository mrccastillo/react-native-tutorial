import { Text, View } from "react-native";
import { Link } from "expo-router";
import styles from "../assets/styles/create.styles";

export default function Index() {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Create an account</Text>
      </View>
      <View style={styles.card}>
        <Link href="/(auth)/signup">Create an account</Link>
        <Link href="/(auth)">Login</Link>
      </View>
      {/* <Text style={}>HELLO</Text> */}
    </View>
  );
}
