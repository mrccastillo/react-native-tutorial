import { create } from "zustand";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

export const useAuthStore = create((set) => ({
  user: null,
  token: null,
  isLoading: false,
  login: async (email, password) => {
    const formData = { email, password };

    try {
      set({ isLoading: true });
      const response = await axios.post(
        "https://react-native-tutorial-2.onrender.com/api/auth/login",
        formData
      );

      const data = response.data;
      await AsyncStorage.setItem("token", data.token);
      await AsyncStorage.setItem("user", JSON.stringify(data));
      set({ user: data, token: data.token, isLoading: false });
      return { success: true };
    } catch (e) {
      set({ isLoading: false });
      return { success: false, error: e };
    }
  },
  signup: async (username, email, password) => {
    const formData = { username, email, password };

    try {
      set({ isLoading: true });

      const response = await axios.post(
        "https://react-native-tutorial-2.onrender.com/api/auth/register",
        formData
      );
      console.log(response.data);
      const data = response.data;

      await AsyncStorage.setItem("token", data.token);
      await AsyncStorage.setItem("user", JSON.stringify(data));

      set({ token: data.token, user: data, isLoading: false });
      return { success: true };
    } catch (e) {
      set({ isLoading: false });
      return { success: false, error: e };
    }
  },
  logout: async () => {
    await AsyncStorage.removeItem("user");
    await AsyncStorage.removeItem("token");
    set({ token: null, user: null });
  },
  checkAuth: async () => {
    try {
      const token = await AsyncStorage.getItem("token");
      const userJson = await AsyncStorage.getItem("user");
      const user = userJson ? JSON.parse(userJson) : null;

      set({ user: user ? user : null, token: token ? token : null });
    } catch (e) {
      console.error("Error checking auth: ", e);
    }
  },
}));
