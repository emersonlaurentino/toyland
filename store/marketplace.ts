import apiFetch from "@/utils/api-fetch";
import { router } from "expo-router";
import { z } from "zod";
import { StateCreator } from "zustand";
import { AuthSlice } from "./auth";
import { UserSlice } from "./user";

export const publishOnMarketplaceSchema = z.object({
  productId: z.string().cuid2(),
  addressId: z.string().cuid2(),
  type: z.enum(["sale", "donation"]).default("sale"),
  price: z.number().optional(),
});

interface State {
  publishOnMarketplaceLoading: boolean;
}

interface Actions {
  resetMarketplace: () => void;
  publishOnMarketplace: (
    input: z.infer<typeof publishOnMarketplaceSchema>
  ) => Promise<void>;
}

export type MarketplaceSlice = State & Actions;

const initialState: State = {
  publishOnMarketplaceLoading: false,
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

      const response = await apiFetch(get, "POST", "/marketplace", {
        body: JSON.stringify(input),
      });

      if (!response.ok) {
        throw new Error("Não foi possível publicar no marketplace");
      }

      const data = await response.json();

      await get().fetchUser("refresh");

      router.push({ pathname: "/marketplace/[id]", params: { id: data.id } });
    } catch (error) {
      console.error(error);
    } finally {
      set({ publishOnMarketplaceLoading: false });
    }
  },
  resetMarketplace: () => set(initialState),
});
