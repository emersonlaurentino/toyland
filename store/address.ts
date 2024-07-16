import { BASE_URL } from "@/constants/config";
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
  selectAddressLoading: boolean;
}

interface Actions {
  resetAddresses: () => void;
  fetchAddresses: () => Promise<void>;
  selectAddress: (id: string) => void;
}

export type AddressSlice = State & Actions;

const initialState: State = {
  addresses: [],
  addressesLoading: false,
  selectAddressLoading: false,
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
  selectAddress: async (id) => {
    set({ selectAddressLoading: true });
    try {
      const response = await fetch(`${BASE_URL}/addresses/${id}`, {
        method: "PATCH",
        body: JSON.stringify({ main: true }),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${get().token}`,
        },
      });
      if (!response.ok) throw new Error("Erro ao selecionar endereço");
      set((state) => ({
        addresses: state.addresses.map((address) =>
          address.id === id
            ? { ...address, main: true }
            : { ...address, main: false }
        ),
      }));
      await get().fetchUser("refresh");
    } catch (error) {
      console.error(error);
    } finally {
      set({ selectAddressLoading: false });
    }
  },
});
