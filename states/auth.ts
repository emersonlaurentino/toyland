import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import { z } from "zod";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

const resetFns = new Set<() => void>();

export const resetState = () => {
  resetFns.forEach((resetFn) => {
    resetFn();
  });
};

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

interface User {
  id: string;
  createdAt: string;
  updatedAt: string;
  name: string;
  email: string;
  imageUrl: string | null;
  products: Products;
}

interface Products {
  inventory: Product[];
  givingAway: Product[];
  history: Product[];
}

export interface Product {
  id: string;
  name: string;
  description: string | null;
  status: string;
  images: string[];
}

interface State {
  token: string | null;
  user: User | null;
  loading:
    | "none"
    | "user"
    | "login-password"
    | "register"
    | "logout"
    | "delete-account"
    | "reset-password";
  errorMessage?: string;
}

interface Actions {
  loginWithPassword: (
    input: z.infer<typeof loginWithPasswordSchema>
  ) => Promise<void>;
  register: (input: z.infer<typeof registerSchema>) => Promise<void>;
  fetchUser: () => Promise<void>;
  logout: () => Promise<void>;
  resetPassword: (input: z.infer<typeof resetPasswordSchema>) => Promise<void>;
  deleteAccount: () => Promise<void>;
}

const initialState: State = {
  token: null,
  user: null,
  loading: "none",
  errorMessage: undefined,
};

export const useAuthStore = create(
  persist<State & Actions>(
    (set, get) => {
      resetFns.add(() => set(initialState));
      return {
        ...initialState,
        fetchUser: async () => {
          try {
            set({ loading: "user" });
            const request = await fetch(
              "https://api.toylandapp.com/user/profile",
              {
                headers: {
                  Authorization: `Bearer ${get().token}`,
                },
              }
            );
            const response = await request.json();

            if (response.error === "Unauthorized") {
              return await get().logout();
            }

            if (response.error) throw new Error("Usuário não encontrado");
            set({ user: response });
          } catch (e) {
            if (e instanceof Error) {
              set({ errorMessage: e.message });
            } else {
              set({ errorMessage: "Erro desconhecido" });
            }
          } finally {
            set({ loading: "none" });
          }
        },
        loginWithPassword: async (input) => {
          try {
            set({ loading: "login-password" });
            const request = await fetch(
              "https://api.toylandapp.com/auth/login",
              {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify(input),
              }
            );
            const response = await request.json();
            if (response.error) throw new Error(response.error);
            set({ token: response.token });
            router.replace("/");
          } catch (e) {
            if (e instanceof Error) {
              set({ errorMessage: e.message });
            } else {
              set({ errorMessage: "Erro desconhecido" });
            }
          } finally {
            set({ loading: "none" });
          }
        },
        register: async (input) => {
          try {
            set({ loading: "register" });
            const request = await fetch(
              "https://api.toylandapp.com/auth/register",
              {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify(input),
              }
            );
            const response = await request.json();
            if (response.error) throw new Error(response.error);
            set({ token: response.token });
            router.replace("/");
          } catch (e) {
            if (e instanceof Error) {
              set({ errorMessage: e.message });
            } else {
              set({ errorMessage: "Erro desconhecido" });
            }
          } finally {
            set({ loading: "none" });
          }
        },
        logout: async () => {
          try {
            set({ loading: "logout" });
            await fetch("https://api.toylandapp.com/auth/logout", {
              headers: {
                Authorization: `Bearer ${get().token}`,
              },
            });
            set({ token: null, user: null });
            await AsyncStorage.removeItem("auth");
          } catch (e) {
            if (e instanceof Error) {
              set({ errorMessage: e.message });
            } else {
              set({ errorMessage: "Erro desconhecido" });
            }
          } finally {
            set({ loading: "none" });
          }
        },
        deleteAccount: async () => {
          try {
            set({ loading: "delete-account" });
            await fetch("https://api.toylandapp.com/user", {
              method: "DELETE",
              headers: {
                Authorization: `Bearer ${get().token}`,
              },
            });
            await get().logout();
          } catch (e) {
            if (e instanceof Error) {
              set({ errorMessage: e.message });
            } else {
              set({ errorMessage: "Erro desconhecido" });
            }
          } finally {
            set({ loading: "none" });
          }
        },
        resetPassword: async (input) => {
          try {
            set({ loading: "reset-password" });
            const request = await fetch(
              "https://api.toylandapp.com/auth/reset-password",
              {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify(input),
              }
            );
            const response = await request.json();
            if (response.error) throw new Error(response.error);
            router.replace("/(auth)/reset-password-waiting");
          } catch (e) {
            if (e instanceof Error) {
              set({ errorMessage: e.message });
            } else {
              set({ errorMessage: "Erro desconhecido" });
            }
          } finally {
            set({ loading: "none" });
          }
        },
      };
    },
    {
      name: "auth",
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
