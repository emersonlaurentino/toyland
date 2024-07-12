import { type StateCreator } from "zustand";
import { type AuthSlice } from "./auth";
import { type Product } from "./new-product";

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
      const request = await fetch("https://api.toylandapp.com/user/profile", {
        headers: {
          Authorization: `Bearer ${get().token}`,
        },
      });
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
      await fetch("https://api.toylandapp.com/user", {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${get().token}`,
        },
      });
      await get().logout();
    } catch (error) {
      console.error(error);
    } finally {
      set({ deleteAccountLoading: false });
    }
  },
  resetUser: () => set(initialState),
});
