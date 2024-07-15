import { BASE_URL } from "@/constants/config";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import { z } from "zod";
import { StateCreator } from "zustand";

export const resetPasswordSchema = z.object({
  email: z.string().min(1).email(),
});

export const registerSchema = z.object({
  name: z.string().min(1).max(255),
  email: z.string().min(1).email(),
  password: z.string().min(1).max(255),
});

export const loginWithPasswordSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

interface State {
  token: string | null;
  loginWithPasswordLoading: boolean;
  registerLoading: boolean;
  logoutLoading: boolean;
  resetPasswordLoading: boolean;
}

interface Actions {
  resetAuth: () => void;
  loginWithPassword: (
    input: z.infer<typeof loginWithPasswordSchema>
  ) => Promise<void>;
  register: (input: z.infer<typeof registerSchema>) => Promise<void>;
  logout: () => Promise<void>;
  resetPassword: (input: z.infer<typeof resetPasswordSchema>) => Promise<void>;
}

export type AuthSlice = State & Actions;

const initialState: State = {
  token: null,
  loginWithPasswordLoading: false,
  registerLoading: false,
  logoutLoading: false,
  resetPasswordLoading: false,
};

export const createAuthSlice: StateCreator<AuthSlice, [], [], AuthSlice> = (
  set,
  get
) => ({
  ...initialState,
  loginWithPassword: async (input) => {
    try {
      set({ loginWithPasswordLoading: true });
      const request = await fetch(`${BASE_URL}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(input),
      });
      const response = await request.json();
      if (response.error) throw new Error(response.error);
      set({ token: response.token });
      router.replace("/(tabs)");
    } catch (error) {
      console.error(error);
    } finally {
      set({ loginWithPasswordLoading: false });
    }
  },
  register: async (input) => {
    try {
      set({ registerLoading: true });
      const request = await fetch(`${BASE_URL}/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(input),
      });
      const response = await request.json();
      if (response.error) throw new Error(response.error);
      set({ token: response.token });
      router.replace("/(tabs)");
    } catch (error) {
      console.error(error);
    } finally {
      set({ registerLoading: false });
    }
  },
  logout: async () => {
    try {
      set({ logoutLoading: true });
      await fetch(`${BASE_URL}/auth/logout`, {
        headers: {
          Authorization: `Bearer ${get().token}`,
        },
      });
      set(() => ({ token: null, user: null }));
      await AsyncStorage.removeItem("auth-store");
    } catch (error) {
      console.error(error);
    } finally {
      set({ logoutLoading: false });
    }
  },
  resetPassword: async (input) => {
    try {
      set({ resetPasswordLoading: true });
      const request = await fetch("`{BASE_URL}/auth/reset-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(input),
      });
      const response = await request.json();
      if (response.error) throw new Error(response.error);
      router.replace("/(auth)/reset-password-waiting");
    } catch (error) {
      console.error(error);
    } finally {
      set({ resetPasswordLoading: false });
    }
  },
  resetAuth: () => set(initialState),
});
