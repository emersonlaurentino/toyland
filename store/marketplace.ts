import { BASE_URL } from "@/constants/config";
import apiFetch from "@/utils/api-fetch";
import { router } from "expo-router";
import { z } from "zod";
import { StateCreator } from "zustand";
import { AuthSlice } from "./auth";
import { Product, ProductSlice } from "./product";
import { User, UserSlice } from "./user";

export const publishOnMarketplaceSchema = z.object({
  productId: z.string().cuid2(),
  addressId: z.string().cuid2(),
  type: z.enum(["sale", "donation"]).default("sale"),
  price: z.number().optional(),
});

export interface Listing {
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
  fetchListingLoading: boolean;
  fetchListingRefreshing: boolean;
  fetchMarketplaceLoading: boolean;
  fetchMarketplaceRefreshing: boolean;
  publishOnMarketplaceLoading: boolean;
}

interface Actions {
  resetMarketplace: () => void;
  publishOnMarketplace: (
    input: z.infer<typeof publishOnMarketplaceSchema>
  ) => Promise<void>;
  fetchMarketplace: (
    filters: { neighborhood: string },
    refresh?: boolean
  ) => Promise<void>;
  fetchListing: (filters: { id: string }, refresh?: boolean) => Promise<void>;
}

export type MarketplaceSlice = State & Actions;

const initialState: State = {
  publishOnMarketplaceLoading: false,
  fetchMarketplaceLoading: false,
  fetchMarketplaceRefreshing: false,
  fetchListingLoading: false,
  fetchListingRefreshing: false,
  listing: [],
};

export const createMarketplaceSlice: StateCreator<
  MarketplaceSlice & AuthSlice & UserSlice & ProductSlice,
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
      await get().fetchProduct({ productId: input.productId }, true);

      router.back();
      router.push({
        pathname: "/marketplace/[id]",
        params: { id: data.id, type: data.type },
      });
    } catch (error) {
      console.error(error);
    } finally {
      set({ publishOnMarketplaceLoading: false });
    }
  },
  fetchMarketplace: async (filters, refresh) => {
    try {
      const { neighborhood } = filters;
      if (refresh) {
        set({ fetchMarketplaceRefreshing: true });
      } else {
        set({ fetchMarketplaceLoading: true });
      }

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
      if (refresh) {
        set({ fetchMarketplaceRefreshing: false });
      } else {
        set({ fetchMarketplaceLoading: false });
      }
    }
  },
  fetchListing: async (filters, refresh) => {
    const { id } = filters;
    try {
      if (refresh) {
        set({ fetchListingRefreshing: true });
      } else {
        set({ fetchListingLoading: true });
      }

      const response = await apiFetch(get, "GET", `/marketplace/${id}`);
      if (!response.ok) {
        throw new Error("Não foi possível carregar o anúncio");
      }

      const data = await response.json();
      set((state) => ({
        listing: [...state.listing.filter((l) => l.id !== data.id), data],
      }));
    } catch (error) {
      console.error(error);
    } finally {
      if (refresh) {
        set({ fetchListingRefreshing: false });
      } else {
        set({ fetchListingLoading: false });
      }
    }
  },
  resetMarketplace: () => set(initialState),
});
