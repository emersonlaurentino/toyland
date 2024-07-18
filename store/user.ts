import apiFetch from "@/utils/api-fetch";
import { type StateCreator } from "zustand";
import { type Address } from "./address";
import { type AuthSlice } from "./auth";
import { type Product } from "./product";

export interface User {
  id: string;
  createdAt: string;
  updatedAt: string;
  name: string;
  email: string;
  phone: string | null;
  imageUrl: string | null;
  products: Product[];
  address: Address;
}

interface State {
  user: User | null;
  userLoading: boolean;
  deleteAccountLoading: boolean;
}

interface Actions {
  resetUser: () => void;
  fetchUser: (refresh?: "refresh") => Promise<void>;
  deleteAccount: () => Promise<void>;
}

export type UserSlice = State & Actions;

const initialState: State = {
  user: null,
  userLoading: false,
  deleteAccountLoading: false,
};

export const createUserSlice: StateCreator<
  UserSlice & AuthSlice,
  [],
  [],
  UserSlice
> = (set, get) => ({
  ...initialState,
  fetchUser: async (refresh) => {
    try {
      if (!refresh) {
        set({ userLoading: true });
      }
      const request = await apiFetch(get, "GET", "/user/profile");
      const response = await request.json();

      if (response.error === "Unauthorized") {
        return await get().logout();
      }

      if (response.error) throw new Error("Usuário não encontrado");
      set({ user: response });
    } catch (error) {
      console.error(error);
    } finally {
      if (!refresh) {
        set({ userLoading: false });
      }
    }
  },
  deleteAccount: async () => {
    try {
      set({ deleteAccountLoading: true });
      await apiFetch(get, "DELETE", "/user");
      await get().logout();
    } catch (error) {
      console.error(error);
    } finally {
      set({ deleteAccountLoading: false });
    }
  },
  resetUser: () => set(initialState),
});
