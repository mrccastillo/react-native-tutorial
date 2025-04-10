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
        "http://192.168.0.71:8000/api/auth/login",
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
        "http://192.168.0.71:8000/api/auth/register",
        formData
      );
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
}));
