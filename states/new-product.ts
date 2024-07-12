import * as ExpoImagePicker from "expo-image-picker";
import { create } from "zustand";

interface State {
  images: ExpoImagePicker.ImagePickerAsset[];
}

interface Actions {
  reset: () => void;
  setImages: (images: ExpoImagePicker.ImagePickerAsset[]) => void;
}

const initialState: State = {
  images: [],
};

export const useNewProductStore = create<State & Actions>((set, get) => ({
  ...initialState,
  setImages: (images) => {
    set({ images });
  },
  reset: () => set(initialState),
}));
