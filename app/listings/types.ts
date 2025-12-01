export type Listing = {
  id: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  price: number;
  beds: number;
  baths: number;
  sqft: number;
  lat?: number;
  lng?: number;
  googlePlaceId?: string;
  daysOnMarket?: number;
  dateSold?: string;
  listingStatus?: "active" | "sold";
};

export type SortOption = "newest" | "oldest";
export type StatusFilter = "all" | "active" | "sold";

export type ListingsState = {
  items: Listing[];
  sort: SortOption;
  statusFilter: StatusFilter;
  searchQuery: string;
  favorites: Record<string, boolean>;
  isLoading: boolean;
  error: string | null;
};

