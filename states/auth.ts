import { adminSupabase, supabase } from "@/utils/supabase";
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

export const authSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

interface Profile {
  id: string;
  updated_at: string;
  full_name: string;
  avatar_url: string;
}

interface State {
  user: any;
  profile: Profile | null;
  loading:
    | "none"
    | "sign-in"
    | "sign-up"
    | "sign-out"
    | "profile"
    | "delete-account";
  error: any;
}

interface Actions {
  setUser: (user: any) => void;
  signIn: (input: z.infer<typeof authSchema>) => Promise<void>;
  signUp: (input: z.infer<typeof authSchema>) => Promise<void>;
  signOut: () => Promise<void>;
  fetchProfile: () => Promise<void>;
  deleteAccount: () => Promise<void>;
}

const initialState: State = {
  user: null,
  profile: null,
  loading: "none",
  error: null,
};

export const useAuthStore = create(
  persist<State & Actions>(
    (set, get) => {
      resetFns.add(() => set(initialState));
      return {
        ...initialState,
        fetchProfile: async () => {
          set({ loading: "profile" });
          const { data, error } = await supabase
            .from("profiles")
            .select()
            .eq("id", get().user.id)
            .single();
          if (error) {
            set({ loading: "none" });
            throw error;
          }
          set({ profile: data, loading: "none" });
        },
        setUser: (user) => set({ user }),
        signIn: async (input) => {
          try {
            set({ loading: "sign-in" });
            const { data, error } = await supabase.auth.signInWithPassword(
              input
            );
            if (error) {
              set({ loading: "none", error });
            } else if (data.session) {
              set({ user: data.user });
              await get().fetchProfile();
              router.replace("/");
            }
            set({ loading: "none" });
          } catch (e) {
            set({ loading: "none", error: e });
          }
        },
        signUp: async (input) => {
          try {
            set({ loading: "sign-in" });
            const { data, error } = await supabase.auth.signUp(input);
            if (error) {
              set({ loading: "none", error });
            } else if (data.session) {
              set({ user: data.user });
              router.replace("/");
            }
            set({ loading: "none" });
          } catch (e) {
            set({ loading: "none", error: e });
          }
        },
        signOut: async () => {
          try {
            set({ loading: "sign-out" });
            const { error } = await adminSupabase.auth.signOut();
            if (error) throw error;
            router.replace("/(auth)/get-started");
            set(initialState);
            useAuthStore.persist.clearStorage();
          } catch (error) {
            console.error("signOut error", error);
            set({ loading: "none", error });
          }
        },
        deleteAccount: async () => {
          try {
            set({ loading: "delete-account" });
            const { error } = await adminSupabase.auth.admin.deleteUser(
              get().user.id
            );
            if (error) throw error;
            router.replace("/(auth)/get-started");
            set(initialState);
            useAuthStore.persist.clearStorage();
          } catch (error) {
            set({ loading: "none", error });
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
