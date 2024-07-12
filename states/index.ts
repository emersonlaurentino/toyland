import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { createAuthSlice, type AuthSlice } from "./auth-slice";
import { createNewProductSlice, type NewProductSlice } from "./new-product";
import { createUserSlice, type UserSlice } from "./user";

const useBoundStore = create<AuthSlice & UserSlice & NewProductSlice>()(
  (...a) => ({
    ...persist(createAuthSlice, {
      name: "auth-store",
      storage: createJSONStorage(() => AsyncStorage),
    })(...a),
    ...createUserSlice(...a),
    ...createNewProductSlice(...a),
  })
);

export default useBoundStore;
