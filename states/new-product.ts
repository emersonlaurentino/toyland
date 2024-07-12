import * as ExpoImagePicker from "expo-image-picker";
import { z } from "zod";
import { StateCreator } from "zustand";

export const createProductSchema = z.object({
  name: z.string(),
  description: z.string().optional(),
  token: z.string(),
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
  NewProductSlice,
  [],
  [],
  NewProductSlice
> = (set) => ({
  ...initialState,
  setNewProductImages: (images) => {
    set({ newProductImages: images });
  },
  createProduct: async (input) => {
    set({ newProductLoading: true });
    try {
      const response = await fetch("https://api.toylandapp.com/user/profile", {
        headers: {
          Authorization: `Bearer ${input.token}`,
        },
      });
      if (response.ok) {
      }
    } catch (error) {
      console.error(error);
    } finally {
      set({ newProductLoading: false });
    }
  },
  resetNewProduct: () => set(initialState),
});
