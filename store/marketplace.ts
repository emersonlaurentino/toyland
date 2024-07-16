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

export interface Announcement {
  id: string;
  type: string;
  price: number;
  address: string;
  createdAt: string;
  owner: User;
  product: Product;
}

interface State {
  announcements: Announcement[];
  fetchAnnouncementLoading: boolean;
  publishOnMarketplaceLoading: boolean;
}

interface Actions {
  resetMarketplace: () => void;
  publishOnMarketplace: (
    input: z.infer<typeof publishOnMarketplaceSchema>
  ) => Promise<void>;
  fetchAnnouncement: (id: string) => Promise<void>;
}

export type MarketplaceSlice = State & Actions;

const initialState: State = {
  publishOnMarketplaceLoading: false,
  fetchAnnouncementLoading: false,
  announcements: [],
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
  fetchAnnouncement: async (id) => {
    try {
      set({ fetchAnnouncementLoading: true });

      const response = await apiFetch(get, "GET", `/marketplace/${id}`);
      if (!response.ok) throw new Error("Anúncio não encontrado");

      const data = await response.json();
      set((state) => ({
        announcements: [state.announcements.filter((a) => a.id !== id), data],
      }));
    } catch (error) {
      console.error(error);
    } finally {
      set({ fetchAnnouncementLoading: false });
    }
  },
  resetMarketplace: () => set(initialState),
});
