import { View, Text, TouchableOpacity } from "react-native";
import { useAuthStore } from "@/store/AuthStore";
import React from "react";

export default function Profile() {
  const { user, logout } = useAuthStore();

  return (
    <View>
      <Text>Hello, {user.username}</Text>
      <TouchableOpacity onPress={logout}>
        <Text>Logout</Text>
      </TouchableOpacity>
    </View>
  );
}
