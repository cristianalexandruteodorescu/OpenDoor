import { useEffect, useMemo } from "react";
import { useAppDispatch, useAppSelector } from "../store";
import { fetchListings } from "../listings/listingsSlice";
import type { Listing } from "../listings/types";

export const useListings = () => {
  const dispatch = useAppDispatch();
  const items = useAppSelector((state) => state.listings.items);
  const sort = useAppSelector((state) => state.listings.sort);
  const statusFilter = useAppSelector((state) => state.listings.statusFilter);
  const searchQuery = useAppSelector((state) => state.listings.searchQuery);
  const isLoading = useAppSelector((state) => state.listings.isLoading);

  useEffect(() => {
    dispatch(fetchListings());
  }, [dispatch]);

  const listings = useMemo(() => {
    const withOrder = items.map((item, index) => ({
      ...item,
      _order: index,
    }));

    const sorted = [...withOrder].sort((a, b) => {
      if (sort === "newest") {
        const aTime =
          typeof a.dateSold === "string" ? Date.parse(a.dateSold) : NaN;
        const bTime =
          typeof b.dateSold === "string" ? Date.parse(b.dateSold) : NaN;

        if (!Number.isNaN(aTime) || !Number.isNaN(bTime)) {
          return (bTime || 0) - (aTime || 0) || b._order - a._order;
        }

        return b._order - a._order;
      }
      return a._order - b._order;
    });

    let filtered =
      statusFilter === "all"
        ? sorted
        : sorted.filter(
            (listing) =>
              (listing.listingStatus ?? "").toLowerCase() === statusFilter
          );

    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase().trim();
      filtered = filtered.filter((listing) => {
        const address = listing.address.toLowerCase();
        const city = listing.city.toLowerCase();
        const state = listing.state.toLowerCase();
        const zip = listing.zip.toLowerCase();
        const fullAddress = `${address} ${city} ${state} ${zip}`;
        return fullAddress.includes(query);
      });
    }

    return filtered.map(({ _order, ...rest }) => rest as Listing);
  }, [items, sort, statusFilter, searchQuery]);

  const count = useMemo(() => listings.length, [listings]);

  return { listings, isLoading, count };
}


