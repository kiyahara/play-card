import { DetailCardGrandArchive } from "@/types";
import { StateCreator } from "zustand";

type DeckBuilderStore = {
  dataMaterialDeck: DetailCardGrandArchive[];
  dataMainDeck: DetailCardGrandArchive[];
  dataSideDeck: DetailCardGrandArchive[];
  setDataCard: (_value: DetailCardGrandArchive[], _type: string) => void;
};

export type TypeDeckBuilderSession = {
  deckBuilderStoreData: DeckBuilderStore;
};

const deckBuilderStore: StateCreator<TypeDeckBuilderSession> = (set) => ({
  deckBuilderStoreData: {
    dataMaterialDeck: [],
    dataMainDeck: [],
    dataSideDeck: [],
    setDataCard: (_value: DetailCardGrandArchive[], _type: string) => {
      set((state) => {
        if (_type === "Material") {
          return {
            deckBuilderStoreData: {
              ...state.deckBuilderStoreData,
              dataMaterialDeck: _value,
            },
          };
        }

        if (_type === "Main") {
          return {
            deckBuilderStoreData: {
              ...state.deckBuilderStoreData,
              dataMainDeck: _value,
            },
          };
        }

        if (_type === "Side") {
          return {
            deckBuilderStoreData: {
              ...state.deckBuilderStoreData,
              dataSideDeck: _value,
            },
          };
        }

        return state;
      });
    },
  },
});

export default deckBuilderStore;
