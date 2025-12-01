import type { SortOption, StatusFilter } from "../listings/listingsSlice";

export const SORT_LABEL_MAP: Record<SortOption, string> = {
  newest: "Newest",
  oldest: "Oldest",
};

export const STATUS_LABEL_MAP: Record<StatusFilter, string> = {
  all: "All statuses",
  active: "Active",
  sold: "Sold",
};


