import { BASE_URL } from "@/constants/config";
import apiFetch from "@/utils/api-fetch";
import { router } from "expo-router";
import { z } from "zod";
import { StateCreator } from "zustand";
import { AuthSlice } from "./auth";
import { Product } from "./product";
import { User, UserSlice } from "./user";

export const publishOnMarketplaceSchema = z.object({
  productId: z.string().cuid2(),
  addressId: z.string().cuid2(),
  type: z.enum(["sale", "donation"]).default("sale"),
  price: z.number().optional(),
});

interface Listing {
  id: string;
  type: string;
  price: number;
  address: string;
  createdAt: string;
  owner: User;
  product: Product;
}

interface State {
  listing: Listing[];
  listingLoading: boolean;
  publishOnMarketplaceLoading: boolean;
}

interface Actions {
  resetMarketplace: () => void;
  publishOnMarketplace: (
    input: z.infer<typeof publishOnMarketplaceSchema>
  ) => Promise<void>;
  fetchListing: (neighborhood: string) => Promise<void>;
}

export type MarketplaceSlice = State & Actions;

const initialState: State = {
  publishOnMarketplaceLoading: false,
  listingLoading: false,
  listing: [],
};

export const createMarketplaceSlice: StateCreator<
  MarketplaceSlice & AuthSlice & UserSlice,
  [],
  [],
  MarketplaceSlice
> = (set, get) => ({
  ...initialState,
  publishOnMarketplace: async (input) => {
    try {
      set({ publishOnMarketplaceLoading: true });

      const response = await fetch(`${BASE_URL}/marketplace`, {
        method: "POST",
        body: JSON.stringify(input),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${get().token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Não foi possível publicar no marketplace");
      }

      const data = await response.json();

      await get().fetchUser("refresh");

      router.back();
      router.push({ pathname: "/marketplace/[id]", params: { id: data.id } });
    } catch (error) {
      console.error(error);
    } finally {
      set({ publishOnMarketplaceLoading: false });
    }
  },
  fetchListing: async (neighborhood) => {
    try {
      set({ listingLoading: true });

      const response = await apiFetch(
        get,
        "GET",
        `/marketplace?n=${neighborhood}`
      );
      if (!response.ok) {
        throw new Error("Não foi possível carregar os anúncios");
      }

      const listing = await response.json();
      set({ listing });
    } catch (error) {
      console.error(error);
    } finally {
      set({ listingLoading: false });
    }
  },
  resetMarketplace: () => set(initialState),
});
