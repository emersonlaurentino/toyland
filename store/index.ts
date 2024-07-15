import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { createAddressSlice, type AddressSlice } from "./address";
import { createAuthSlice, type AuthSlice } from "./auth";
import { createMarketplaceSlice, type MarketplaceSlice } from "./marketplace";
import { createProductSlice, type ProductSlice } from "./product";
import { createUserSlice, type UserSlice } from "./user";

const useBoundStore = create<
  AuthSlice & UserSlice & ProductSlice & AddressSlice & MarketplaceSlice
>()((...a) => ({
  ...persist(createAuthSlice, {
    name: "auth-store",
    storage: createJSONStorage(() => AsyncStorage),
  })(...a),
  ...createUserSlice(...a),
  ...createProductSlice(...a),
  ...createAddressSlice(...a),
  ...createMarketplaceSlice(...a),
}));

export default useBoundStore;
