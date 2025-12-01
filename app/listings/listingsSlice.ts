import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { Listing, ListingsState, SortOption, StatusFilter } from "./types";
import { fetchListings } from "./listingsThunks";

const initialState: ListingsState = {
  items: [],
  sort: "newest",
  statusFilter: "all",
  searchQuery: "",
  favorites: {},
  isLoading: false,
  error: null,
};

const listingsSlice = createSlice({
  name: "listings",
  initialState,
  reducers: {
    setListings(state, action: PayloadAction<Listing[]>) {
      state.items = action.payload;
    },
    setSort(state, action: PayloadAction<SortOption>) {
      state.sort = action.payload;
    },
    setStatusFilter(state, action: PayloadAction<StatusFilter>) {
      state.statusFilter = action.payload;
    },
    setSearchQuery(state, action: PayloadAction<string>) {
      state.searchQuery = action.payload;
    },
    toggleFavorite(state, action: PayloadAction<string>) {
      const id = action.payload;
      state.favorites[id] = !state.favorites[id];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchListings.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchListings.fulfilled, (state, action) => {
        state.isLoading = false;
        state.items = action.payload;
        state.error = null;
      })
      .addCase(fetchListings.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
        if (import.meta.env.DEV) {
          console.error("Failed to fetch listings", action.payload);
        }
      });
  },
});

export const {
  setListings,
  setSort,
  setStatusFilter,
  setSearchQuery,
  toggleFavorite,
} = listingsSlice.actions;

export type { SortOption, StatusFilter, ListingsState } from "./types";

export { fetchListings } from "./listingsThunks";

export default listingsSlice.reducer;


