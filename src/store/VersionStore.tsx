import axios from "axios";
import React from "react";
import { create } from "zustand";

interface VersionStore extends VersionState {
  getLatestVersion: () => Promise<void>;
}

interface VersionState {
  latestVersion: string;
  loading: boolean;
  error: string | null;
  success: boolean;
}

const initialState: VersionState = {
  latestVersion: "",
  loading: false,
  error: null,
  success: false,
};

export const useVersionStore = create<VersionStore>((set, get) => ({
  ...initialState,

  getLatestVersion: async () => {
    set({ ...initialState, loading: true });

    try {
      const { data } = await axios.get(
        "https://ddragon.leagueoflegends.com/api/versions.json",
      );

      //   console.log("data: ", data);
      //   console.log("Latest Version: ", data[0]);
      set({ ...initialState, success: true, latestVersion: data[0] });
    } catch (err: any) {
      console.error("Error in data fetch: ", err);
      set({ ...initialState, error: err.message });
    }
  },
}));
