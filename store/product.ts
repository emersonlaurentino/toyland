import apiFetch from "@/utils/api-fetch";
import * as ExpoImagePicker from "expo-image-picker";
import { router } from "expo-router";
import { z } from "zod";
import { StateCreator } from "zustand";
import { AuthSlice } from "./auth";
import { UserSlice } from "./user";
export interface Product {
  id: string;
  name: string;
  description: string | null;
  status: string;
  createdAt: string;
  updatedAt: string;
  images: string[];
  listing: Listing | null;
}

interface Listing {
  id: string;
  price: number;
  address: string;
  type: "donation" | "sale";
  createdAt: string;
}

export const createProductSchema = z.object({
  name: z.string().min(1).max(255),
  description: z.string().optional(),
  // status: z
  //   .enum([
  //     "available",
  //     "unavailable",
  //     "loan", // emprestado para alguém
  //     "loaned", // emprestado por alguém
  //     "for-sale",
  //     "sold",
  //     "donated",
  //   ])
  //   .default("available"),
});

interface State {
  newProductImages: ExpoImagePicker.ImagePickerAsset[];
  newProductLoading: boolean;
  products: Product[];
  productsLoading: boolean;
  deleteProductLoading: boolean;
  productLoading: boolean;
  productRefreshing: boolean;
}

interface Actions {
  resetNewProduct: () => void;
  setNewProductImages: (images: ExpoImagePicker.ImagePickerAsset[]) => void;
  createProduct: (input: z.infer<typeof createProductSchema>) => Promise<void>;
  fetchProduct: (
    filters: {
      productId: string;
    },
    refresh?: boolean
  ) => Promise<void>;
  deleteProduct: (productId: string) => Promise<void>;
}

export type ProductSlice = State & Actions;

const initialState: State = {
  newProductImages: [],
  newProductLoading: false,
  products: [],
  productsLoading: false,
  deleteProductLoading: false,
  productLoading: false,
  productRefreshing: false,
};

export const createProductSlice: StateCreator<
  ProductSlice & AuthSlice & UserSlice,
  [],
  [],
  ProductSlice
> = (set, get) => ({
  ...initialState,
  setNewProductImages: (images) => {
    set({ newProductImages: images });
  },
  createProduct: async (input) => {
    set({ newProductLoading: true });
    try {
      const response = await apiFetch(
        get,
        "POST",
        "/products",
        JSON.stringify(input)
      );
      if (!response.ok) throw new Error("Erro ao criar produto");
      const product = await response.json();

      const formData = new FormData();

      const images = get().newProductImages;

      images.forEach((image) => {
        formData.append("file", {
          uri: image?.uri,
          name: `image.${image?.uri.split(".").pop()}`,
          type: `image/${image?.uri.split(".").pop()}`,
        } as any);
      });

      await apiFetch(get, "POST", `/products/${product.id}/images`, formData);

      await get().fetchUser("refresh");

      router.replace({
        pathname: "/(product)/[productId]",
        params: { productId: product.id, name: product.name },
      });
    } catch (error) {
      console.error(error);
    } finally {
      set({ newProductLoading: false });
    }
  },
  fetchProduct: async (filters, refresh) => {
    const { productId } = filters;
    if (refresh) {
      set({ productRefreshing: true });
    } else {
      set({ productLoading: true });
    }
    try {
      const response = await apiFetch(
        get,
        "GET",
        `/products/${productId}?marketplace=true`
      );
      if (!response.ok) throw new Error("Erro ao buscar produto");
      const product = await response.json();
      set((state) => ({
        products: [
          ...state.products.filter((p) => p.id !== product.id),
          product,
        ],
      }));
    } catch (error) {
      console.error(error);
    } finally {
      if (refresh) {
        set({ productRefreshing: false });
      } else {
        set({ productLoading: false });
      }
    }
  },
  deleteProduct: async (productId) => {
    set({ deleteProductLoading: true });
    try {
      const response = await apiFetch(get, "DELETE", `/products/${productId}`);
      if (!response.ok) throw new Error("Erro ao deletar produto");
      set((state) => ({
        products: state.products.filter((p) => p.id !== productId),
      }));
      router.replace("/(tabs)/profile");
    } catch (error) {
      console.error(error);
    } finally {
      set({ deleteProductLoading: false });
    }
  },
  resetNewProduct: () => set(initialState),
});
