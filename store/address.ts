import apiFetch from "@/utils/api-fetch";
import { StateCreator } from "zustand";
import { AuthSlice } from "./auth";
import { UserSlice } from "./user";

export interface Address {
  id: string;
  createdAt: string;
  updatedAt: string;
  userId: string;
  name: string;
  phone: string;
  postalCode: string;
  street: string;
  number: string;
  complement: string;
  neighborhood: string;
  city: string;
  state: string;
  country: string;
  main: boolean;
}

interface State {
  addresses: Address[];
  addressesLoading: boolean;
}

interface Actions {
  resetAddresses: () => void;
  fetchAddresses: () => Promise<void>;
}

export type AddressSlice = State & Actions;

const initialState: State = {
  addresses: [],
  addressesLoading: false,
};

export const createAddressSlice: StateCreator<
  AddressSlice & AuthSlice & UserSlice,
  [],
  [],
  AddressSlice
> = (set, get) => ({
  ...initialState,
  resetAddresses: () => set(initialState),
  fetchAddresses: async () => {
    set({ addressesLoading: true });
    try {
      const response = await apiFetch(get, "GET", "/addresses");
      if (!response.ok) throw new Error("Erro ao buscar produto");
      const addresses = await response.json();
      set({ addresses });
    } catch (error) {
      console.error(error);
    } finally {
      set({ addressesLoading: false });
    }
  },
});
