import { create } from "zustand";
import { subscribeWithSelector } from "zustand/middleware";

interface AppStoreState {
  theme$: string | null;
}

interface AppStoreActions {
  setTheme$: (value: string) => void;
}

type AppStore = AppStoreState & AppStoreActions;

const initialState: AppStoreState = {
  theme$: null,
};

export const useAppStore = create<AppStore>()(
  subscribeWithSelector((set) => ({
    ...initialState,
    setTheme$: (value) =>
      set({
        theme$: value,
      }),
  })),
);
