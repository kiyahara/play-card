import { StateCreator } from "zustand";

type GeneralStore = {
  search: string; // hasil debounce (buat API)
  searchInput: string; // input langsung (UI)
  setSearchInput: (_value: string) => void;
};

export type TypeGeneralSession = {
  generalStoreData: GeneralStore;
};

// 🔥 global debounce timer
let debounceTimer: ReturnType<typeof setTimeout>;

const generalStore: StateCreator<TypeGeneralSession> = (set) => ({
  generalStoreData: {
    search: "",
    searchInput: "",

    setSearchInput: (_value: string) => {
      // ✅ update langsung (biar UI nggak lag)
      set((state) => ({
        generalStoreData: {
          ...state.generalStoreData,
          searchInput: _value,
        },
      }));

      // ❌ cancel debounce sebelumnya
      if (debounceTimer) clearTimeout(debounceTimer);

      // ⏱ debounce update ke search
      debounceTimer = setTimeout(() => {
        set((state) => ({
          generalStoreData: {
            ...state.generalStoreData,
            search: _value,
          },
        }));
      }, 500);
    },
  },
});

export default generalStore;
