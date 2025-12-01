import { createAsyncThunk } from "@reduxjs/toolkit";
import { fetchListingsFromApi } from "../api/listingsApi";
import type { Listing } from "./types";

export const fetchListings = createAsyncThunk<Listing[], void, { rejectValue: string }>(
  "listings/fetchListings",
  async (_, { rejectWithValue }) => {
    try {
      const listings = await fetchListingsFromApi();
      return listings;
    } catch (error) {
      return rejectWithValue(
        error instanceof Error ? error.message : "Failed to fetch listings"
      );
    }
  }
);

