import apiFetch from "@/utils/api-fetch";
import * as ExpoImagePicker from "expo-image-picker";
import { router } from "expo-router";
import { z } from "zod";
import { StateCreator } from "zustand";
import { AuthSlice } from "./auth";
import { UserSlice } from "./user";

export const createProductSchema = z.object({
  name: z.string(),
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
}

interface Actions {
  resetNewProduct: () => void;
  setNewProductImages: (images: ExpoImagePicker.ImagePickerAsset[]) => void;
  createProduct: (input: z.infer<typeof createProductSchema>) => Promise<void>;
}

export type NewProductSlice = State & Actions;

const initialState: State = {
  newProductImages: [],
  newProductLoading: false,
};

export const createNewProductSlice: StateCreator<
  NewProductSlice & AuthSlice & UserSlice,
  [],
  [],
  NewProductSlice
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

      // await get().fetchUser();

      router.replace("/(tabs)/profile");
    } catch (error) {
      console.error(error);
    } finally {
      set({ newProductLoading: false });
    }
  },
  resetNewProduct: () => set(initialState),
});
